import { XIcon } from '@heroicons/react/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useOutsideClick } from '../../app/utils/outsideClick';

interface Props {
  title: string;
  active: boolean;
  children: React.ReactNode;
  containerStyle?: string;
  contentStyle?: string;
  onClose?: () => void;
}

export default function ModalDialog({
  title,
  active,
  children,
  containerStyle,
  contentStyle,
  onClose,
}: Props) {
  const node = useRef(null);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useOutsideClick(node, handleClose);
  return ReactDOM.createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='open'
          exit='close'
          className='fixed top-0 left-0 z-50 h-screen w-screen select-none items-center justify-center overscroll-none bg-stone-900 bg-opacity-80 backdrop-blur md:flex'
        >
          <motion.div
            ref={node}
            layout
            variants={itemVariants}
            className={`${containerStyle} in-h-[20rem] flex max-h-screen w-auto max-w-screen-xl flex-col items-stretch  rounded bg-stone-200 md:min-w-[32rem]`}
          >
            <div className=' z-10 flex w-full flex-initial flex-row items-center justify-between border-b border-b-stone-400 bg-stone-600 px-6 py-2 text-stone-400 drop-shadow-md'>
              <p className=' font-Primary text-2xl font-light uppercase'>
                {title}
              </p>
              {onClose && (
                <button type='button' title='Fermer' onClick={onClose}>
                  <XIcon className=' h-7 w-7' />
                </button>
              )}
            </div>
            <div
              className={`${contentStyle}  flex-auto overflow-y-auto bg-stone-200 p-5 text-stone-700`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector('#modal')!
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.4 },
  },
  close: { opacity: 0, transition: { delay: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -100 },
  open: { opacity: 1, x: 0 },
  close: { opacity: 0, x: 100 },
};
