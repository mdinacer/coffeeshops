import {SearchIcon, XIcon} from '@heroicons/react/solid';
import {useState} from 'react';
import {productsList} from '../../app/data/productsList';

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
    <div className='relative max-h-screen flex-1  flex flex-col gap-y-5 p-5 '>
      <button
        type='button'
        className='md:absolute top-4  right-4 ml-auto md:ml-0'
        onClick={() => onExit()}
      >
        <XIcon className='h-6 w-6' />
      </button>
      <div className=' flex-initial flex flex-row items-center  bg-gray-100 rounded-lg max-w-md w-full mr-auto px-5'>
        <SearchIcon className='h-6 w-6 mr-2' />
        <input
          type='search'
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Chercher un produit'
          className='py-2 bg-transparent placeholder:text-gray-400  w-full border-none'
        />
      </div>
      <div className=' flex-auto overflow-y-auto overscroll-none pr-5 '>
        <div className='grid md:grid-cols-3  gap-4 pb-10'>
          {filteredProducts.map((product, index) => (
            <button
              typeof='button'
              onClick={() => onExit(product)}
              key={index}
              className=' bg-gray-200  border border-gray-300  rounded-md lg:hover:drop-shadow-md lg:transition-all lg:duration-200'
            >
              <div className=' flex flex-col p-2'>
                <div className='h-32 w-32  mx-auto flex-initial'>
                  <img
                    className='h-full w-full object-scale-down'
                    src={product.pictureUrl}
                    alt={product.name}
                  />
                </div>
                <div className=' flex flex-col items-center justify-center flex-auto py-1'>
                  <p className='my-auto font-Secondary text-xl capitalize font-light text-center'>
                    {product.name}
                  </p>
                  {product.description && (
                    <p className=' font-Secondary text-base capitalize font-thin text-center'>
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
