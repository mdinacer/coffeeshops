import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import {
  fetchCategoriesAsync,
  fetchProductsAsync,
  productSelectors,
} from '../slices/productsSlice';

export default function useProducts() {
  const products = useAppSelector(productSelectors.selectAll);
  const { shop } = useAppSelector((state) => state.shop);
  const { productsLoaded, categoriesLoaded, categories, metaData } =
    useAppSelector((state) => state.products);
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
