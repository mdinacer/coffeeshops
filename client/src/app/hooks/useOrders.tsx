import { useCallback, useEffect } from 'react';
import { EmptyOrder, Order, OrderElement } from '../models/order';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import agent from '../api/agent';
import {
  addOrder,
  fetchCachedOrdersAsync,
  initTables,
  ordersSelectors,
  removeOrder,
  updateOrder,
  updateTable,
} from '../slices/orderSlice';
import { Product } from '../models/product';
import useNotifications from './useNotifications';

export default function useOrders() {
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector((state) => state.shop);
  const { ordersCacheLoaded, tables } = useAppSelector((state) => state.order);
  const orders = useAppSelector(ordersSelectors.selectAll);
  const tablesCount = shop?.tablesCount || 0;
  const { sendMessage } = useNotifications();

  function updateTableState(tableId: number, values: any) {
    dispatch(updateTable({ tableId, values }));
  }

  function addProduct(tableId: number, product: Product) {
    let order = orders.find((o) => o.table === tableId);

    if (order) {
      const index = order.elements.findIndex((e) => e.productId === product.id);
      let list: OrderElement[] = [];
      if (index > -1) {
        list = order.elements.map((e) => {
          if (e.productId === product.id) {
            return {
              ...e,
              quantity: e.quantity + 1,
              total: e.price * e.quantity,
            };
          } else {
            return e;
          }
        });
      } else {
        const item: OrderElement = {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          price: product.price,
          total: product.price,
        };
        list = [...order.elements, item];
      }
      list = list.sort((a, b) => (a.productName < b.productName ? -1 : 1));
      dispatch(updateOrder({ id: tableId, changes: { elements: list } }));
    } else {
      order = new EmptyOrder(tableId);
      const item: OrderElement = {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        total: product.price,
      };
      dispatch(addOrder({ ...order, table: tableId, elements: [item] }));
    }
    updateTableState(tableId, { active: order.elements.length > 0 });
  }

  function removeProduct(tableId: number, productId: string) {
    let order = orders.find((o) => o.table === tableId);

    if (!order) return;

    let list = order.elements.filter((e) => e.productId !== productId);

    dispatch(updateOrder({ id: tableId, changes: { elements: list } }));

    if (order.elements.length === 0) {
      clearOrder(tableId);
    } else {
      dispatch(updateOrder({ id: tableId, changes: { elements: list } }));
    }
  }

  function changeQuantity(
    tableId: number,
    productId: string,
    operation: 'increase' | 'decrease'
  ) {
    let order = orders.find((o) => o.table === tableId);
    if (!order) return;
    const index = order.elements.findIndex((e) => e.productId === productId);

    if (index === -1) return;

    let list = order.elements
      .map((e) => {
        if (e.productId === productId) {
          let quantity = 0;
          switch (operation) {
            case 'increase':
              quantity = e.quantity + 1;
              break;

            case 'decrease':
              if (e.quantity > 1) {
                quantity = e.quantity - 1;
              }
              break;
          }
          const total = e.price * e.quantity;

          return {
            ...e,
            quantity,
            total,
          };
        } else {
          return e;
        }
      })
      .filter((o) => o.quantity > 0);

    if (list.length === 0) {
      clearOrder(tableId);
    } else {
      dispatch(updateOrder({ id: tableId, changes: { elements: list } }));
    }
  }

  const cacheOrders = useCallback(
    async (values?: Order[]) => {
      try {
        const list = (values || orders)
          .filter((t) => t.elements.length > 0 && t.table >= 0)
          .map((t) => ({
            table: t.table,
            elements: t.elements.map((e) => ({
              productId: e.productId,
              productName: e.productName,
              price: e.price,
              quantity: e.quantity,
            })),
          }));

        return await agent.Orders.update({ orders: list });
      } catch (error) {
        console.log(error);
      }
    },
    [orders]
  );

  function getTotal(order: Order | null) {
    if (order && order.elements && order.elements.length > 0) {
      return order.elements.reduce(
        (sum, current) => sum + current.price * current.quantity,
        0
      );
    } else {
      return 0;
    }
  }

  function clearOrder(tableId: number) {
    const order = orders.find((o) => o.table === tableId);
    if (!order) return;
    dispatch(removeOrder(tableId));
    updateTableState(tableId, { active: false });
  }

  useEffect(() => {
    if (tablesCount > 0 && !ordersCacheLoaded) {
      dispatch(fetchCachedOrdersAsync()).then(({ payload }) => {
        const values = payload as Order[] | null;
        dispatch(initTables({ tablesCount, values }));
      });
    }
  }, [dispatch, ordersCacheLoaded, tablesCount]);

  useEffect(() => {
    if (ordersCacheLoaded) {
      cacheOrders(orders);
    }
  }, [orders, ordersCacheLoaded]);

  return {
    tables,
    orders,
    addProduct,
    cacheOrders,
    changeQuantity,
    clearOrder,
    getTotal,
    updateTable: updateTableState,
    removeProduct,
  };
}
