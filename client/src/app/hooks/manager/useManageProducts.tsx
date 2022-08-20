import { useCallback, useEffect, useState } from 'react';
import agent from '../../api/agent';
import { MetaData } from '../../models/pagination';
import { Product } from '../../models/product';
import { ProductParams } from '../../models/productParams';
import { getAxiosProductParams } from '../../slices/shopSlice';

export default function useManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [productParams, setProductParams] = useState<ProductParams>(
    initParams()
  );

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const params = getAxiosProductParams(productParams);
      const result = await agent.Products.list(params);
      if (result) {
        setMetaData(result.metaData);
        setProducts(result.items);
        setProductsLoaded(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProductsLoading(false);
    }
  }, [productParams]);

  function setParams(value: any) {
    setProductParams((prev) => ({ ...prev, ...value, pageNumber: 1 }));
    setProductsLoaded(false);
  }

  function setPageNumber(page: number) {
    setProductParams((prev) => ({ ...prev, pageNumber: page }));
    setProductsLoaded(false);
  }

  function setPageSize(size: number) {
    setProductParams((prev) => ({ ...prev, pageSize: size }));
    setProductsLoaded(false);
  }

  function refreshProducts() {
    setProductsLoaded(false);
  }

  function addProduct(product: Product) {
    if (product) {
      const items = [...products, product].sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setProducts(items);
      console.log(products);
    }
  }

  useEffect(() => {
    if (!productsLoaded && !productsLoading) {
      fetchProducts();
    }
  }, [productsLoaded, productsLoading]);

  return {
    products,
    productsLoaded,
    productsLoading,
    metaData,
    addProduct,
    setParams,
    setPageNumber,
    setPageSize,
    refreshProducts,
  };
}

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 15,
    orderBy: 'name',
    showcase: null,
    searchTerm: null,
  };
}

export interface ProductsManager {
  products: Product[];
  productsLoaded: boolean;
  productsLoading: boolean;
  metaData: MetaData | null;
  setParams: (value: any) => void;
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
}
