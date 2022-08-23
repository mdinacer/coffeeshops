import { setPageSize, setProductParams } from '../../app/slices/productsSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import AppPageSize from '../common/AppPageSize';
import AppSearch from '../common/AppSearch';
import AppSort from '../common/AppSort';

export default function ProductsFilters() {
  const { productParams } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  function handleSort(value: string) {
    dispatch(setProductParams({ orderBy: value }));
  }

  const handleSearch = (value: string) => {
    if (value !== productParams.searchTerm) {
      dispatch(setProductParams({ searchTerm: value }));
    }
  };

  const handlePageSizeChange = (count: number) => {
    dispatch(setPageSize(count));
  };

  return (
    <div className=' flex w-full flex-col items-end justify-start gap-5 lg:flex-row lg:justify-between'>
      <AppSearch
        onSearch={handleSearch}
        initialValue={productParams.searchTerm}
      />
      <div className='grid w-full  grid-cols-1 items-end gap-5 md:grid-cols-2 lg:max-w-2xl'>
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
