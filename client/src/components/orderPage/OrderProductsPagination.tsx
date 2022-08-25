import { AnimateSharedLayout, motion } from 'framer-motion';
import { MetaData } from '../../app/models/pagination';
import { setPageNumber } from '../../app/slices/productsSlice';
import { useAppDispatch } from '../../app/store/configureStore';

interface Props {
  metaData: MetaData;
}
export default function OrderProductsPagination({ metaData }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className='relative flex w-full flex-initial items-center justify-center py-5'>
      <AnimateSharedLayout>
        <div className='relative flex flex-row gap-x-7'>
          {Array.from(Array(metaData.totalPages).keys()).map((item) => (
            <div
              key={item}
              className={`relative flex h-6 w-6  scale-125 items-center justify-center rounded-full bg-gray-300 `}
              onClick={() => dispatch(setPageNumber(item + 1))}
            >
              {metaData.currentPage === item + 1 && (
                <motion.div
                  layoutId='highlight'
                  className={`h-6 w-6 rounded-full border-2  border-gray-400     bg-yellow-500`}
                ></motion.div>
              )}
            </div>
          ))}
        </div>
      </AnimateSharedLayout>
    </div>
  );
}
