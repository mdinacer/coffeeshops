import { ViewGridIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import AppButtonSelect from './AppButtonSelect';

interface Props {
  onChange: (size: number) => void;
}

export default function AppPageSize({ onChange }: Props) {
  const [selectedSize, setSelectedSize] = useState(10);

  function handleSizeChange(size: number) {
    setSelectedSize(size);
    onChange(size);
  }
  return (
    <AppButtonSelect
      label='Page'
      items={pageSizes}
      Icon={ViewGridIcon}
      selectedValue={selectedSize}
      onChange={(item) => handleSizeChange(item.value)}
    />
  );
}

const pageSizes = [
  { title: '10', value: 10 },
  { title: '25', value: 25 },
  { title: '50', value: 50 },
];
