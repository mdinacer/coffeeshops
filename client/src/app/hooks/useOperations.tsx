import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import {
  fetchOperationsAsync,
  operationSelectors,
} from '../slices/operationSlice';

export default function useOperations() {
  const operations = useAppSelector(operationSelectors.selectAll);
  const { operationsLoaded, operationsLoading, metaData, operationType } =
    useAppSelector((state) => state.operation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!operationsLoaded && !operationsLoading) {
      dispatch(fetchOperationsAsync());
    }
  }, [dispatch, operationsLoaded, operationsLoading]);

  return {
    operations,
    operationsLoaded,
    operationType,
    metaData,
  };
}
