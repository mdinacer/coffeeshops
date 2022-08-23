import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fr } from 'date-fns/locale';
import NotFound from '../../errors/NotFound';
import HomePage from '../../pages/home/HomePage';
import ServerError from '../../errors/ServerError';
import PrivateRoute from './PrivateRoute';
import LoadingAnimation from './LoadingAnimation';
import AppPage from '../../pages/AppPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import useNotifications from '../hooks/useNotifications';
import { HubConnectionState } from '@microsoft/signalr';
import useAppInitializer from '../hooks/useAppInitializer';

export const locale = fr;

function App() {
  const { connection, startConnection } = useNotifications();
  const { userLoaded, shopLoaded } = useAppInitializer();

  useEffect(() => {
    if (connection && connection.state === HubConnectionState.Disconnected) {
      startConnection(connection);
    }
  }, [connection]);

  if (!userLoaded && !shopLoaded)
    return (
      <div className=' fixed top-0 left-0 right-0 bottom-0 z-50 flex select-none items-center justify-center border-sky-500 bg-gray-900 text-white'>
        <div className='flex flex-col items-center justify-center'>
          <LoadingAnimation />
          <p className=' mt-5 font-Primary text-3xl font-thin uppercase lg:text-5xl'>
            Chargement en cours...
          </p>
        </div>
      </div>
    );

  // if (false)
  //   return (
  //     <div>
  //       <ShopWizard onClose={() => setIsFirstLaunch(false)} />
  //     </div>
  //   );

  return (
    <AppPage>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
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
              index
              element={
                <Suspense>
                  <PrivateRoute>
                    <ManagerPage />
                  </PrivateRoute>
                </Suspense>
              }
            />
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

            <Route path='agents'>
              <Route
                index
                element={
                  <Suspense>
                    <PrivateRoute>
                      <AgentsManager />
                    </PrivateRoute>
                  </Suspense>
                }
              />

              <Route
                path=':id'
                element={
                  <Suspense>
                    <PrivateRoute>
                      <AgentDetails />
                    </PrivateRoute>
                  </Suspense>
                }
              />
            </Route>
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

            <Route
              path='history'
              element={
                <Suspense>
                  <PrivateRoute>
                    <HistoryManager />
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

            <Route
              path='verifyEmail'
              element={
                <Suspense fallback={<div />}>
                  <ConfirmEmail />
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
        <Route path='not-found' element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AppPage>
  );
}

export default App;

const LoginPage = lazy(() => import('../../pages/account/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/account/RegisterPage'));
const ConfirmEmail = lazy(() => import('../../pages/account/ConfirmEmail'));
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
const AgentsManager = lazy(() => import('../../pages/agent/AgentsManagerPage'));
const AgentDetails = lazy(() => import('../../pages/agent/AgentDetailsPage'));
const TransactionsManager = lazy(
  () => import('../../pages/manager/TransactionsManagerPage')
);

const HistoryManager = lazy(
  () => import('../../pages/manager/HistoryManagerPage')
);

const ManagerPage = lazy(() => import('../../pages/manager/ManagerPage'));

const ProductDetails = lazy(
  () => import('../../pages/product/ProductDetailsPage')
);

export const CURRENCY_TEXT = 'da';
