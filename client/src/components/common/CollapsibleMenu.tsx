import {MenuAlt2Icon} from '@heroicons/react/solid';
import {useState} from 'react';

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
          ' md:hidden flex flex-row items-center px-3 py-1 rounded w-full '
        }
        onClick={() => setExpanded((prev) => !prev)}
      >
        <MenuAlt2Icon className='h-6 w-6 mr-2' />
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
