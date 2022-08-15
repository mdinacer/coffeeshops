import {PencilAltIcon, TrashIcon} from '@heroicons/react/solid';
import {motion} from 'framer-motion';
import {Product} from '../../app/models/product';

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ShopProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <motion.div
      layout
      className='bg-gray-100  flex flex-row  rounded-lg overflow-hidden select-none'
    >
      <div className='flex flex-row  py-2 px-5 flex-auto '>
        <div className='px-5'>
          <img
            src={product.pictureUrl}
            alt=''
            className=' h-20 w-20 object-scale-down'
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
            {product.price.toFixed(2)} Da
          </p>
        </div>
      </div>
      <div className='  flex flex-col  flex-initial  h-full justify-evenly'>
        <button
          onClick={() => onDelete(product)}
          type='button'
          className={buttonStyle + ' bg-gray-400  hover:bg-red-500 '}
        >
          <TrashIcon className='h-6 w-6 ' />
        </button>
        <button
          onClick={() => onEdit(product)}
          type='button'
          className={buttonStyle + ' bg-gray-500  hover:bg-orange-500 '}
        >
          <PencilAltIcon className='h-6 w-6 ' />
        </button>
      </div>
    </motion.div>
  );
}

const buttonStyle =
  'py-1 px-5 uppercase font-Secondary h-full font-normal text-base text-white inline-flex justify-center items-center hover:text-white ';
