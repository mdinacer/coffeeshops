import { motion } from 'framer-motion';

type ListItem = { title: string; value: any };

interface Props {
  label?: string;
  items: Array<ListItem>;
  selectedValue: any;
  onChange: (item: ListItem) => void;
  initialValue?: any;
  Icon?: (props: any) => JSX.Element;
}

export default function AppButtonSelect({
  label,
  items,
  selectedValue,
  Icon,
  onChange,
}: Props) {
  function handleSelectionChange(item: ListItem) {
    onChange(item);
  }

  const isSelected = (value: any) => selectedValue === value;
  return (
    <div className='flex h-full flex-row items-center gap-x-3'>
      {label && (
        <div className='flex-initial'>
          <p className='w-max flex-initial overflow-hidden border-r  border-stone-400  pr-2 text-sm uppercase opacity-50  hover:text-yellow-900'>
            {label}
          </p>
        </div>
      )}

      <div className=' grid flex-auto grid-flow-col gap-2'>
        {items.map((item, index) => (
          <button
            key={index}
            type='button'
            className={`relative inline-flex  items-center justify-center gap-x-2 rounded-md bg-stone-300 py-1  px-2  ${
              isSelected(item.value) ? ' text-stone-700' : '  text-inherit'
            }`}
            onClick={() => handleSelectionChange(item)}
          >
            {isSelected(item.value) && (
              <motion.div
                layoutId={`${label}Highlight`}
                className=' absolute top-0 left-0 right-0 bottom-0 z-[1] rounded-md bg-yellow-500'
              ></motion.div>
            )}
            {Icon && <Icon className='  z-[2] h-5 w-5 text-inherit' />}
            <span className=' relative z-[2] font-Primary text-lg font-thin capitalize'>
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
