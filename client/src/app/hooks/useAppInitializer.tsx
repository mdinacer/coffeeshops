import { useCallback, useEffect, useState } from 'react';
import {
  fetchCurrentUser,
  refreshToken,
  setRefreshTokenTimeout,
  stopRefreshTokenTimer,
} from '../slices/accountSlice';
import { fetchShopAsync } from '../slices/shopSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import useNotifications from './useNotifications';

export default function useAppInitializer() {
  const dispatch = useAppDispatch();
  const { token, shopId } = useAppSelector((state) => state.account);
  const [shopLoading, setShopLoading] = useState(false);
  const [shopLoaded, setShopLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const { stopConnection, connection } = useNotifications();

  const loadUser = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const loadShop = useCallback(async () => {
    try {
      setShopLoading(true);
      await dispatch(fetchShopAsync());
    } catch (error) {
      console.log(error);
    } finally {
      setShopLoading(false);
    }
  }, [dispatch]);

  const refreshUserToken = useCallback(
    async (token: string | null) => {
      if (!token) return;
      const jwtToken = JSON.parse(atob(token.split('.')[1]));
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - 5000;
      const timer = setTimeout(() => {
        dispatch(refreshToken());
        stopConnection(connection);
      }, timeout);
      dispatch(setRefreshTokenTimeout(timer));
    },
    [connection, dispatch, stopConnection]
  );

  useEffect(() => {
    refreshUserToken(token);
    return () => {
      dispatch(stopRefreshTokenTimer());
    };
  }, [token]);

  useEffect(() => {
    loadUser().then(() => setUserLoaded(true));
  }, []);

  useEffect(() => {
    if (shopId && !shopLoading) {
      loadShop().then(() => setShopLoaded(true));
    }
  }, [shopId]);

  return {
    userLoaded,
    shopLoaded,
  };
}
