import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ProfilePage from '../../pages/account/ProfilePage';
import ProductsManagerPage from '../../pages/manager/ProductsManagerPage';
import ShopManagerPage from '../../pages/manager/ShopManagerPage';

export default function ManagerPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className='relative flex h-full w-full flex-col items-stretch overflow-hidden rounded-2xl  bg-white'>
      <div className='  mx-auto flex w-auto flex-initial items-center justify-center rounded-b-full bg-sky-900 px-20  text-white'>
        <ul className=' grid list-none grid-cols-3 gap-5'>
          {['Shop', 'Profile', 'Products'].map((item, index) => (
            <li key={index} className=' list-item'>
              <button
                onClick={() => setSelectedIndex(index + 1)}
                className='relative w-full px-2 font-Primary text-lg font-thin uppercase'
              >
                {selectedIndex === index + 1 && (
                  <motion.div
                    layoutId='underline'
                    layout
                    className='absolute top-0 left-0 flex h-full w-full  bg-sky-400'
                  ></motion.div>
                )}
                <span className='relative'>{item}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <motion.div className='  h-full w-full overflow-hidden'>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex h-full w-full items-center justify-center'
          >
            {getView(selectedIndex)}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function getView(index: number) {
  switch (index) {
    case 1:
      return <ShopManagerPage />;

    case 2:
      return <ProfilePage />;

    case 3:
      return <ProductsManagerPage />;

    default:
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet debitis
        excepturi non cum nobis praesentium alias enim. Magni, minima, ut,
        voluptate iste tempore expedita rem et reprehenderit eligendi aperiam
        incidunt?
      </div>;
      break;
  }
}
