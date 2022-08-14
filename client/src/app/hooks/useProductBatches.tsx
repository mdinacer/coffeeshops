import { useCallback, useEffect, useState } from 'react';
import agent from '../api/agent';
import { ProductBatch } from '../models/ProductBatch';

export default function useProductBatches(
  productId: string | undefined | null
) {
  const [batches, setBatches] = useState<ProductBatch[]>([]);
  const [batchesLoading, setBatchesLoading] = useState(false);
  const [batchesLoaded, setBatchesLoaded] = useState(false);

  const fetchBatches = useCallback(async (productId: string) => {
    setBatchesLoading(true);
    try {
      const result: ProductBatch[] = await agent.Products.listBatches(
        productId
      );
      if (result) {
        setBatches(result);
        setBatchesLoaded(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBatchesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productId && !batchesLoaded) {
      fetchBatches(productId).then();
    }
    // return () => {
    //   setBatches([]);
    // };
  }, [batchesLoaded, fetchBatches, productId]);

  return {
    batches,
    batchesLoaded,
    batchesLoading,
  };
}
