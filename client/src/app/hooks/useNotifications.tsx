import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { setConnection, setStatus } from '../slices/notificationsSlice';
import { fetchCachedOrdersAsync } from '../slices/orderSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const url = process.env.REACT_APP_CHAT_URL;

export default function useNotifications() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const { connection, status } = useAppSelector((state) => state.notifications);

  const initConnection = useCallback((token: string) => {
    const connect = new HubConnectionBuilder()
      .withUrl(url!, {
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    dispatch(setConnection(connect));
  }, []);

  const startConnection = useCallback(
    (connection: HubConnection) => {
      connection!
        .start()
        .then(() => {
          connection!.on('ReceiveMessage', (message) => {
            if (message.message === 'updateOrderCache') {
              dispatch(fetchCachedOrdersAsync());
            }
            toast.info(message);
            console.log(message);
          });
          connection!.send('SendMessage', 'Test Connection');
        })
        .catch((error) => console.log(error));
      connection.keepAliveIntervalInMilliseconds = 3000;
      dispatch(setStatus(connection.state));
    },
    [dispatch]
  );

  const stopConnection = useCallback(
    (connection: HubConnection | null) => {
      if (!connection) return;
      connection.stop();
      dispatch(setStatus(HubConnectionState.Disconnected));
    },
    [dispatch]
  );

  useEffect(() => {
    if (user && user.token && !connection) {
      initConnection(user.token);
    }
  }, [connection, initConnection, user]);

  const sendMessage = async (message: string) => {
    if (connection) await connection.send('SendMessage', { message });
  };

  return { connection, status, sendMessage, startConnection, stopConnection };
}
