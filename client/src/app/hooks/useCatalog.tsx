import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import {
  fetchCategoriesAsync,
  fetchProductsAsync,
  catalogSelectors,
} from '../slices/catalogSlice';

export default function useCatalog() {
  const dispatch = useAppDispatch();
  const { shopId } = useAppSelector((state) => state.account);
  const { productsLoaded, categoriesLoaded, categories } = useAppSelector(
    (state) => state.catalog
  );
  const products = useAppSelector(catalogSelectors.selectAll);

  useEffect(() => {
    if (!categoriesLoaded) {
      dispatch(fetchCategoriesAsync());
    }
  }, [dispatch, categoriesLoaded]);

  useEffect(() => {
    if (shopId && !productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, productsLoaded, shopId]);

  return {
    products,
    productsLoaded,
    categoriesLoaded,
    categories,
  };
}
