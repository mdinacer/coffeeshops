import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import TextField from '../fields/TextField';

interface Props {
  initialValue?: string;
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
    <div className=' flex w-full flex-row items-center rounded-lg  border border-gray-300 bg-gray-100 px-4 xl:max-w-sm'>
      <div>
        <SearchIcon className='h-6 w-6' />
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
              <XIcon className='h-5 w-5 opacity-50' />
            </button>
          )
        }
      />
    </div>
  );
}
