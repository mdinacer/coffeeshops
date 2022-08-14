import { useCallback, useEffect, useState } from 'react';
import agent from '../api/agent';
import { OperationElement } from '../models/OperationElement';

export default function useProductPurchases(
  productId: string | undefined | null
) {
  const [purchases, setPurchases] = useState<OperationElement[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(false);
  const [purchasesLoaded, setPurchasesLoaded] = useState(false);

  const fetchPurchases = useCallback(async (productId: string) => {
    setPurchasesLoading(true);
    try {
      const result: OperationElement[] = await agent.Products.listPurchases(
        productId
      );
      if (result) {
        setPurchases(result);
        setPurchasesLoaded(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPurchasesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productId && !purchasesLoaded) {
      fetchPurchases(productId);
    }
  }, [purchasesLoaded, fetchPurchases, productId]);

  return {
    purchases,
    purchasesLoaded,
    purchasesLoading,
  };
}
