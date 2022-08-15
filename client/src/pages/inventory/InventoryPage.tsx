import useManageProducts, {ProductsManager,} from '../../app/hooks/manager/useManageProducts';
import ListPageLayout from '../../app/layout/ListPageLayout';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import InventoryList from '../../components/inventory/InventoryList';
import ProductsFilters from '../../components/product/ProductsFilters';

export default function InventoryPage() {
  const manager: ProductsManager = useManageProducts();
  const { products, metaData, setPageNumber } = manager;

  async function handlePageChange(page: number) {
    setPageNumber(page);
  }
  return (
    <ListPageLayout
      title={'Inventaire'}
      list={<InventoryList products={products} />}
      filters={
        <CollapsibleMenu title='Filtres'>
          <ProductsFilters manager={manager} />
        </CollapsibleMenu>
      }
      metaData={metaData}
      onPageChange={handlePageChange}
    />
  );
}
