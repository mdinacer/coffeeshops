import {AnimatePresence} from 'framer-motion';

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
      className={`relative select-none w-full  h-full xl:container mx-auto px-5 py-10 ${className}`}
    >
      {children}

      <AnimatePresence exitBeforeEnter>
        {dialogVisible && dialogContent && (
          <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 md:flex items-center md:justify-center z-10'>
            {dialogContent}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
