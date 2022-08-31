import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
  contentStyles?: string;
}

export default function CollapsibleMenu({
  title,
  children,
  className,
  contentStyles,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <button
        type='button'
        className={
          className +
          ' flex w-full flex-row items-center rounded px-3 py-1 md:hidden '
        }
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Bars3BottomLeftIcon className='mr-2 h-6 w-6' />
        <span className=' font-Primary text-xl font-light uppercase'>
          {title}
        </span>
      </button>
      <div
        className={` py-5 md:py-0 ${
          expanded ? 'block md:block' : ' hidden md:block'
        }  ${contentStyles}`}
      >
        {children}
      </div>
    </>
  );
}
