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
  className,
}: Props) {
  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 500, opacity: 0 }}
      className={` ${className}  bg-gray-100 border border-gray-300 md:rounded-2xl   w-auto  flex flex-col items-stretch overflow-hidde md:p-6 p-3 drop-shadow-md `}
    >
      {title && (
        <div className=' flex-initial px-5  pb-2 border-b border-b-gray-200 mb-2'>
          <h1 className=' font-Secondary text-2xl md:text-3xl font-semibold uppercase'>
            {title}
          </h1>
        </div>
      )}
      <div className=' flex-auto font-Secondary '>{children}</div>
      {buttonsVisible && onClose && (
        <div className='w-full flex flex-row gap-x-5 justify-around px-5 py-2 mt-5'>
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
