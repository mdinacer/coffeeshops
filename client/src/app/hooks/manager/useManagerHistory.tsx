import { useCallback, useEffect, useState } from 'react';
import agent from '../../api/agent';
import { HistoryElement } from '../../models/historyElement';
import { HistoryParams } from '../../models/HistoryParams';
import { MetaData } from '../../models/pagination';

export default function useManagerHistory() {
  const [history, setHistory] = useState<HistoryElement[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [historyParams, setHistoryParams] = useState<HistoryParams>(
    initParams()
  );
  const [metaData, setMetaData] = useState<MetaData | null>(null);

  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const params = getAxiosHistoryParams(historyParams);
      const result: any = await agent.ShopHistory.list(params);
      if (result) {
        const { items, metaData } = result;
        setHistory(items);
        setMetaData(metaData);
      }
      setHistoryLoaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setHistoryLoading(false);
    }
  }, [historyParams]);

  function setParams(value: any) {
    setHistoryParams((prev) => ({ ...prev, ...value, pageNumber: 1 }));
    setHistoryLoaded(false);
    //fetchHistory();
  }

  function setPageNumber(page: number) {
    setHistoryParams((prev) => ({ ...prev, pageNumber: page }));
    setHistoryLoaded(false);
  }

  function setPageSize(size: number) {
    setHistoryParams((prev) => ({ ...prev, pageSize: size }));
    setHistoryLoaded(false);
  }

  // useEffect(() => {
  //   if (!historyLoaded && !historyLoading) {
  //     fetchHistory();
  //   }
  // }, []);

  useEffect(() => {
    fetchHistory();
  }, [historyParams]);

  return {
    history,
    historyParams,
    historyLoaded,
    historyLoading,
    metaData,
    setParams,
    setPageNumber,
    setPageSize,
  };
}
function initParams() {
  return {
    pageNumber: 1,
    pageSize: 15,
    orderBy: 'date',
    element: undefined,
    action: undefined,
    startDate: new Date().toUTCString(),
    // endDate: new Date().toUTCString(),
  };
}

export function getAxiosHistoryParams(historyParams: HistoryParams) {
  const params = new URLSearchParams();
  params.append('pageNumber', historyParams.pageNumber.toString());
  params.append('pageSize', historyParams.pageSize.toString());
  params.append('orderBy', historyParams.orderBy);

  if (historyParams.action !== undefined) {
    params.append('action', historyParams.action.toString());
  } else {
    params.delete('action');
  }

  if (historyParams.userId) {
    params.append('userId', historyParams.userId.toString());
  } else {
    params.delete('userId');
  }

  if (historyParams.element) {
    params.append('element', historyParams.element);
  } else {
    params.delete('element');
  }

  if (historyParams.startDate) {
    params.append('startDate', historyParams.startDate);
  } else {
    params.delete('startDate');
  }

  if (historyParams.endDate) {
    params.append('endDate', historyParams.endDate);
  } else {
    params.delete('endDate');
  }

  return params;
}
