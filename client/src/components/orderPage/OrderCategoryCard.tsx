import { Category } from '../../app/models/category';

interface Props {
  category: Category;
}

export default function OrderCategoryCard({ category }: Props) {
  return (
    <>
      {category.pictureUrl ? (
        <div className='flex h-20 flex-row items-center justify-center gap-x-5 overflow-hidden '>
          <div className='w-1/3 flex-initial overflow-hidden'>
            <img
              src={category.pictureUrl}
              alt={category.name}
              className=' h-20 w-full object-scale-down'
            />
          </div>

          <div className='flex-auto'>
            <p className=' font-Primary text-2xl font-thin capitalize'>
              {category.name}
            </p>
          </div>
        </div>
      ) : (
        <div className='flex h-20 items-center justify-center '>
          <p className=' font-Primary text-2xl font-thin uppercase'>
            {category.name}
          </p>
        </div>
      )}
    </>
  );
}
