import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import TextField from '../fields/TextField';

interface Props {
  initialValue?: string | null;
  onSearch: (value: string) => void;
}

export default function AppSearch({ initialValue, onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState(initialValue || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return (
    <div className=' flex w-full flex-row items-center rounded-lg  border border-stone-400 bg-stone-300 px-4 xl:max-w-sm'>
      <div>
        <MagnifyingGlassIcon className='h-6 w-6' />
      </div>
      <TextField
        inputStyles=' border-none px-0'
        className=' w-full border-none bg-transparent px-0 py-0 pl-0'
        type='text'
        label={''}
        placeholder='Rechercher un article'
        value={searchTerm}
        onEnter={(value) => onSearch(value)}
        onChange={(value) => {
          setSearchTerm(value);
        }}
        button={
          searchTerm && (
            <button type='button' onClick={() => setSearchTerm('')}>
              <XMarkIcon className='h-5 w-5 opacity-50' />
            </button>
          )
        }
      />
    </div>
  );
}
