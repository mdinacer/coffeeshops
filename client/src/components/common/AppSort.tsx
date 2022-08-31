import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';

import { useState } from 'react';
import DropDown from '../input/DropDown';

interface Props {
  initialValue?: string;
  items: Array<{ title: string; value: any }>;
  onSort: (value: string) => void;
}

export default function AppSort({ items, initialValue, onSort }: Props) {
  const [isAscending, setIsAscending] = useState(true);
  const [orderDirection, setOrderDirection] = useState('Asc');
  const [selectedOrder, setSelectedOrder] = useState(initialValue || '');

  const handleOrderChange = (value: string) => {
    onSort(`${value}${orderDirection === 'Desc' ? 'Desc' : ''}`);
  };
  const handleOrderDirectionChange = (value: string) => {
    onSort(`${selectedOrder}${value === 'Desc' ? 'Desc' : ''}`);
  };
  return (
    <DropDown
      label={`Trier par`}
      className='flex-auto py-1'
      buttonStyle=' border-none px-0  '
      items={items}
      selectedValue={selectedOrder}
      onChange={(item) => {
        setSelectedOrder(item.value);
        handleOrderChange(item.value);
      }}
      button={
        <button
          className='flex h-full w-full items-center justify-center px-2'
          type='button'
          title={`Ordre ${isAscending ? 'Ascendant' : 'Descendant'}`}
          onClick={() => {
            const direction = !isAscending;
            setIsAscending(direction);
            setOrderDirection(direction ? 'Asc' : 'Desc');
            handleOrderDirectionChange(direction ? 'Asc' : 'Desc');
          }}
        >
          {isAscending ? (
            <BarsArrowUpIcon className='h-6 w-6' />
          ) : (
            <BarsArrowDownIcon className='h-6 w-6' />
          )}
        </button>
      }
    />
  );
}
