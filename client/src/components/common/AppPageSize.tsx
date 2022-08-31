import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import AppButtonSelect from './AppButtonSelect';

interface Props {
  onChange: (size: number) => void;
  items?: Array<number>;
}

export default function AppPageSize({ items, onChange }: Props) {
  const [selectedSize, setSelectedSize] = useState((items || pageSizes)[0]);

  function handleSizeChange(size: number) {
    setSelectedSize(size);
    onChange(size);
  }
  return (
    <AppButtonSelect
      label='Page'
      items={(items || pageSizes).map((e) => ({
        title: e.toString(),
        value: e,
      }))}
      Icon={SquaresPlusIcon}
      selectedValue={selectedSize}
      onChange={(item) => handleSizeChange(item.value)}
    />
  );
}

const pageSizes = [5, 10, 20, 30];
