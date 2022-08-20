import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../../app/utils/outsideClick';
import ComponentWrapper from '../common/ComponentWrapper';

type DropDownItem = { title: string; value: any };

interface Props {
  label?: string;
  items: DropDownItem[];
  className?: string;
  buttonStyle?: string;
  selectedValue?: any;
  disabled?: boolean;
  button?: React.ReactNode;
  onChange: (item: DropDownItem) => void;
}
export default function DropDown({
  label,
  items,
  buttonStyle,
  selectedValue,
  disabled,
  button,
  className,
  onChange,
}: Props) {
  const node = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropDownItem | null>(null);

  function handleOnChange(item: DropDownItem) {
    setSelectedItem(item);
    onChange(item);
    setExpanded(false);
  }

  useEffect(() => {
    if (selectedValue) {
      const item = items.filter((i) => i.value === selectedValue)[0];
      setSelectedItem(item);
    }
  }, [items, selectedValue]);

  useOutsideClick(node, () => setExpanded(false));
  return (
    <div ref={node}>
      <ComponentWrapper
        button={button}
        label={label}
        element={
          <div className=' '>
            <button
              disabled={disabled}
              className={`flex w-full flex-row items-center justify-between overflow-hidden  py-2 px-3 ${buttonStyle}`}
              type='button'
              onClick={() => setExpanded((prev) => !prev)}
            >
              <AnimatePresence exitBeforeEnter>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  key={selectedItem?.title}
                  className='w-full flex-auto text-left font-Secondary first-letter:uppercase '
                >
                  {selectedItem?.title}
                </motion.p>
              </AnimatePresence>
              <ChevronDownIcon
                className={`h-6 w-6 flex-initial transition-all duration-300 ${
                  expanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
            <AnimatePresence exitBeforeEnter>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  key={'menu'}
                  layout
                  className='absolute left-0 z-20 mt-3 w-full  min-w-[16rem] max-w-xl rounded-xl  border  border-gray-300 bg-gray-100 py-2 px-4 drop-shadow-md'
                >
                  <ul className='list-none'>
                    {items.map((item, index) => (
                      <li
                        key={index}
                        className=' list-item rounded py-1 px-3 hover:bg-sky-500 hover:text-white'
                      >
                        <button
                          className='flex w-full flex-row items-center  text-left font-Secondary capitalize'
                          type='button'
                          onClick={() => handleOnChange(item)}
                        >
                          <div className='mr-1 h-6 w-6'>
                            {selectedItem?.value === item.value && (
                              <ChevronRightIcon className='h-6 w-6' />
                            )}
                          </div>
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        }
      />
    </div>
  );
}
