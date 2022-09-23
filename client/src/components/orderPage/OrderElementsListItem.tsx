import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { OrderElement } from '../../app/models/order';

interface Props {
  element: OrderElement;
  onRemove: (productId: string) => void;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
}

export default function OrderElementsListItem({
  element,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemove,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      layout
      className='bg-stone-00 flex w-full   flex-row items-end rounded border-y border-y-stone-300 bg-stone-200  pl-4 text-stone-900  md:items-center'
    >
      <div className='grid flex-auto items-center  gap-y-2 md:grid-cols-5'>
        <p className='  font-Roboto text-lg font-light capitalize md:col-span-3'>
          {element.productName}
        </p>
        <div className=' mx-auto grid grid-cols-4 md:col-span-2'>
          <div className=' flex w-full items-center justify-center'>
            <button
              type='button'
              className={buttonStyle}
              onClick={() => onDecreaseQuantity(element.productId)}
            >
              <MinusIcon className={iconStyle} />
            </button>
          </div>
          <div className=' col-span-2 flex w-full items-center'>
            <p className=' w-full text-center  font-Primary text-lg'>
              {element.quantity}
            </p>
          </div>
          <div className=' flex w-full items-center justify-center'>
            <button
              type='button'
              className={buttonStyle}
              onClick={() => onIncreaseQuantity(element.productId)}
            >
              <PlusIcon className={iconStyle} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          type='button'
          className={buttonStyle + 'ml-2 rounded-none bg-stone-500 text-white'}
          onClick={() => onRemove(element.productId)}
        >
          <XMarkIcon className={iconStyle} />
        </button>
      </div>
    </motion.div>
  );
}

const buttonStyle =
  'p-1 rounded-full text-stone-600 border border-stone-500  bg-stone-200 ';
const iconStyle = 'h-5 w-5';
