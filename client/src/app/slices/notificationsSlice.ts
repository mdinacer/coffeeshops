import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { NotificationElement } from "../models/notification";
import { RootState } from "../store/configureStore";

interface NotificationState {
    connectionSate: string;
    connection: HubConnection | null;
    status: string,
}


const notificationsAdapter = createEntityAdapter<NotificationElement>({
    selectId: (element) => element.entityId,
});



export const notificationsSlice = createSlice({
    name: "notifications",
    initialState: notificationsAdapter.getInitialState<NotificationState>({
        connection: null,
        connectionSate: HubConnectionState.Disconnected,
        status: "idle"
    }),
    reducers: {
        setConnection: (state, action) => {
            state.connection = action.payload;
        },
        setStatus: (state, action) => {
            state.connectionSate = action.payload;
        },

        addNotificationElement: notificationsAdapter.addOne,
        updateNotificationElement: notificationsAdapter.updateOne,
        removeNotificationElement: notificationsAdapter.removeOne,
    }
});

export const notificationSelectors = notificationsAdapter.getSelectors(
    (state: RootState) => state.notifications
);

export const {
    setConnection,
    setStatus,
    addNotificationElement,
    updateNotificationElement,
    removeNotificationElement,
} = notificationsSlice.actions;