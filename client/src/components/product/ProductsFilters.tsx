import {ProductsManager} from '../../app/hooks/manager/useManageProducts';
import AppPageSize from '../common/AppPageSize';
import AppSearch from '../common/AppSearch';
import AppSort from '../common/AppSort';

interface Props {
  manager: ProductsManager;
}

export default function ProductsFilters({ manager }: Props) {
  const { setParams, setPageSize } = manager;

  function handleSort(value: string) {
    setParams({ orderBy: value });
  }

  const handleSearch = (value: string) => {
    setParams({ searchTerm: value });
  };

  const handlePageSizeChange = (count: number) => {
    setPageSize(count);
  };

  return (
    <div className=' flex flex-col lg:flex-row justify-start lg:justify-between items-end gap-5 w-full'>
      <AppSearch onSearch={handleSearch} />
      <div className='grid grid-cols-1  md:grid-cols-2 gap-5 lg:max-w-2xl items-end w-full'>
        <AppSort items={orderFilters} onSort={handleSort} initialValue='name' />
        <AppPageSize onChange={handlePageSizeChange} />
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
