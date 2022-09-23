import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { Product } from '../../app/models/product';
import { formatNumber } from '../../app/utils/utils';

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ShopProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <motion.div
      layout
      className='flex  select-none flex-col overflow-hidden  rounded-lg bg-stone-300 text-stone-600 md:flex-row'
    >
      <div className='my-auto flex  flex-auto flex-row py-2  px-5'>
        <div className=' w-32 px-5 '>
          <img
            src={product.pictureUrl}
            alt=''
            className=' h-20 w-full object-scale-down'
          />
        </div>
        <div>
          <small className=' font-Primary text-sm font-thin uppercase'>
            {product.category}
          </small>
          <p className=' font-Primary text-2xl font-thin capitalize'>
            {product.name}
          </p>
          <p className=' font-Primary text-base font-thin capitalize'>
            {formatNumber(product.price)} Da
          </p>
        </div>
      </div>
      <div className='  flex h-full  flex-initial  flex-col justify-evenly'>
        <button
          onClick={() => onDelete(product)}
          type='button'
          className={buttonStyle + ' bg-stone-400  hover:bg-red-500 '}
        >
          <TrashIcon className='h-6 w-6 ' />
        </button>
        <button
          onClick={() => onEdit(product)}
          type='button'
          className={buttonStyle + ' bg-stone-500  hover:bg-orange-500 '}
        >
          <PencilSquareIcon className='h-6 w-6 ' />
        </button>
      </div>
    </motion.div>
  );
}

const buttonStyle =
  'py-1 px-5 uppercase font-Secondary h-full font-normal text-base  text-stone-200 inline-flex justify-center items-center ';
