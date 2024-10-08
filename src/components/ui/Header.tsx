import Link from "next/link";
import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";

import { SearchForm } from "./search-form";

const transportModes = [
  { name: "Avion", description: "Plus de 100 compagnies" },
  { name: "Train", description: "SNCF" },
  { name: "Covoiturage", description: "Blablacar" },
  { name: "Bus", description: "Flixbus et Blablacar" },
];

const Header = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className='relative rounded-lg border-b-2 bg-[url("/background.jpg")] bg-cover bg-center px-4 py-6 shadow-xl sm:p-8 md:px-16 lg:px-24 xl:px-32'>
        <div className="absolute inset-0 rounded-lg bg-black/70 dark:bg-white/70"></div>
        <div className="relative z-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
            <div className="shrink-0">
              <Link href="/" className="text-2xl font-bold text-zinc-50">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-50 dark:text-zinc-900 sm:text-4xl md:text-5xl">
                  Viterr.
                </h1>
              </Link>
            </div>

            <nav className="flex w-full flex-wrap justify-center space-x-4 rounded-full bg-zinc-100/50 px-4 py-2 shadow-inner dark:bg-zinc-800/50 sm:w-auto sm:justify-end sm:space-x-6 sm:px-6 sm:py-3 md:space-x-8">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="relative text-sm text-zinc-50 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-zinc-50 after:transition-transform after:duration-200 hover:after:scale-x-100 dark:text-zinc-900 dark:after:bg-zinc-900"
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex items-center gap-4 sm:mt-0">
              <ModeToggle />
              <Button
                variant="ghost"
                className="text-sm font-medium text-zinc-50 hover:text-zinc-900 dark:text-zinc-900 dark:hover:text-zinc-50"
              >
                Sign In
              </Button>
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
