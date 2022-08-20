import { CashIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import useProducts from '../../app/hooks/useProducts';
import { CURRENCY_TEXT } from '../../app/layout/App';
import { Category } from '../../app/models/category';
import { Product } from '../../app/models/product';
import Layout from '../../components/Layout';
import OrderElementsList from '../../components/orderPage/OrderElementsList';
import OrderCategoriesList from '../../components/orderPage/OrderCategoriesList';
import OrderProductsPagination from '../../components/orderPage/OrderProductsPagination';
import OrderProductsGrid from '../../components/orderPage/OrderProductsGrid';
import OrderTablesList from '../../components/orderPage/OrderTablesList';
import useOrders from '../../app/hooks/useOrders';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addOrder, ordersSelectors } from '../../app/slices/orderSlice';
import AppButton from '../../components/common/AppButton';
import AppDialog from '../../components/common/AppDialog';
import OrderConfirmation from '../../components/orderPage/OrderConfirmation';

export default function OrderPage() {
  const dispatch = useAppDispatch();
  const [confirmOrder, setConfirmOrder] = useState(false);
  const { products, categories, metaData } = useProducts();
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

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
    <Layout
      className='max-h-fill relative flex snap-x snap-mandatory flex-row gap-x-5 overflow-x-auto border border-gray-300 py-0 px-0 md:overflow-x-hidden md:px-5 2xl:max-w-none  '
      dialogVisible={confirmOrder}
      dialogContent={
        <AppDialog className=' w-full max-w-lg'>
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
                  console.log(value);
                  handleConfirmedOrder();
                }
                setConfirmOrder(false);
              }}
            />
          )}
        </AppDialog>
      }
    >
      <div className='relative flex w-screen min-w-full flex-auto  snap-center flex-col border border-gray-300 md:w-2/3 md:min-w-min'>
        <div className='w-ful flex items-center justify-center  border-b border-b-gray-300 bg-gray-100 py-2'>
          <button
            type='button'
            className=' inline-flex w-full items-center justify-center'
            onClick={() => setCategoriesVisible(true)}
          >
            <ChevronDownIcon className='mr-2 h-6 w-6' />
            <span className=' font-Primary text-lg uppercase'>
              {selectedCategory?.name || 'Catégories'}
            </span>
          </button>
        </div>

        <div className='flex-auto  overflow-auto py-5 px-5 '>
          {products.length > 0 ? (
            <OrderProductsGrid
              products={products}
              onSelect={handleAddProduct}
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center'>
              <p className=' font-Primary text-5xl font-thin uppercase opacity-10'>
                Aucun produit
              </p>
            </div>
          )}
        </div>

        {metaData && metaData.totalPages > 1 && (
          <OrderProductsPagination metaData={metaData} />
        )}
        <AnimatePresence>
          {categoriesVisible && (
            <OrderCategoriesList
              selectedCategory={selectedCategory?.id}
              categories={categories}
              onClose={handleCategoryChange}
            />
          )}
        </AnimatePresence>
      </div>
      <div className='flex w-screen min-w-full flex-initial snap-center     flex-col border border-gray-300 md:w-1/3 md:min-w-min'>
        <div className='flex w-full flex-initial flex-row items-center border-b border-b-gray-300 px-2 py-2 md:max-w-[33.333333vw] md:px-5'>
          <div className=' mr-5 flex-initial font-Primary text-xl font-thin  uppercase'>
            <p>Table</p>
          </div>
          <div className=' flex-auto snap-x snap-mandatory overflow-x-auto overscroll-x-none rounded-full border border-gray-300 py-1 px-2 shadow-inner shadow-gray-500 scrollbar-hide md:px-5'>
            <OrderTablesList
              tables={tables}
              tablesLoaded={tables.length > 0}
              selectedTable={selectedTable}
              onSelect={handleTableChange}
            />
          </div>
        </div>

        <div className='flex flex-auto flex-col items-stretch bg-gray-50 py-5 md:px-5 '>
          <p className='mb-5 flex-initial text-center font-Primary text-2xl font-thin  uppercase'>
            {selectedTable > 0
              ? `Table N° ${selectedTable}`
              : 'opération comptoir'}
          </p>
          <div className='flex-auto '>
            {order && (
              <OrderElementsList
                setQuantity={handleQuantityChange}
                elements={order.elements}
                onRemove={handleRemoveElement}
              />
            )}
          </div>
          <div className='flex w-full flex-initial flex-row items-end justify-between px-5 py-2 '>
            <p className=' font-Secondary font-semibold uppercase'>Total</p>
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
                  {total.toFixed(2)}
                </motion.span>
                <span className='ml-1 text-base uppercase'>
                  {CURRENCY_TEXT}
                </span>
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className=' grid w-full grid-cols-2 gap-2 px-5 py-4 md:gap-x-5'>
          <AppButton
            disabled={!order || order.elements.length === 0}
            label={'Effacer'}
            onClick={() => clearOrderElements()}
            genre='error'
            Icon={TrashIcon}
          />
          <AppButton
            disabled={!order || order.elements.length === 0}
            label={'Valider'}
            Icon={CashIcon}
            onClick={() => setConfirmOrder(true)}
            genre='info'
          />
        </div>
      </div>
    </Layout>
  );
}
