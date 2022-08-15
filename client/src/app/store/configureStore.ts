import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {accountSlice} from "../slices/accountSlice";
import {shopSlice} from "../slices/shopSlice";
import {operationSlice} from "../slices/operationSlice";
import {orderSlice} from "../slices/orderSlice";
import {agentSlice} from "../slices/agentsSlice";


export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        agent: agentSlice.reducer,
        shop: shopSlice.reducer,
        operation: operationSlice.reducer,
        order: orderSlice.reducer,

    },
    //middleware: new MiddlewareArray().concat(sampleMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;