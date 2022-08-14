import { MinusIcon, PlusIcon, XIcon } from '@heroicons/react/solid';
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
      className='w-full py-1 px-4   flex flex-row items-end md:items-center bg-gray-00 rounded-md'
    >
      <div className='grid md:grid-cols-5 gap-y-2  flex-auto items-center'>
        <p className=' md:col-span-3 capitalize text-lg'>
          {element.productName}
        </p>
        <div className=' grid grid-cols-4 md:col-span-2 mx-auto'>
          <div className=' w-full flex items-center justify-center'>
            <button
              type='button'
              className={buttonStyle}
              onClick={() => onDecreaseQuantity(element.productId)}
            >
              <MinusIcon className={iconStyle} />
            </button>
          </div>
          <div className=' col-span-2 w-full flex items-center'>
            <p className=' font-Primary text-lg  w-full text-center'>
              {element.quantity}
            </p>
          </div>
          <div className=' w-full flex items-center justify-center'>
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
          className={buttonStyle + 'bg-gray-500 text-white ml-2'}
          onClick={() => onRemove(element.productId)}
        >
          <XIcon className={iconStyle} />
        </button>
      </div>
    </motion.div>
  );
}

const buttonStyle = 'p-1  rounded-full text-gray-100  bg-gray-400 ';
const iconStyle = 'h-5 w-5';
