import { useCallback, useEffect, useState } from 'react';

import agent from '../api/agent';
import { InventoryItem } from '../models/inventoryItem';
import { MetaData } from '../models/pagination';
import { ProductParams } from '../models/productParams';
import { getAxiosProductParams } from '../slices/productsSlice';

export default function useInventory() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [inventoryParams, setInventoryParams] = useState<ProductParams>(
    initParams()
  );
  const [metaData, setMetaData] = useState<MetaData | null>(null);

  const fetchInventory = useCallback(async () => {
    setItemsLoading(true);
    const params = getAxiosProductParams(inventoryParams);
    try {
      const response: any = await agent.Products.listPaginated(params);
      const { items, metaData } = response;
      setMetaData(metaData);
      setInventoryItems(items);
    } catch (error) {
      console.log(error);
    } finally {
      setItemsLoading(false);
    }
  }, [inventoryParams]);

  function setParams(value: any) {
    setInventoryParams((prev) => ({ ...prev, ...value, pageNumber: 1 }));
    setItemsLoaded(false);
  }

  function setPageNumber(page: number) {
    setInventoryParams((prev) => ({ ...prev, pageNumber: page }));
    setItemsLoaded(false);
  }

  function setPageSize(size: number) {
    setParams({ pageSize: size });
  }

  useEffect(() => {
    if (!itemsLoaded && !itemsLoading) {
      fetchInventory().then(() => setItemsLoaded(true));
    }
  }, [itemsLoaded, itemsLoading]);

  return {
    inventoryItems,
    itemsLoaded,
    metaData,
    inventoryParams,
    setParams,
    setPageNumber,
    setPageSize,
  };
}

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 15,
    orderBy: 'name',
    showcase: true,
    paginate: true,
  };
}
