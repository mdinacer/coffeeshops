import { AnimatePresence, motion } from 'framer-motion';
import { Product } from '../../app/models/product';
import OrderProductCard from './OrderProductCard';

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function OrderProductsGrid({ products, onSelect }: Props) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-5 md:grid-cols-3 w-full  xl:grid-cols-4 gap-5 h-auto drop-shadow-md'>
      <AnimatePresence>
        {products.map((product) => (
          <motion.button
            layout
            type='button'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={product.id}
            className='w-full'
            onClick={() => onSelect(product)}
          >
            <OrderProductCard product={product} />
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
