import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
    status: HubConnectionState;
    connection: HubConnection | null;
}

const initialState: NotificationState = {
    connection: null,
    status: HubConnectionState.Disconnected,
};

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setConnection: (state, action) => {
            state.connection = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },


    }
});

export const {
    setConnection,
    setStatus,
} = notificationsSlice.actions;