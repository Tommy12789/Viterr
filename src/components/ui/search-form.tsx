"use client";

import * as React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, MapPin, Circle } from "lucide-react";
import { useDebounce } from "use-debounce";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { searchCommunes, Commune } from "@/lib/api";

export function SearchForm() {
  const [date, setDate] = React.useState<Date>();
  const [departure, setDeparture] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [departureSuggestions, setDepartureSuggestions] = React.useState<
    Commune[]
  >([]);
  const [destinationSuggestions, setDestinationSuggestions] = React.useState<
    Commune[]
  >([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [focusedInput, setFocusedInput] = React.useState<
    "departure" | "destination" | null
  >(null);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  const [debouncedDeparture] = useDebounce(departure, 300);
  const [debouncedDestination] = useDebounce(destination, 300);

  const departureRef = React.useRef<HTMLInputElement>(null);
  const destinationRef = React.useRef<HTMLInputElement>(null);
  const dateInputRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (debouncedDeparture) {
      searchCommunes(debouncedDeparture).then(setDepartureSuggestions);
    } else {
      setDepartureSuggestions([]);
    }
  }, [debouncedDeparture]);

  React.useEffect(() => {
    if (debouncedDestination) {
      searchCommunes(debouncedDestination).then(setDestinationSuggestions);
    } else {
      setDestinationSuggestions([]);
    }
  }, [debouncedDestination]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const value = e.target.value;
    setter(value);
    setSelectedIndex(0);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    suggestions: Commune[],
    setter: React.Dispatch<React.SetStateAction<string>>,
    suggestionsSetter: React.Dispatch<React.SetStateAction<Commune[]>>,
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions[selectedIndex]) {
        setter(suggestions[selectedIndex].nom);
        suggestionsSetter([]);
        setFocusedInput(null);
        (e.target as HTMLInputElement).blur();
      }
    }
  };

  const handleSuggestionSelect = (
    suggestion: Commune,
    setter: React.Dispatch<React.SetStateAction<string>>,
    suggestionsSetter: React.Dispatch<React.SetStateAction<Commune[]>>,
  ) => {
    setter(suggestion.nom);
    suggestionsSetter([]);
    setFocusedInput(null);
  };

  const handleFocus = (input: "departure" | "destination") => {
    setFocusedInput(input);
    setIsCalendarOpen(false); // Ferme le calendrier quand un input est focalisé
  };

  const handleBlur = (input: "departure" | "destination") => {
    setTimeout(() => {
      if (
        (input === "departure" &&
          document.activeElement !== destinationRef.current) ||
        (input === "destination" &&
          document.activeElement !== departureRef.current)
      ) {
        setFocusedInput(null);
      }
    }, 100);
  };

  const handleDateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCalendarOpen((prev) => !prev);
    setFocusedInput(null); // Retire le focus des autres inputs quand le calendrier est ouvert
  };

  const handleDateBlur = (e: React.FocusEvent) => {
    // Vérifiez si le nouvel élément focalisé est à l'intérieur du calendrier
    if (
      calendarRef.current &&
      !calendarRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsCalendarOpen(false);
    }
  };

  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setFocusedInput(null);
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ajoutez cette nouvelle fonction pour gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ajoutez ici la logique pour traiter la recherche
    console.log("Recherche soumise :", { departure, destination, date });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit} // Ajoutez cet gestionnaire d'événements
      className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-center justify-center rounded-3xl bg-zinc-50/70 shadow-lg dark:bg-zinc-800/70 lg:mt-24 lg:h-20 lg:flex-row lg:rounded-full"
    >
      <div
        className={cn(
          "relative h-full flex-1",
          focusedInput === "departure" && "z-10",
        )}
      >
        <Circle className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
        <Input
          ref={departureRef}
          placeholder="D'où partez-vous ?"
          className={cn(
            "w-full rounded-full border-0 border-zinc-900/30 pl-12 text-base font-medium text-zinc-900 shadow-none placeholder:font-light placeholder:text-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-50/30 dark:text-zinc-50 dark:placeholder:text-zinc-50 lg:h-full lg:flex-1 lg:rounded-none lg:rounded-l-full lg:border-r-2",
            focusedInput === "departure" &&
              "rounded-t-[20px] bg-white dark:bg-zinc-900 lg:rounded-l-none lg:border-r-0",
          )}
          value={departure}
          onChange={(e) => handleInputChange(e, setDeparture)}
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              departureSuggestions,
              setDeparture,
              setDepartureSuggestions,
            )
          }
          onFocus={() => handleFocus("departure")}
          onBlur={() => handleBlur("departure")}
        />
        {focusedInput === "departure" && departureSuggestions.length > 0 && (
          <ul className="absolute z-10 max-h-60 w-full overflow-auto rounded-b-xl bg-white shadow-lg dark:bg-zinc-900">
            {departureSuggestions.map((suggestion, index) => (
              <li
                key={suggestion.code}
                className={cn(
                  "cursor-pointer px-12 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800",
                  index === selectedIndex && "bg-zinc-100 dark:bg-zinc-800",
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSuggestionSelect(
                    suggestion,
                    setDeparture,
                    setDepartureSuggestions,
                  );
                }}
              >
                {suggestion.nom} ({suggestion.codeDepartement})
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        className={cn(
          "relative h-full flex-1",
          focusedInput === "destination" && "z-10",
        )}
      >
        <MapPin className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
        <Input
          ref={destinationRef}
          placeholder="Où allez-vous ?"
          className={cn(
            "w-full rounded-full border-0 border-zinc-900/30 pl-12 text-base font-medium text-zinc-900 shadow-none placeholder:font-light placeholder:text-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-50/30 dark:text-zinc-50 dark:placeholder:text-zinc-50 lg:h-full lg:flex-1 lg:rounded-none lg:border-r-2",
            focusedInput === "destination" &&
              "rounded-t-[20px] bg-white dark:bg-zinc-900 lg:border-r-0",
          )}
          value={destination}
          onChange={(e) => handleInputChange(e, setDestination)}
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              destinationSuggestions,
              setDestination,
              setDestinationSuggestions,
            )
          }
          onFocus={() => handleFocus("destination")}
          onBlur={() => handleBlur("destination")}
        />
        {focusedInput === "destination" &&
          destinationSuggestions.length > 0 && (
            <ul className="absolute z-10 max-h-60 w-full overflow-auto rounded-b-xl bg-white shadow-lg dark:bg-zinc-900">
              {destinationSuggestions.map((suggestion, index) => (
                <li
                  key={suggestion.code}
                  className={cn(
                    "cursor-pointer px-12 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800",
                    index === selectedIndex && "bg-zinc-100 dark:bg-zinc-800",
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSuggestionSelect(
                      suggestion,
                      setDestination,
                      setDestinationSuggestions,
                    );
                  }}
                >
                  {suggestion.nom} ({suggestion.codeDepartement})
                </li>
              ))}
            </ul>
          )}
      </div>
      <div className={cn("relative h-full flex-1", isCalendarOpen && "z-10")}>
        <Button
          ref={dateInputRef}
          type="button"
          variant="ghost"
          onClick={handleDateClick}
          onBlur={handleDateBlur}
          className={cn(
            "w-full justify-start rounded-full border-zinc-900/30 pl-6 text-left text-base font-medium text-zinc-900 hover:bg-transparent hover:text-zinc-700 focus:outline-none focus:ring-0 dark:border-zinc-50/30 dark:text-zinc-50 lg:h-full lg:flex-1 lg:rounded-none",
            !date && "font-light",
            isCalendarOpen &&
              "hover:bg-zinc-white rounded-t-[20px] bg-white dark:bg-zinc-900",
          )}
        >
          <CalendarIcon className="mr-4 size-4 text-zinc-900 dark:text-zinc-50" />
          {date ? (
            format(date, "dd MMMM yyyy", { locale: fr })
          ) : (
            <span>Départ</span>
          )}
        </Button>
        {isCalendarOpen && (
          <div
            ref={calendarRef}
            className="absolute z-10 w-full overflow-auto rounded-b-xl bg-white shadow-lg dark:bg-zinc-900"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                setIsCalendarOpen(false);
              }}
              initialFocus
              variant="fullWidth"
            />
          </div>
        )}
      </div>
      <Button
        type="submit" // Changez le type en "submit"
        variant={"outline"}
        className="ml-2 w-full rounded-full border-none bg-zinc-200 text-base font-semibold text-zinc-900 shadow-md transition-colors hover:bg-white focus:outline-none focus:ring-0 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900 lg:mr-3 lg:h-3/4 lg:w-auto lg:px-6"
      >
        Rechercher
      </Button>
    </form>
  );
}