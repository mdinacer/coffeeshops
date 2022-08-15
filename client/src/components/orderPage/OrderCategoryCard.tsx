import {Category} from '../../app/models/category';

interface Props {
  category: Category;
}

export default function OrderCategoryCard({ category }: Props) {
  return (
    <>
      {category.pictureUrl ? (
        <div className='flex flex-row gap-x-5 items-center justify-center h-20 overflow-hidden '>
          <div className='flex-initial w-1/3 overflow-hidden'>
            <img
              src={category.pictureUrl}
              alt={category.name}
              className=' object-scale-down h-20 w-full'
            />
          </div>

          <div className='flex-auto'>
            <p className=' font-Primary text-2xl font-thin capitalize'>
              {category.name}
            </p>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-20 '>
          <p className=' font-Primary text-2xl font-thin uppercase'>
            {category.name}
          </p>
        </div>
      )}
    </>
  );
}
