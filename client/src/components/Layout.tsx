import { AnimatePresence } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  dialogVisible?: boolean;
  dialogContent?: React.ReactNode;
}

export default function Layout({
  children,
  className,
  dialogVisible = false,
  dialogContent,
}: Props) {
  return (
    <div
      className={`relative mx-auto h-full  w-full select-none px-5 py-10 2xl:container ${className}`}
    >
      {children}

      <AnimatePresence exitBeforeEnter>
        {dialogVisible && dialogContent && (
          <div className='fixed top-0 left-0 right-0 bottom-0 z-10 flex flex-col items-stretch justify-center overflow-y-auto bg-black bg-opacity-60  md:items-center'>
            {dialogContent}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
