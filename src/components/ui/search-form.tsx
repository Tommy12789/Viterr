'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

export function SearchForm() {
  const [date, setDate] = React.useState<Date>();

  return (
    <form className='flex w-full max-w-5xl mx-auto bg-zinc-50/70 dark:bg-zinc-800/70 items-center justify-center mt-24 rounded-full px-4 py-3 h-24 shadow-lg'>
      <Input
        className='text-lg font-medium pl-6 w-full rounded-none rounded-l-full h-full border-zinc-900/30 dark:border-zinc-50/30 border-0 border-r-2 shadow-none text-zinc-900 dark:text-zinc-50 outline-none placeholder:text-zinc-900 dark:placeholder:text-zinc-50 placeholder:font-light focus:outline-none focus:ring-0'
        placeholder="D'où partez-vous ?"
      />
      <Input
        placeholder='Où allez-vous ?'
        className='text-lg font-medium pl-6 w-full rounded-none h-full border-zinc-900/30 dark:border-zinc-50/30 border-0 border-r-2 shadow-none text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-900 dark:placeholder:text-zinc-50 placeholder:font-light focus:outline-none focus:ring-0'
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            className={cn(
              'justify-start text-left font-medium w-full h-full text-lg pl-6 text-zinc-900 dark:text-zinc-50 hover:bg-transparent hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none focus:ring-0',
              !date && ' font-light'
            )}
          >
            <CalendarIcon className='mr-4 size-5 text-zinc-900 dark:text-zinc-50' />
            {date ? format(date, 'dd MMMM yyyy', { locale: fr }) : <span>Départ</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        variant={'outline'}
        className='rounded-full bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 h-full w-1/3 text-lg font-semibold border-none hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors shadow-md focus:outline-none focus:ring-0'
      >
        Rechercher
      </Button>
    </form>
  );
}
