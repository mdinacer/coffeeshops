import useManagerHistory from '../../app/hooks/manager/useManagerHistory';
import ListPageLayout from '../../app/layout/ListPageLayout';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import HistoryElementsList from '../../components/history/HistoryElementsList';
import HistoryFilters from '../../components/history/HistoryFilters';

export default function HistoryManagerPage() {
  const { history, historyParams, metaData, setPageNumber, setParams } =
    useManagerHistory();

  function handlePageChange(page: number) {
    setPageNumber(page + 1);
  }

  return (
    <ListPageLayout
      title={'Historique'}
      list={
        <HistoryElementsList elements={history} onSelect={(element) => {}} />
      }
      filters={
        <CollapsibleMenu title='Filtres'>
          <HistoryFilters setParams={setParams} historyParams={historyParams} />
        </CollapsibleMenu>
      }
      metaData={metaData}
      onPageChange={handlePageChange}
    />
  );
}
