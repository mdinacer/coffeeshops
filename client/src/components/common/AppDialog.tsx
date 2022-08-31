import { motion } from 'framer-motion';
import AppButton, { buttonGenre } from './AppButton';

interface Props {
  children: React.ReactNode;
  title?: string;
  onClose?: (result: boolean) => void;
  buttonsVisible?: boolean;
  okButtonText?: string;
  okButtonGenre?: buttonGenre;
  cancelButtonText?: string;
  className?: string;
}
export default function AppDialog({
  title,
  onClose,
  children,
  okButtonText = 'Valider',
  okButtonGenre,
  cancelButtonText = 'Fermer',
  buttonsVisible = true,
  className = ' md:min-w-[30vw] ',
}: Props) {
  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 500, opacity: 0 }}
      className={` ${className}   w-auto flex-col items-stretch overflow-y-auto  border  border-stone-300 bg-stone-200 p-3 drop-shadow-md md:flex md:rounded-2xl md:p-6 `}
    >
      {title && (
        <div className=' mb-2 flex-initial  border-b border-b-stone-200 px-5 pb-2'>
          <h1 className=' text-center font-Secondary text-2xl font-semibold uppercase md:text-3xl'>
            {title}
          </h1>
        </div>
      )}
      <div className=' flex-auto font-Secondary '>{children}</div>
      {buttonsVisible && onClose && (
        <div className='mt-5 flex w-full flex-row justify-around gap-x-5 px-5 py-2'>
          <AppButton
            label={cancelButtonText}
            genre='secondary'
            className='w-full'
            onClick={() => onClose(false)}
          />
          <AppButton
            label={okButtonText}
            genre={okButtonGenre || 'primary'}
            className='w-full'
            onClick={() => onClose(true)}
          />
        </div>
      )}
    </motion.div>
  );
}
