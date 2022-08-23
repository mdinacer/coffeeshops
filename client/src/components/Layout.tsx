import { AnimatePresence } from 'framer-motion';
import ModalDialog from './common/ModalDialog';

interface Props {
  children: React.ReactNode;
  className?: string;
  dialogVisible?: boolean;
  dialogTitle?: string;
  dialogContent?: React.ReactNode;
  dialogOnClose?: () => void;
}

export default function Layout({ children, className }: Props) {
  return (
    <div
      className={`relative mx-auto h-full w-full select-none px-5 py-10 2xl:container ${className}`}
    >
      {children}
    </div>
  );
}
