import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/store/configureStore';
import { useOutsideClick } from '../../app/utils/outsideClick';
import AppPageHeader from '../../components/appPage/AppPageHeader';
import AppPageSidebar from '../../components/appPage/AppPageSidebar';

interface Props {
  children: React.ReactNode;
}

export default function AppPage({ children }: Props) {
  const { user, shopId, roles } = useAppSelector((state) => state.account);
  const { shop } = useAppSelector((state) => state.shop);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const node = useRef(null);
  const { pathname } = useLocation();

  useOutsideClick(node, () => setSidebarExpanded(false));
  return (
    <>
      <motion.div
        layout
        className='flex max-h-screen min-h-screen w-screen select-none flex-row items-stretch justify-start overflow-hidden bg-stone-400 text-stone-500'
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
              className='absolute top-0 left-0 bottom-0 z-30 flex h-screen w-full overflow-hidden bg-stone-300 drop-shadow-md md:w-full md:max-w-[400px]'
            >
              <AppPageSidebar
                shop={shop}
                roles={roles}
                user={user}
                onClose={() => setSidebarExpanded(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className='relative flex w-screen flex-col '>
          {sidebarExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              exit={{ opacity: 0, transition: { delay: 0.4 } }}
              className=' absolute top-0 left-0 right-0 bottom-0 z-20 hidden bg-black bg-opacity-60  backdrop-blur md:block'
            />
          )}
          {user && shopId && (
            <AppPageHeader
              sidebarExpanded={sidebarExpanded}
              user={user}
              onMenuButtonClick={(value) => setSidebarExpanded(value)}
              className='relative flex-initial drop-shadow-md '
            />
          )}
          <AnimatePresence exitBeforeEnter>
            <div className=' flex-auto overflow-hidden '>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  stiffness: 100,
                }}
                className=' relative h-full w-full flex-auto overflow-y-auto overflow-x-hidden md:flex'
              >
                {children}
              </motion.div>
            </div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
