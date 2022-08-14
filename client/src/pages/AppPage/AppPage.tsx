import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/store/configureStore';
import { useOutsideClick } from '../../app/utils/outsideClick';
import AppPageHeader from '../../components/appPage/AppPageHeader';
import AppPageSidebar from '../../components/appPage/AppPageSidebar';

interface Props {
  children: React.ReactNode;
}

export default function AppPage({ children }: Props) {
  const { user, roles } = useAppSelector((state) => state.account);
  const { shop } = useAppSelector((state) => state.shop);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  //const matches = useMediaQuery(mediaQueries.sm);
  const node = useRef(null);
  const { pathname } = useLocation();

  useOutsideClick(node, () => setSidebarExpanded(false));
  return (
    <motion.div
      layout
      className='select-none min-h-screen w-screen overflow-hidden bg-gray-200 flex flex-row items-stretch justify-start'
    >
      <AnimatePresence exitBeforeEnter>
        {sidebarExpanded && (
          <motion.div
            layout
            ref={node}
            initial={{ x: '-100%' }}
            exit={{ x: '-100%' }}
            animate={{
              x: 0,
            }}
            transition={{ stiffness: 100 }}
            style={{
              transformOrigin: 'left',
            }}
            className='absolute top-0 left-0 bottom-0 bg-white drop-shadow-md flex w-full md:w-full md:max-w-[400px] h-screen overflow-hidden z-30'
          >
            <AppPageSidebar
              shop={shop}
              roles={roles}
              user={user}
              onClose={() => setSidebarExpanded(false)}
            />
          </motion.div>
          // <motion.div
          //   layout
          //   ref={node}
          //   initial={{ scaleX: 0 }}
          //   exit={{ scaleX: 0 }}
          //   animate={{
          //     scaleX: 1,
          //   }}
          //   style={{
          //     transformOrigin: 'left',
          //   }}
          //   className='bg-white drop-shadow-md flex absolute w-full md:w-full md:max-w-[400px] md:relative top-0 left-0 h-screen overflow-hidden z-30'
          // >
          //   <AppPageSidebar
          //     shop={shop}
          //     roles={roles}
          //     user={user}
          //     onClose={() => setSidebarExpanded(false)}
          //   />
          // </motion.div>
        )}
      </AnimatePresence>
      <div className='relative w-screen flex flex-col '>
        {sidebarExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
            exit={{ opacity: 0, transition: { delay: 0.4 } }}
            className=' absolute md:block hidden top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60  backdrop-blur z-20'
          />
        )}
        <AppPageHeader
          sidebarExpanded={sidebarExpanded}
          user={user}
          onMenuButtonClick={(value) => setSidebarExpanded(value)}
          className=' flex-initial mb-2 '
        />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
            exit={{ opacity: 0, x: 100 }}
            transition={{
              stiffness: 100,
              staggerChildren: 0.34,
              duration: 0.3,
            }}
            key={pathname}
            className='relative flex-auto overflow-y-auto overflow-x-hidden'
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
