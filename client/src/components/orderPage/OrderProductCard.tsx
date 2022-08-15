import {Product} from '../../app/models/product';

interface Props {
  product: Product;
}

export default function OrderProductCard({ product }: Props) {
  return (
    <div className='md:h-auto h-full  w-full bg-white flex flex-col justify-center items-center md:justify-between rounded'>
      <div className='flex-auto overflow-hidden p-2'>
        <img
          src={product.pictureUrl}
          alt={product.name}
          className=' object-scale-down h-full max-h-[50px]  md:max-h-[80px]   w-[100px] md:w-full'
        />
      </div>
      <div className=' py-2 px-5 flex-initial'>
        <p className=' font-Secondary capitalize text-base  lg:text-lg'>
          {product.name}
        </p>

        {/* <p className='font-Primary font-light text-right'>
          <span className=' font-Primary text-lg lg:text-xl font-light'>
            {product.price.toFixed(2)}
          </span>
          <span className='ml-1 text-sm uppercase'>{CURRENCY_TEXT}</span>
        </p> */}
      </div>
    </div>
  );
}
