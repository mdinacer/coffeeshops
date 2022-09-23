import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../slices/accountSlice";
import { shopSlice } from "../slices/shopSlice";
import { productsSlice } from "../slices/productsSlice";
import { operationSlice } from "../slices/operationSlice";
import { orderSlice } from "../slices/orderSlice";
import { agentSlice } from "../slices/agentsSlice";
import { notificationsSlice } from "../slices/notificationsSlice";
import { catalogSlice } from "../slices/catalogSlice";


export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        agent: agentSlice.reducer,
        shop: shopSlice.reducer,
        catalog: catalogSlice.reducer,
        products: productsSlice.reducer,
        operation: operationSlice.reducer,
        order: orderSlice.reducer,
        notifications: notificationsSlice.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    //middleware: new MiddlewareArray().concat(sampleMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;