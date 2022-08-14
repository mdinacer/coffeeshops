import { AnimateSharedLayout, motion } from 'framer-motion';
import { MetaData } from '../../app/models/pagination';
import { setPageNumber } from '../../app/slices/shopSlice';
import { useAppDispatch } from '../../app/store/configureStore';

interface Props {
  metaData: MetaData;
}
export default function OrderProductsPagination({ metaData }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className='relative flex-initial py-5 w-full flex items-center justify-center'>
      <AnimateSharedLayout>
        <div className='relative flex flex-row gap-x-7'>
          {Array.from(Array(metaData.totalPages).keys()).map((item) => (
            <div
              key={item}
              className={`relative w-6 h-6 rounded-full  bg-gray-300 scale-125 flex items-center justify-center `}
              onClick={() => dispatch(setPageNumber({ pageNumber: item + 1 }))}
            >
              {metaData.currentPage === item + 1 && (
                <motion.div
                  layoutId='highlight'
                  className={`w-6 h-6 border-2 border-gray-400  rounded-full     bg-indigo-500`}
                ></motion.div>
              )}
            </div>
          ))}
        </div>
      </AnimateSharedLayout>
    </div>
  );
}
