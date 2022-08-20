import useManagerHistory from '../../app/hooks/manager/useManagerHistory';
import ListPageLayout from '../../app/layout/ListPageLayout';
import LoadingComponent from '../../components/common/LoadingComponent';
import HistoryElementsList from '../../components/history/HistoryElementsList';

export default function HistoryManagerPage() {
  const { history, historyLoading, metaData, setPageNumber } =
    useManagerHistory();

  function handlePageChange(page: number) {
    setPageNumber(page);
  }
  if (historyLoading) return <LoadingComponent />;
  return (
    <ListPageLayout
      title={'Historique'}
      list={
        <HistoryElementsList elements={history} onSelect={(element) => {}} />
      }
      // filters={
      //   <CollapsibleMenu title='Filtres'>
      //     <TransactionsFilter setParams={setParams} />
      //   </CollapsibleMenu>
      // }
      metaData={metaData}
      onPageChange={handlePageChange}
    />
  );
}
