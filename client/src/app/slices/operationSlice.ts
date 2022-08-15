import {createAsyncThunk, createEntityAdapter, createSlice,} from '@reduxjs/toolkit';
import agent from '../api/agent';
import {Operation} from '../models/operation';
import {OperationParams} from '../models/operationParams';
import {OperationType} from '../models/OperationType';
import {MetaData} from '../models/pagination';
import {RootState} from '../store/configureStore';

interface OperationState {
  operationsLoaded: boolean;
  operationsLoading: boolean;
  operationParams: OperationParams;
  operationType: string;
  metaData: MetaData | null;
}

const operationsAdapter = createEntityAdapter<Operation>({
  selectId: (operation) => operation.id,
});

export function getAxiosOperationParams(operationParams: OperationParams) {
  const params = new URLSearchParams();
  params.append('pageNumber', operationParams.pageNumber.toString());
  params.append('pageSize', operationParams.pageSize.toString());
  params.append('orderBy', operationParams.orderBy);

  if (operationParams.type) {
    params.append('type', OperationType[operationParams.type]);
  } else {
    params.delete('type');
  }

  if (operationParams.startDate) {
    params.append('startDate', operationParams.startDate);
  } else {
    params.delete('startDate');
  }

  if (operationParams.endDate) {
    params.append('endDate', operationParams.endDate);
  } else {
    params.delete('endDate');
  }

  return params;
}

export const fetchOperationsAsync = createAsyncThunk<
  Operation[],
  void,
  { state: RootState }
>('operation/fetchOperationsAsync', async (_, thunkApi) => {
  const operationParams = thunkApi.getState().operation.operationParams;
  const params = getAxiosOperationParams(operationParams);
  try {
    const response: any = await agent.Operations.list(params);
    thunkApi.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

export const fetchOperationAsync = createAsyncThunk<Operation, string>(
  'operation/fetchOperationAsync',
  async (operationId, thunkApi) => {
    try {
      const response: Operation = await agent.Operations.get(operationId);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

function initParams(): OperationParams {
  return {
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'name',
    type: OperationType.sale,
  };
}

export const operationSlice = createSlice({
  name: 'operation',
  initialState: operationsAdapter.getInitialState<OperationState>({
    operationsLoading: false,
    operationsLoaded: false,
    operationParams: initParams(),
    operationType: OperationType[1],
    metaData: null,
  }),
  reducers: {
    setOperationParams: (state, action) => {
      state.operationsLoaded = false;
      state.operationParams = {
        ...state.operationParams,
        ...action.payload,
        pageNumber: 1,
      };
      state.operationType = state.operationParams.type.toString();
    },

    setPageNumber: (state, action) => {
      state.operationsLoaded = false;
      state.operationParams = { ...state.operationParams, ...action.payload };
    },

    setPageSize: (state, action) => {
      state.operationsLoaded = false;
      state.operationParams = { ...state.operationParams, ...action.payload };
    },

    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    resetOperationParams: (state) => {
      state.operationParams = initParams();
      state.operationType = OperationType[1];
    },

    addOperation: operationsAdapter.addOne,
    updateOperation: operationsAdapter.updateOne,
    removeOperation: operationsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOperationsAsync.pending, (state) => {
      state.operationsLoading = true;
    });

    builder.addCase(fetchOperationsAsync.fulfilled, (state, action) => {
      operationsAdapter.setAll(state, action.payload);
      state.operationsLoading = false;
      state.operationsLoaded = true;
    });

    builder.addCase(fetchOperationsAsync.rejected, (state) => {
      state.operationsLoading = false;
    });

    builder.addCase(fetchOperationAsync.pending, (state) => {});

    builder.addCase(fetchOperationAsync.fulfilled, (state, action) => {
      operationsAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(fetchOperationAsync.rejected, (state) => {});
  },
});

export const operationSelectors = operationsAdapter.getSelectors(
  (state: RootState) => state.operation
);

export const {
  setOperationParams,
  resetOperationParams,
  setMetaData,
  setPageNumber,
  setPageSize,
  addOperation,
  updateOperation,
  removeOperation,
} = operationSlice.actions;
