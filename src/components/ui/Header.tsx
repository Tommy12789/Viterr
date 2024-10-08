import Link from 'next/link';
import { Button } from './button';
import { ModeToggle } from './mode-toggle';

import { SearchForm } from './search-form';

const transportModes = [
  { name: 'Avion', description: 'Plus de 100 compagnies' },
  { name: 'Train', description: 'SNCF' },
  { name: 'Covoiturage', description: 'Blablacar' },
  { name: 'Bus', description: 'Flixbus et Blablacar' },
];

const Header = () => {
  return (
    <div className='p-4 sm:p-6 md:p-8'>
      <header className='relative bg-[url("/background.jpg")] bg-cover bg-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6 sm:py-8 border-b-2 rounded-lg shadow-xl'>
        <div className='absolute inset-0 bg-black/70 rounded-lg dark:bg-white/70'></div>
        <div className='relative z-10'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0'>
            <div className='flex-shrink-0'>
              <Link
                href='/'
                className='text-2xl font-bold text-zinc-50'
              >
                <h1 className='text-3xl sm:text-4xl md:text-5xl text-zinc-50 font-extrabold tracking-tight dark:text-zinc-900'>
                  Viterr.
                </h1>
              </Link>
            </div>

            <nav className='flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6 md:space-x-8 bg-zinc-100/50 py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-inner dark:bg-zinc-800/50 w-full sm:w-auto'>
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className='dark:text-zinc-900 text-zinc-50 transition-all duration-200 text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-zinc-50 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 dark:after:bg-zinc-900'
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className='flex items-center gap-4 mt-4 sm:mt-0'>
              <ModeToggle />
              <Button
                variant='ghost'
                className='text-zinc-50 hover:text-zinc-900 text-sm font-medium dark:text-zinc-900 dark:hover:text-zinc-50'
              >
                Sign In
              </Button>
            </div>
          </div>
          <div className='mx-auto text-center text-zinc-50 dark:text-zinc-900 flex flex-col gap-4 mt-16 mb-12'>
            <h2 className='font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight'>
              Trouver le trajet le plus adapté à vos besoins
            </h2>
            <p className='text-xl sm:text-2xl font-light max-w-3xl mx-auto'>
              Combinant les moyens de transports que vous souhaitez pour vous assurer le prix le
              plus bas.
            </p>
          </div>
          <SearchForm />
          <div className='translate-y-[90px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 items-stretch justify-center relative mt-12 sm:mt-16 lg:mt-24'>
            {transportModes.map((mode) => (
              <div
                key={mode.name}
                className='py-4 sm:py-6 flex flex-col bg-zinc-50 dark:bg-zinc-700 rounded-xl shadow-lg dark:text-zinc-50 dark:shadow-zinc-600 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden'
              >
                <h2 className='text-center font-light px-4 sm:px-6 lg:px-8 text-2xl sm:text-3xl lg:text-4xl'>{mode.name}</h2>
                <p className='text-center text-base sm:text-lg font-light text-zinc-400 px-2 sm:px-4 mt-2 sm:mt-4 flex-grow flex items-center justify-center'>
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
