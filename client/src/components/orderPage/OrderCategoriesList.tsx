import { ChevronUpIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Category } from '../../app/models/category';
import { setProductParams } from '../../app/slices/shopSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import { useOutsideClick } from '../../app/utils/outsideClick';
import OrderCategoryCard from './OrderCategoryCard';

interface Props {
  categories: Category[];
  selectedCategory?: string;
  onClose: (category?: Category) => void;
}

export default function OrderCategoriesList({
  categories = [],
  selectedCategory,
  onClose,
}: Props) {
  const node = useRef(null);
  const dispatch = useAppDispatch();
  const categoriesList = () => {
    return [defaultCategory, ...categories];
  };

  function handleClose(category?: Category | undefined) {
    const categoryId = category ? category.id : undefined;
    dispatch(setProductParams({ categoryId }));
    onClose(category);
  }

  useOutsideClick(node, () => onClose());

  return (
    <motion.div
      ref={node}
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ stiffness: 100 }}
      className=' absolute top-0 left-0 right-0 bg-gray-200 px-5 py-5 md:rounded-2xl md:px-10'
    >
      <div className=' grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2'>
        {categoriesList().map((category) => (
          <button
            key={category.id}
            onClick={() => handleClose(category)}
            type='button'
            className={` w-full rounded-md text-left hover:bg-sky-400  ${
              selectedCategory === category.id
                ? 'bg-sky-700 text-white'
                : 'bg-gray-100'
            }`}
          >
            <OrderCategoryCard category={category} />
          </button>
        ))}
      </div>
      <div className='w-ful mt-5 flex items-center justify-center py-2'>
        <button
          type='button'
          className=' inline-flex items-center'
          onClick={() => handleClose()}
        >
          <ChevronUpIcon className='mr-2 h-6 w-6' />
          <span className='font-Secondary uppercase'>Fermer</span>
        </button>
      </div>
    </motion.div>
  );
}

const defaultCategory: Category = {
  id: '',
  name: 'Tout les produits',
  pictureUrl: '',
};
