import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import {
  fetchCategoriesAsync,
  fetchProductsAsync,
  productSelectors,
} from '../slices/productsSlice';

export default function useProducts() {
  const products = useAppSelector(productSelectors.selectAll);
  const { shopId } = useAppSelector((state) => state.account);
  const { productsLoaded, categoriesLoaded, categories, metaData } =
    useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shopId && !productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, productsLoaded, shopId]);

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
