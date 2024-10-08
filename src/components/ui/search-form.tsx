"use client";

import * as React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export function SearchForm() {
  const [date, setDate] = React.useState<Date>();

  return (
    <form className="mx-auto mt-8 flex w-full max-w-5xl flex-col items-center justify-center gap-4 rounded-3xl bg-zinc-50/70 px-4 py-6 shadow-lg dark:bg-zinc-800/70 lg:mt-24 lg:h-24 lg:flex-row lg:gap-0 lg:rounded-full lg:py-3">
      <Input
        className="h-14 w-full rounded-full border-0 border-zinc-900/30 pl-6 text-lg font-medium text-zinc-900 shadow-none outline-none placeholder:font-light placeholder:text-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-50/30 dark:text-zinc-50 dark:placeholder:text-zinc-50 lg:h-full lg:flex-1 lg:rounded-none lg:rounded-l-full lg:border-r-2"
        placeholder="D'où partez-vous ?"
      />
      <Input
        placeholder="Où allez-vous ?"
        className="h-14 w-full rounded-full border-0 border-zinc-900/30 pl-6 text-lg font-medium text-zinc-900 shadow-none placeholder:font-light placeholder:text-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-50/30 dark:text-zinc-50 dark:placeholder:text-zinc-50 lg:h-full lg:flex-1 lg:rounded-none lg:border-r-2"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "h-14 w-full justify-start rounded-full border-zinc-900/30 pl-6 text-left text-lg font-medium text-zinc-900 hover:bg-transparent hover:text-zinc-700 focus:outline-none focus:ring-0 dark:border-zinc-50/30 dark:text-zinc-50 dark:hover:text-zinc-300 lg:h-full lg:flex-1 lg:rounded-none lg:border-r-2",
              !date && "font-light",
            )}
          >
            <CalendarIcon className="mr-4 size-5 text-zinc-900 dark:text-zinc-50" />
            {date ? (
              format(date, "dd MMMM yyyy", { locale: fr })
            ) : (
              <span>Départ</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        variant={"outline"}
        className="h-14 w-full rounded-full border-none bg-zinc-50 text-lg font-semibold text-zinc-900 shadow-md transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-0 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600 lg:h-full lg:w-1/4"
      >
        Rechercher
      </Button>
    </form>
  );
}
