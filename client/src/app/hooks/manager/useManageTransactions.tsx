import {format} from 'date-fns';
import {useCallback, useEffect, useState} from 'react';
import agent from '../../api/agent';
import {MetaData} from '../../models/pagination';
import {ShopTransaction} from '../../models/shopTransaction';
import {TransactionDirection} from '../../models/TransactionDirection';
import {TransactionParams} from '../../models/TransactionParams';
import {TransactionType} from '../../models/TransactionType';

export default function useManageTransactions() {
  const [transactions, setTransactions] = useState<ShopTransaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsLoaded, setTransactionsLoaded] = useState(false);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [transactionParams, setTransactionParams] = useState<TransactionParams>(
    initParams()
  );

  const [totalIncoming, setTotalIncoming] = useState(0);
  const [totalOngoing, setTotalOngoing] = useState(0);

  const getTotals = (list: ShopTransaction[]) => {
    const incoming = getTotal(list, TransactionDirection.incoming);
    setTotalIncoming(incoming);
    const outgoing = getTotal(list, TransactionDirection.outgoing);
    setTotalOngoing(outgoing);
  };

  const fetchTransactions = useCallback(async () => {
    setTransactionsLoading(true);
    try {
      const params = getAxiosTransactionsParams(transactionParams);
      const result = await agent.Transactions.list(params);
      if (result) {
        setMetaData(result.metaData);
        setTransactions(result.items);
        setTransactionsLoaded(true);
        getTotals(result.items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTransactionsLoading(false);
    }
  }, [transactionParams]);

  useEffect(() => {
    if (!transactionsLoaded && !transactionsLoading) {
      fetchTransactions();
    }
  }, [fetchTransactions, transactionsLoaded, transactionsLoading]);

  // useEffect(() => {
  //   if (transactions.length > 0) {
  //     getTotals(transactions);
  //   }
  // }, [transactions]);

  function setParams(value: any) {
    setTransactionParams((prev) => ({ ...prev, ...value, pageNumber: 1 }));
    setTransactionsLoaded(false);
  }

  function setPageNumber(page: number) {
    setTransactionParams((prev) => ({ ...prev, pageNumber: page }));
    setTransactionsLoaded(false);
  }

  function setPageSize(size: number) {
    setTransactionParams((prev) => ({ ...prev, pageSize: size }));
    setTransactionsLoaded(false);
  }

  return {
    metaData,
    transactions,
    transactionsLoaded,
    transactionsLoading,
    totalIncoming,
    totalOngoing,
    setParams,
    setPageNumber,
    setPageSize,
  };
}

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'name',
    type: undefined,
    startDate: new Date().toUTCString(),
    endDate: new Date().toUTCString(),
  };
}

const getTotal = (list: ShopTransaction[], direction: TransactionDirection) => {
  const items = list.filter((t) => t.direction === direction);
  const total = items.reduce((sum, current) => sum + current.amount, 0);
  return total;
};

function getAxiosTransactionsParams(transactionParams: TransactionParams) {
  const params = new URLSearchParams();
  params.append('pageNumber', transactionParams.pageNumber.toString());
  params.append('pageSize', transactionParams.pageSize.toString());
  params.append('orderBy', transactionParams.orderBy);

  if (transactionParams.type) {
    params.append('type', TransactionType[transactionParams.type]);
  } else {
    params.delete('type');
  }

  if (transactionParams.direction) {
    params.append(
      'direction',
      TransactionDirection[transactionParams.direction]
    );
  } else {
    params.delete('direction');
  }

  if (transactionParams.startDate) {
    params.append(
      'startDate',
      format(new Date(transactionParams.startDate), 'yyyy-MM-dd')
    );
  } else {
    params.delete('startDate');
  }

  if (transactionParams.endDate) {
    params.append(
      'endDate',
      format(new Date(transactionParams.endDate), 'yyyy-MM-dd')
    );
  } else {
    params.delete('endDate');
  }

  return params;
}
