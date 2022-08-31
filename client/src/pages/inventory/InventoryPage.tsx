import useInventory from '../../app/hooks/useInventory';
import ListPageLayout from '../../app/layout/ListPageLayout';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import InventoryFilters from '../../components/inventory/InventoryFilters';
import InventoryList from '../../components/inventory/InventoryList';

export default function InventoryPage() {
  const {
    inventoryItems,
    inventoryParams,
    metaData,
    setPageNumber,
    setParams,
  } = useInventory();

  async function handlePageChange(page: number) {
    setPageNumber(page + 1);
  }

  return (
    <ListPageLayout
      title={'Inventaire'}
      list={<InventoryList products={inventoryItems} />}
      filters={
        <CollapsibleMenu title='Filtres'>
          <InventoryFilters
            inventoryParams={inventoryParams}
            setParams={setParams}
          />
        </CollapsibleMenu>
      }
      metaData={metaData}
      onPageChange={handlePageChange}
    />
  );
}
