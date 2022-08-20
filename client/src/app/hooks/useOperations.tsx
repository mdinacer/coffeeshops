import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import {
  fetchOperationsAsync,
  operationSelectors,
} from '../slices/operationSlice';

export default function useOperations() {
  const operations = useAppSelector(operationSelectors.selectAll);
  const { operationsLoaded, metaData, status, operationType } = useAppSelector(
    (state) => state.operation
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!operationsLoaded && !status.includes('pending')) {
      dispatch(fetchOperationsAsync());
    }
  }, [dispatch, operationsLoaded, status]);

  return {
    operations,
    operationsLoaded,
    operationType,
    metaData,
  };
}
