import Link from "next/link";
import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { SearchForm } from "./search-form";

import { Menu, House, FileText, Mail, Settings, User } from "lucide-react";

const transportModes = [
  { name: "Avion", description: "Plus de 100 compagnies" },
  { name: "Train", description: "SNCF" },
  { name: "Covoiturage", description: "Blablacar" },
  { name: "Bus", description: "Flixbus et Blablacar" },
];

const Header = () => {
  return (
    <div className="p-4">
      <header className='relative rounded-lg border-b-2 bg-[url("/background.jpg")] bg-cover bg-center px-4 py-6 shadow-xl sm:p-8 md:px-16 lg:px-24 xl:px-24'>
        <div className="absolute inset-0 rounded-lg bg-black/70 dark:bg-white/70"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-zinc-50">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-50 dark:text-zinc-900 sm:text-4xl md:text-5xl">
                Viterr.
              </h1>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              <ModeToggle />
              <Button
                variant="ghost"
                className="text-zinc-50 hover:text-zinc-900 dark:text-zinc-900 dark:hover:text-zinc-50"
                aria-label="Profile"
              >
                <User className="size-5" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-zinc-50 dark:text-zinc-900"
                  >
                    <Menu />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <div className="flex w-full flex-col">
                    <div className="border-b-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-6"
                      >
                        <Link className="flex items-center gap-2" href="/">
                          <House className="size-4" />
                          Home
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-6"
                      >
                        <Link className="flex items-center gap-2" href="/about">
                          <FileText className="size-4" />
                          About
                        </Link>
                      </Button>
                    </div>
                    <div className="">
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-6"
                      >
                        <Link
                          className="flex items-center gap-2"
                          href="/settings"
                        >
                          <Settings className="size-4" />
                          Settings
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-6"
                      >
                        <Link
                          className="flex items-center gap-2"
                          href="/contact"
                        >
                          <Mail className="size-4" />
                          Contact
                        </Link>
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mx-auto mb-12 mt-16 flex flex-col gap-4 text-center text-zinc-50 dark:text-zinc-900">
            <h2 className="text-5xl font-semibold leading-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Trouver le trajet le plus adapté à vos besoins
            </h2>
            <p className="mx-auto max-w-3xl text-xl font-light sm:text-2xl">
              Combinant les moyens de transports que vous souhaitez pour vous
              assurer le prix le plus bas.
            </p>
          </div>
          <SearchForm />
          <div className="relative mx-auto mt-12 grid w-full max-w-7xl translate-y-[90px] grid-cols-1 items-stretch justify-center gap-4 px-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 sm:px-6 lg:mt-24 lg:grid-cols-4 lg:gap-8 lg:px-8">
            {transportModes.map((mode) => (
              <div
                key={mode.name}
                className="flex flex-col overflow-hidden rounded-xl bg-zinc-50 py-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-zinc-700 dark:text-zinc-50 dark:shadow-zinc-600 sm:py-6"
              >
                <h2 className="px-4 text-center text-2xl font-light sm:px-6 sm:text-3xl lg:px-8 lg:text-4xl">
                  {mode.name}
                </h2>
                <p className="mt-2 flex grow items-center justify-center px-2 text-center text-base font-light text-zinc-400 sm:mt-4 sm:px-4 sm:text-lg">
                  {mode.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
