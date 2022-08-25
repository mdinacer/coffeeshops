import { ViewGridIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import AppButtonSelect from './AppButtonSelect';

interface Props {
  onChange: (size: number) => void;
}

export default function AppPageSize({ onChange }: Props) {
  const [selectedSize, setSelectedSize] = useState(20);

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
  { title: '20', value: 20 },
  { title: '50', value: 50 },
  { title: '100', value: 100 },
];
