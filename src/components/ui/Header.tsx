import Link from 'next/link';
import { Button } from './button';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  return (
    <header className='bg-white shadow-sm px-52 py-4 dark:bg-zinc-900 border-b-2 dark:border-b-white'>
      <div className='flex justify-between items-center'>
        <div className='flex-shrink-0'>
          <Link
            href='/'
            className='text-2xl font-bold text-gray-900'
          >
            <img
              className='h-32'
              src='/Viterr.svg'
              alt=''
            />
          </Link>
        </div>
        <nav className='hidden md:flex space-x-10'>
          <Link
            href='/'
            className='text-gray-500 hover:text-gray-900'
          >
            Home
          </Link>
          <Link
            href='/about'
            className='text-gray-500 hover:text-gray-900'
          >
            About
          </Link>
          <Link
            href='/services'
            className='text-gray-500 hover:text-gray-900'
          >
            Services
          </Link>
          <Link
            href='/contact'
            className='text-gray-500 hover:text-gray-900'
          >
            Contact
          </Link>
        </nav>

        <div className='flex items-center gap-4'>
          <ModeToggle />
          <Button variant='outline'>Sign In</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
