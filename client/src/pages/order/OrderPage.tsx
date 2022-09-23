import { ChevronDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { CURRENCY_TEXT } from '../../app/layout/App';
import { Category } from '../../app/models/category';
import { Product } from '../../app/models/product';
import Layout from '../../components/Layout';
import OrderElementsList from '../../components/orderPage/OrderElementsList';
import OrderCategoriesList from '../../components/orderPage/OrderCategoriesList';
import OrderProductsGrid from '../../components/orderPage/OrderProductsGrid';
import OrderTablesList from '../../components/orderPage/OrderTablesList';
import useOrders from '../../app/hooks/useOrders';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addOrder, ordersSelectors } from '../../app/slices/orderSlice';
import AppButton from '../../components/common/AppButton';
import OrderConfirmation from '../../components/orderPage/OrderConfirmation';
import ModalDialog from '../../components/common/ModalDialog';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import { formatNumber } from '../../app/utils/utils';
import useCatalog from '../../app/hooks/useCatalog';

export default function OrderPage() {
  const dispatch = useAppDispatch();
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const { categories, products } = useCatalog();

  const [selectedTable, setSelectedTable] = useState<number>(0);
  const {
    tables,
    orders,
    addProduct,
    clearOrder,
    changeQuantity,
    getTotal,
    removeProduct,
  } = useOrders();
  const order = useAppSelector((state) =>
    ordersSelectors.selectById(state, selectedTable)
  );

  const total = order ? getTotal(order) : 0;

  const getProducts = () => {
    return selectedCategory?.id
      ? products.filter((p) => p.categoryId === selectedCategory.id)
      : products;
  };

  function handleCategoryChange(category: Category | undefined) {
    setSelectedCategory(category);
    setCategoriesVisible(false);
  }

  function handleAddProduct(product: Product) {
    addProduct(selectedTable, product);
  }

  function handleQuantityChange(
    productId: string,
    operation: 'increase' | 'decrease'
  ) {
    changeQuantity(selectedTable, productId, operation);
  }

  function handleRemoveElement(productId: string) {
    removeProduct(selectedTable, productId);
  }

  function handleTableChange(tableId: number) {
    const order = orders.find((o) => o.table === tableId);
    if (!order) {
      dispatch(
        addOrder({
          table: tableId,
          total: 0,
          elements: [],
        })
      );
    }
    setSelectedTable(tableId);
  }

  function clearOrderElements() {
    clearOrder(selectedTable);
  }

  function handleConfirmedOrder() {
    if (selectedTable >= 0) {
      clearOrder(selectedTable);
    }
  }

  return (
    <>
      <ModalDialog title='Commande' active={confirmOrder}>
        {order && (
          <OrderConfirmation
            elements={order.elements.map((o) => ({
              productId: o.productId,
              productName: o.productName,
              quantity: o.quantity,
              price: o.price,
              total: o.price * o.quantity,
            }))}
            operationTotal={total}
            onClose={(value) => {
              if (value) {
                handleConfirmedOrder();
              }
              setConfirmOrder(false);
            }}
          />
        )}
      </ModalDialog>

      <Layout className='max-h-fill relative flex snap-x snap-mandatory flex-row gap-x-2  overflow-x-auto  border-none bg-stone-400 py-0 px-0 md:overflow-x-hidden md:p-2 2xl:max-w-none  '>
        <div className='relative flex w-screen min-w-full flex-auto  snap-center flex-col border border-stone-500 bg-stone-700 md:w-2/3 md:min-w-min'>
          <div className='w-ful flex items-center  justify-center  border-b border-b-stone-600  bg-stone-600 text-stone-400 drop-shadow-md '>
            <button
              type='button'
              className=' inline-flex w-full items-center justify-center py-2'
              onClick={() => setCategoriesVisible(true)}
            >
              <ChevronDownIcon className='mr-2 h-6 w-6' />
              <span className=' font-Primary text-2xl font-normal uppercase'>
                {selectedCategory?.id ? selectedCategory?.name : 'Catégories'}
              </span>
            </button>
          </div>

          <div className='h-full max-h-fit  flex-auto overflow-x-hidden overflow-y-scroll py-2 px-2  '>
            <div className=' h-full'>
              <OrderProductsGrid
                products={getProducts()}
                onSelect={handleAddProduct}
              />
            </div>
          </div>

          <AnimatePresence>
            {categoriesVisible && (
              <OrderCategoriesList
                categories={categories}
                selectedCategory={selectedCategory?.id}
                onClose={handleCategoryChange}
              />
            )}
          </AnimatePresence>
        </div>

        <div className='flex w-screen min-w-full flex-initial snap-center flex-col  overflow-hidden  rounded-sm bg-stone-200 text-stone-700 drop-shadow-lg  md:w-1/3 md:min-w-min'>
          <OrderTablesList
            tables={tables}
            tablesLoaded={tables.length > 0}
            selectedTable={selectedTable}
            onSelect={handleTableChange}
          />

          <div className='flex flex-auto flex-col items-stretch bg-stone-100 py-5  md:px-5'>
            <p className='mb-5 flex-initial text-center font-Primary text-2xl font-thin uppercase  text-stone-400'>
              {selectedTable > 0
                ? `Table N° ${selectedTable}`
                : 'opération comptoir'}
            </p>
            <div className='flex-auto overflow-x-hidden '>
              {order && (
                <OrderElementsList
                  setQuantity={handleQuantityChange}
                  elements={order.elements}
                  onRemove={handleRemoveElement}
                />
              )}
            </div>
            <div className='flex w-full flex-initial flex-row items-end justify-between px-5 py-2  md:px-0 '>
              <p className=' font-Secondary text-xl uppercase'>Total</p>
              <AnimatePresence>
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  layout
                  key={total}
                  className=' font-Primary font-thin'
                >
                  <motion.span className='text-2xl'>
                    {formatNumber(total)}
                  </motion.span>
                  <span className='ml-1 text-base uppercase'>
                    {CURRENCY_TEXT}
                  </span>
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className=' grid w-full grid-cols-5 '>
            <AppButton
              disabled={!order || order.elements.length === 0}
              onClick={() => clearOrderElements()}
              genre='error'
              Icon={TrashIcon}
              iconStyle={' h-8 w-8'}
            />
            <AppButton
              disabled={!order || order.elements.length === 0}
              label={'Valider'}
              Icon={CreditCardIcon}
              onClick={() => setConfirmOrder(true)}
              genre='info'
              className=' col-span-4  w-full'
              iconStyle={' h-8 w-8'}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
