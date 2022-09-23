import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Order, Table } from "../models/order";
import { RootState } from "../store/configureStore";

interface OrdersState {
    tables: Table[],
    status: "idle" | "pending" | "error";
}

const ordersAdapter = createEntityAdapter<Order>({
    selectId: (order) => order.table,

});


export const orderSlice = createSlice({
    name: 'order',
    initialState: ordersAdapter.getInitialState<OrdersState>({
        status: 'idle',
        tables: []

    }),
    reducers: {
        loadCachedOrders: (state, action) => {
            var items: Order[] = action.payload;

            ordersAdapter.setAll(state, items.filter(o => o.elements.length > 0));

        },
        initTables: (state, action) => {
            const count: number = action.payload.tablesCount;

            const list: Table[] = [];
            for (let index = 0; index <= count; index++) {
                const tableId = index;
                const table: Table = {
                    id: tableId,
                    active: false,
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
    loadCachedOrders
} = orderSlice.actions;
