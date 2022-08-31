import { ProductParams } from '../../app/models/productParams';
import AppSearch from '../common/AppSearch';
import AppSort from '../common/AppSort';

interface Props {
  inventoryParams: ProductParams;
  setParams: (value: any) => void;
}

export default function InventoryFilters({
  inventoryParams,
  setParams,
}: Props) {
  function handleSort(value: string) {
    setParams({ orderBy: value });
  }

  const handleSearch = (value: string) => {
    if (value !== inventoryParams.searchTerm) {
      setParams({ searchTerm: value });
    }
  };

  return (
    <div className=' flex w-full flex-col items-end justify-between gap-5 lg:flex-row lg:justify-between'>
      <div className=' w-full md:max-w-xl'>
        <AppSearch
          onSearch={handleSearch}
          initialValue={inventoryParams.searchTerm}
        />
      </div>
      <div className=' w-full   lg:max-w-sm'>
        <AppSort items={orderFilters} onSort={handleSort} initialValue='name' />
      </div>
    </div>
  );
}

const orderFilters = [
  { title: 'Désignation', value: 'name' },
  { title: 'Catégorie', value: 'category' },
  { title: 'Stock', value: 'inventory' },
  { title: 'Prix', value: 'price' },
  { title: 'Vente', value: 'sold' },
];
