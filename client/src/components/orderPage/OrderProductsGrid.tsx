import { AnimatePresence, motion } from 'framer-motion';
import { Product } from '../../app/models/product';
import OrderProductCard from './OrderProductCard';

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function OrderProductsGrid({ products = [], onSelect }: Props) {
  return (
    <>
      {products.length > 0 ? (
        <div className='grid h-auto max-h-full w-full grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4'>
          <AnimatePresence>
            {products.map((product) => (
              <motion.button
                type='button'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={product.id}
                className='w-full border border-stone-600'
                onClick={() => onSelect(product)}
              >
                <OrderProductCard product={product} />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className='flex  h-full w-full items-center justify-center'>
          <p className=' font-Primary text-5xl uppercase  text-stone-600 opacity-50'>
            Aucun produit
          </p>
        </div>
      )}
    </>
  );
}
