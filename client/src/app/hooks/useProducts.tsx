import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import {
  fetchCategoriesAsync,
  fetchProductsAsync,
  productSelectors,
} from '../slices/shopSlice';

export default function useProducts() {
  const products = useAppSelector(productSelectors.selectAll);
  const { shop, productsLoaded, categoriesLoaded, categories, metaData } =
    useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shop && !productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, productsLoaded, shop]);

  useEffect(() => {
    if (!categoriesLoaded) {
      dispatch(fetchCategoriesAsync());
    }
  }, [dispatch, categoriesLoaded]);

  return {
    products,
    productsLoaded,
    categoriesLoaded,
    categories,
    metaData,
  };
}
