import { Product } from '../../app/models/product';
import { formatNumber } from '../../app/utils/utils';

interface Props {
  product: Product;
}

export default function OrderProductCard({ product }: Props) {
  return (
    <div className='relative flex h-full  min-h-[20vh] w-full flex-col items-center justify-between bg-stone-300 text-stone-700 md:justify-between xl:p-5'>
      <img
        src={product.pictureUrl}
        alt={product.name}
        className='object-auto absolute top-0 left-0 right-0 bottom-0 h-full w-full object-scale-down '
      />

      <div className='absolute top-0 right-0 flex  items-center justify-center bg-stone-600 p-2'>
        <p className='font-Primary font-thin  text-stone-300'>
          <span className={`text-xl`}>{formatNumber(product.price)}</span>
          <span className={`ml-1 text-sm`}>Da</span>
        </p>
      </div>

      {/* <div className='max-h-[50px] w-[100px]  flex-initial overflow-hidden p-2 md:max-h-[80px]'>
        <img
          src={product.pictureUrl}
          alt={product.name}
          className='object-auto h-full w-full object-cover'
        />
      </div> */}
      <div className='absolute bottom-0 left-0 right-0 flex flex-auto flex-col items-stretch bg-stone-700 bg-opacity-70 py-2 text-stone-200 '>
        <p className=' flex-auto font-Secondary text-base capitalize  lg:text-lg'>
          {product.name}
        </p>
        <small className=' flex-initial font-Secondary text-sm capitalize'>
          {product.description || product.category}
        </small>
      </div>
    </div>
  );
}
