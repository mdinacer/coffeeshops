import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { setConnection, setStatus } from '../slices/notificationsSlice';
import { fetchProductAsync, removeProduct } from '../slices/productsSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const url =
  process.env.REACT_APP_NOTIFICATION_URL ||
  `http://localhost:5118/notificationHub`;

export default function useNotifications() {
  const dispatch = useAppDispatch();
  const { token, shopId } = useAppSelector((state) => state.account);
  const { connection, connectionSate: status } = useAppSelector(
    (state) => state.notifications
  );

  const initConnection = useCallback(
    (token: string) => {
      const connect = new HubConnectionBuilder()
        .withUrl(url, {
          accessTokenFactory: () => token,
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
          withCredentials: true,
          headers: {
            shop: shopId || '',
          },
        })
        .withAutomaticReconnect()
        .build();

      dispatch(setConnection(connect));
    },
    [dispatch, shopId]
  );

  const startConnection = useCallback(
    (connection: HubConnection) => {
      connection!
        .start()
        .then(() => {
          connection!.on('Notify', (values) => {
            console.log(values);

            switch (values.nature) {
              case 'productAdded':
              case 'productUpdated':
                dispatch(fetchProductAsync(values.entityId));
                break;
              case 'productRemoved':
                dispatch(removeProduct(values.entityId));
                break;
              case 'productLowStock':
                console.log('productLowStock Fired');

                dispatch(fetchProductAsync(values.entityId));
                if (values.payload) {
                  toast.error(
                    `Le produit ${values.payload.name}' a atteint le seuil de stock minimum, ${values.payload.stock}.`,
                    { autoClose: false }
                  );
                }
                console.log(values.payload);

                break;

              case 'ordersUpdated':
                console.log('Orders Updated');
                break;
            }
          });

          connection!.on('connection', (m) => {
            console.log('connection', m);
          });
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

  const refreshConnection = useCallback(
    (connection: HubConnection | null) => {
      if (!connection) return;

      if (connection.state === HubConnectionState.Connected) {
        connection.stop();
        dispatch(setStatus(HubConnectionState.Disconnected));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (token && !connection) {
      initConnection(token);
    }
  }, [connection, token]);

  const sendMessage = async (message: string) => {
    if (connection) await connection.send('SendMessage', { message });
  };

  return { connection, status, sendMessage, startConnection, stopConnection };
}
