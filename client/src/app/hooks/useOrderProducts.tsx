import { useState, useCallback } from 'react';
import agent from '../api/agent';
import { Product } from '../models/product';
import useProducts from './useProducts';

export default function useOrderProducts() {
  const { categories } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);

    try {
      const response: any = await agent.Products.list();
      setProducts(response);
      setProductsLoaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  return {
    products,
    categories,
    productsLoaded,
    productsLoading,
    fetchProducts,
  };
}
