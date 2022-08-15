import {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {fr} from 'date-fns/locale';
import {useAppDispatch, useAppSelector} from '../store/configureStore';
import {fetchShopAsync} from '../slices/shopSlice';
import {fetchCurrentUser} from '../slices/accountSlice';
import NotFound from '../../errors/NotFound';
import HomePage from '../../pages/home/HomePage';
import ServerError from '../../errors/ServerError';
import PrivateRoute from './PrivateRoute';
import LoadingAnimation from './LoadingAnimation';
import AppPage from '../../pages/AppPage';

export const locale = fr;

function App() {
  const dispatch = useAppDispatch();
  const { shopId } = useAppSelector((state) => state.account);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingShop, setLoadingShop] = useState(false);

  const initApp = useCallback(async () => {
    try {
      setLoadingUser(true);
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUser(false);
    }
  }, [dispatch]);

  const loadShop = useCallback(async () => {
    try {
      setLoadingShop(true);
      await dispatch(fetchShopAsync());
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingShop(false);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => {});
  }, [initApp]);

  useEffect(() => {
    if (shopId) {
      loadShop().then(() => {});
    }
  }, [loadShop, shopId]);

  // useEffect(() => {
  //   if (shop) {
  //     console.log('====================================');
  //     console.log(tablesCount);
  //     console.log('====================================');
  //   }
  // }, [shop, tablesCount]);

  if (loadingUser || loadingShop)
    return (
      <div className=' select-none bg-gray-900 text-white border-indigo-500 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50'>
        <div className='flex flex-col items-center justify-center'>
          <LoadingAnimation />
          <p className=' font-Primary text-3xl lg:text-5xl font-thin uppercase mt-5'>
            Chargement en cours...
          </p>
        </div>
      </div>
    );
  return (
    <AppPage>
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage />} />
          <Route
            path='order'
            element={
              <Suspense fallback={<div />}>
                <OrderPage />
              </Suspense>
            }
          />

          <Route path='shop'>
            <Route
              index
              element={
                <Suspense>
                  <PrivateRoute>
                    <ShopFormPage />
                  </PrivateRoute>
                </Suspense>
              }
            />
          </Route>
          <Route path='reports'>
            <Route
              path='inventory'
              element={
                <Suspense>
                  <PrivateRoute>
                    <InventoryPage />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path='operations'
              element={
                <Suspense>
                  <PrivateRoute>
                    <OperationsPage />
                  </PrivateRoute>
                </Suspense>
              }
            />
          </Route>
          <Route path='management'>
            <Route
              path='shop'
              element={
                <Suspense>
                  <PrivateRoute>
                    <ShopManager />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route path='products'>
              <Route
                index
                element={
                  <Suspense>
                    <PrivateRoute>
                      <ProductsManager />
                    </PrivateRoute>
                  </Suspense>
                }
              />
              <Route
                path=':id'
                element={
                  <Suspense fallback={<div />}>
                    <PrivateRoute>
                      <ProductDetails />
                    </PrivateRoute>
                  </Suspense>
                }
              />
            </Route>

            <Route
              path='agents'
              element={
                <Suspense>
                  <PrivateRoute>
                    <AgentsManager />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path='transactions'
              element={
                <Suspense>
                  <PrivateRoute>
                    <TransactionsManager />
                  </PrivateRoute>
                </Suspense>
              }
            />
          </Route>
          <Route path='account'>
            <Route
              path='profile'
              element={
                <Suspense fallback={<div />}>
                  <ProfilePage />
                </Suspense>
              }
            />
            <Route
              path='login'
              element={
                <Suspense fallback={<div />}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path='register'
              element={
                <Suspense fallback={<div />}>
                  <RegisterPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path='/server-error'
            element={
              <Suspense fallback={<div />}>
                <ServerError />
              </Suspense>
            }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AppPage>
  );
}

export default App;

const LoginPage = lazy(() => import('../../pages/account/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/account/RegisterPage'));
const ProfilePage = lazy(() => import('../../pages/account/ProfilePage'));
const OrderPage = lazy(() => import('../../pages/order/OrderPage'));
const ShopFormPage = lazy(() => import('../../pages/shop/ShopFormPage'));

const OperationsPage = lazy(
  () => import('../../pages/operation/OperationsPage')
);
const InventoryPage = lazy(() => import('../../pages/inventory/InventoryPage'));

const ShopManager = lazy(() => import('../../pages/manager/ShopManagerPage'));
const ProductsManager = lazy(
  () => import('../../pages/manager/ProductsManagerPage')
);
const AgentsManager = lazy(
  () => import('../../pages/manager/AgentsManagerPage')
);
const TransactionsManager = lazy(
  () => import('../../pages/manager/TransactionsManagerPage')
);

const ProductDetails = lazy(
  () => import('../../pages/product/ProductDetailsPage')
);

export const CURRENCY_TEXT = 'da';
