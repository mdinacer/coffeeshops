import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { EmptyOrder, Order, Table } from "../models/order";
import { RootState } from "../store/configureStore";

interface OrdersState {
    ordersCacheLoaded: boolean;
    ordersCacheLoading: boolean;
    tables: Table[],
    status: "idle" | "pending" | "error";
}

const ordersAdapter = createEntityAdapter<Order>({
    selectId: (order) => order.table,

});

export const fetchCachedOrdersAsync = createAsyncThunk<
    Order[],
    void
>(
    'orders/fetchCachedOrdersAsync',
    async (_, thunkApi) => {
        try {
            const response = await agent.Orders.list();
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchCachedOrderAsync = createAsyncThunk<
    Order,
    string
>('orders/fetchCachedOrderAsync', async (orderId, thunkApi) => {

    try {
        const response: Order = await agent.Orders.get(orderId);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue({ error: error.data });
    }
});



export const orderSlice = createSlice({
    name: 'order',
    initialState: ordersAdapter.getInitialState<OrdersState>({
        ordersCacheLoaded: false,
        ordersCacheLoading: false,
        status: 'idle',
        tables: []

    }),
    reducers: {
        initTables: (state, action) => {
            const count: number = action.payload.tablesCount;
            const cachedOrders: EmptyOrder[] | null = action.payload.values

            const list: Table[] = [];
            for (let index = 0; index <= count; index++) {
                const tableId = index;
                const order = cachedOrders && cachedOrders?.find((co) => co.table === tableId);
                const table: Table = {
                    id: tableId,
                    active: order ? order.elements.length > 0 : false,
                };
                list.push(table);
            }
            state.tables = list
        },
        updateTable: (state, action) => {
            const tableId: number = action.payload.tableId;
            const values: any = action.payload.values;
            state.tables = state.tables.map((t) => {
                if (t.id === tableId) {
                    return { ...t, ...values };
                } else {
                    return t;
                }
            });
        },
        addOrder: ordersAdapter.addOne,
        addOrUpdateOrder: ordersAdapter.upsertOne,
        updateOrder: ordersAdapter.updateOne,
        removeOrder: ordersAdapter.removeOne,

    },
    extraReducers: (builder) => {

        builder.addCase(fetchCachedOrdersAsync.pending, (state) => {
            state.status = 'pending';
            state.ordersCacheLoading = true;
        });

        builder.addCase(fetchCachedOrdersAsync.fulfilled, (state, action) => {

            const items: Order[] = action.payload || [];
            ordersAdapter.setAll(state, items.filter(o => o.elements.length > 0));
            state.status = 'idle';
            state.ordersCacheLoaded = true;
            state.ordersCacheLoading = false;
        });

        builder.addCase(fetchCachedOrdersAsync.rejected, (state) => {
            state.status = 'error';
            state.ordersCacheLoading = false;
        });

        builder.addCase(fetchCachedOrderAsync.pending, (state) => {
            state.status = 'pending';
        });

        builder.addCase(fetchCachedOrderAsync.fulfilled, (state, action) => {
            ordersAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });

        builder.addCase(fetchCachedOrderAsync.rejected, (state) => {
            state.status = 'error';
        });
    },
},
);

export const ordersSelectors = ordersAdapter.getSelectors(
    (state: RootState) => state.order
);

export const {
    initTables,
    updateTable,
    addOrder,
    addOrUpdateOrder,
    updateOrder,
    removeOrder,
} = orderSlice.actions;
