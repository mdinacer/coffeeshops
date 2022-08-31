import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { productsList } from '../../app/data/productsList';

interface Props {
  onExit: (item?: any | null) => void;
}

export default function ProductGalleryForm({ onExit }: Props) {
  const [query, setQuery] = useState('');
  const filteredProducts =
    query === ''
      ? productsList
      : productsList.filter((product) =>
          product.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className='relative flex max-h-full  flex-1 flex-col gap-y-5  '>
      <div className=' mr-auto flex w-full max-w-md  flex-initial flex-row items-center rounded-lg bg-stone-100 px-5'>
        <MagnifyingGlassIcon className='mr-2 h-6 w-6' />
        <input
          type='search'
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Chercher un produit'
          className='w-full border-none bg-transparent  py-2 placeholder:text-stone-400'
        />
      </div>
      <div className=' flex-auto overflow-y-auto overscroll-none pr-3 '>
        <div className='grid gap-4  pb-10 md:grid-cols-4 xl:grid-cols-5'>
          {filteredProducts.map((product, index) => (
            <button
              typeof='button'
              onClick={() => onExit(product)}
              key={index}
              className=' rounded-md  border border-stone-300  bg-white lg:transition-all lg:duration-200 lg:hover:drop-shadow-md'
            >
              <div className=' flex flex-col p-2'>
                <div className='mx-auto h-32  w-full flex-initial'>
                  <img
                    className='h-full max-h-[128px] w-full object-scale-down'
                    src={product.pictureUrl}
                    alt={product.name}
                  />
                </div>
                <div className=' flex flex-auto flex-col items-center justify-center py-1'>
                  <p className='my-auto text-center font-Secondary text-xl font-light capitalize'>
                    {product.name}
                  </p>

                  <p className=' text-center font-Secondary text-base font-thin capitalize'>
                    {product.description || product.category}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
