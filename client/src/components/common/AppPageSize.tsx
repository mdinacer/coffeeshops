import {ViewGridIcon} from '@heroicons/react/solid';
import {motion} from 'framer-motion';
import {useState} from 'react';

interface Props {
  onChange: (size: number) => void;
}

export default function AppPageSize({ onChange }: Props) {
  const [selectedSize, setSelectedSize] = useState(10);

  function handleSizeChange(size: number) {
    setSelectedSize(size);
    onChange(size);
  }

  const isSelected = (size: number) => selectedSize === size;
  return (
    <div className='flex flex-row items-center gap-x-3'>
      <div className='flex-initial'>
        <p className='text-sm flex-initial w-max uppercase  overflow-hidden  opacity-50 border-r border-gray-400 pr-2  hover:text-indigo-900'>
          Page
        </p>
      </div>

      <div className=' grid grid-cols-3 gap-2 flex-auto'>
        {pageSizes.map((item, index) => (
          <button
            key={index}
            type='button'
            className={`relative bg-gray-100  py-1 px-2 inline-flex gap-x-2 items-center justify-center  rounded-md  ${
              isSelected(item.value) ? ' text-white' : '  text-inherit'
            }`}
            onClick={() => handleSizeChange(item.value)}
          >
            {isSelected(item.value) && (
              <motion.div
                layoutId='appPageSizeHighlight'
                className=' z-[1] absolute top-0 left-0 right-0 bottom-0 bg-indigo-500 rounded-md'
              ></motion.div>
            )}
            <ViewGridIcon className='  z-[2] h-5 w-5 text-inherit' />
            <span className=' z-[2] relative font-Primary text-lg font-thin'>
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const pageSizes = [
  { title: '10', value: 10 },
  { title: '25', value: 25 },
  { title: '50', value: 50 },
];
