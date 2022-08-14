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
    clearOrder(selectedTable);
  }

  function handleConfirmedOrder() {
    if (selectedTable >= 0) {
      clearOrder(selectedTable);
    }
  }

  return (
    <Layout
      className='relative flex flex-row gap-x-5 max-h-fill overflow-x-auto md:overflow-x-hidden xl:max-w-none py-0 px-0 md:px-5 snap-mandatory snap-x border border-gray-300  '
      dialogVisible={confirmOrder}
      dialogContent={
        <AppDialog className=' max-w-lg w-full'>
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
      <div className='relative md:w-2/3 w-screen flex flex-col  flex-auto min-w-full md:min-w-min snap-center border border-gray-300'>
        <div className='w-ful flex items-center justify-center  border-b border-b-gray-300 py-2 bg-gray-100'>
          <button
            type='button'
            className=' inline-flex items-center justify-center w-full'
            onClick={() => setCategoriesVisible(true)}
          >
            <ChevronDownIcon className='h-6 w-6 mr-2' />
            <span className=' uppercase font-Primary text-lg'>
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
            <div className='w-full h-full flex items-center justify-center'>
              <p className=' font-Primary text-5xl uppercase font-thin opacity-10'>
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
      <div className='md:w-1/3 w-screen flex-initial flex flex-col     border border-gray-300 min-w-full md:min-w-min snap-center'>
        <div className='w-full flex-initial flex flex-row items-center md:max-w-[33.333333vw] px-2 md:px-5 border-b border-b-gray-300 pb-3'>
          <div className=' flex-initial font-Primary text-xl uppercase font-thin  mr-5'>
            <p>Table</p>
          </div>
          <div className=' flex-auto overflow-x-auto scrollbar-hide rounded-full snap-mandatory snap-x overscroll-x-none border border-gray-300 shadow-inner shadow-gray-500 py-1 px-2 md:px-5'>
            <OrderTablesList
              tables={tables}
              tablesLoaded={tables.length > 0}
              selectedTable={selectedTable}
              onSelect={handleTableChange}
            />
          </div>
        </div>

        <div className='flex-auto flex flex-col items-stretch md:px-5 py-5 bg-gray-50 '>
          <p className='flex-initial font-Primary font-thin text-2xl text-center mb-5  uppercase'>
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
          <div className='flex-initial w-full flex flex-row justify-between items-end px-5 py-2 '>
            <p className=' font-Secondary uppercase font-semibold'>Total</p>
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
                <span className='text-base ml-1 uppercase'>
                  {CURRENCY_TEXT}
                </span>
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className=' w-full grid grid-cols-2 md:gap-x-5 gap-2 px-5 py-4'>
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
