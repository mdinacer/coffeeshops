import { setProductParams } from '../../app/slices/productsSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
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

  return (
    <div className=' flex w-full flex-col items-end justify-start gap-5 lg:flex-row lg:justify-between'>
      <div className='w-full  md:max-w-lg'>
        <AppSearch
          onSearch={handleSearch}
          initialValue={productParams.searchTerm}
        />
      </div>
      <div className='w-full  md:max-w-sm'>
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
