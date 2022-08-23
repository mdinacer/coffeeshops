import useProducts from '../../app/hooks/useProducts';
import ListPageLayout from '../../app/layout/ListPageLayout';
import { setPageNumber } from '../../app/slices/productsSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import InventoryList from '../../components/inventory/InventoryList';
import ProductsFilters from '../../components/product/ProductsFilters';

export default function InventoryPage() {
  const dispatch = useAppDispatch();
  const { products, metaData } = useProducts();

  async function handlePageChange(page: number) {
    dispatch(setPageNumber(page));
  }
  return (
    <ListPageLayout
      title={'Inventaire'}
      list={<InventoryList products={products} />}
      filters={
        <CollapsibleMenu title='Filtres'>
          <ProductsFilters />
        </CollapsibleMenu>
      }
      metaData={metaData}
      onPageChange={handlePageChange}
    />
  );
}
