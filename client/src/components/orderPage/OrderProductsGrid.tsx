import { AnimatePresence, motion } from 'framer-motion';
import { Product } from '../../app/models/product';
import OrderProductCard from './OrderProductCard';

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function OrderProductsGrid({ products, onSelect }: Props) {
  return (
    <div className='grid h-auto w-full grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-3'>
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
