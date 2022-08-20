import { Product } from '../../app/models/product';

interface Props {
  product: Product;
}

export default function OrderProductCard({ product }: Props) {
  return (
    <div className='flex h-full  w-full flex-col items-center justify-center rounded-md bg-gray-100 md:justify-between'>
      <div className='flex-auto overflow-hidden p-2'>
        <img
          src={product.pictureUrl}
          alt={product.name}
          className=' h-full max-h-[50px] w-[100px]  object-scale-down   md:max-h-[80px] md:w-full'
        />
      </div>
      <div className=' flex-initial py-2 px-5'>
        <p className=' font-Secondary text-base capitalize  lg:text-lg'>
          {product.name}
        </p>
        <small className=' font-Secondary text-sm capitalize'>
          {product.description}
        </small>

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
