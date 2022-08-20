import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import useManageTransactions from '../../app/hooks/manager/useManageTransactions';
import ListPageLayout from '../../app/layout/ListPageLayout';
import { ShopTransaction } from '../../app/models/shopTransaction';
import AppButton from '../../components/common/AppButton';
import AppDialog from '../../components/common/AppDialog';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import TransactionForm from '../../components/forms/TransactionForm';
import TransactionsFilter from '../../components/transaction/TransactionsFilter';
import TransactionsList from '../../components/transaction/TransactionsList';

export default function TransactionsManagerPage() {
  const [transactionDialogVisible, setTransactionDialogVisible] =
    useState(false);
  const {
    transactions,
    metaData,
    totalIncoming,
    totalOngoing,
    setParams,
    setPageNumber,
    refresh,
  } = useManageTransactions();

  const [selectedTransaction, setSelectedTransaction] =
    useState<ShopTransaction | null>(null);

  async function handlePageChange(page: number) {
    setPageNumber(page);
  }

  const stats = () => [
    { title: 'Depot', value: `${totalIncoming.toFixed(2)} Da` },
    { title: 'Retrait', value: `${totalOngoing.toFixed(2)} Da` },
    {
      title: 'Différence',
      value: (
        <div className=' flex flex-row items-center'>
          {totalIncoming < totalOngoing ? (
            <ArrowDownIcon className='mr-2 h-5 w-5 text-red-600 dark:text-red-400' />
          ) : (
            <ArrowUpIcon className='mr-2 h-5 w-5 text-green-600 dark:text-green-400' />
          )}
          <p
            className={` uppercase  ${
              totalIncoming < totalOngoing ? 'text-red-600' : ' text-green-600'
            }`}
          >{`${Math.abs(totalIncoming - totalOngoing).toFixed(2)} Da`}</p>
        </div>
      ),
    },
  ];
  return (
    <ListPageLayout
      title={'Transactions Monétaires'}
      list={
        <TransactionsList
          transactions={transactions}
          onSelect={(transaction) => {
            setSelectedTransaction(transaction);
          }}
        />
      }
      stats={stats()}
      filters={
        <CollapsibleMenu title='Filtres'>
          <TransactionsFilter setParams={setParams} />
        </CollapsibleMenu>
      }
      metaData={metaData}
      onPageChange={handlePageChange}
      actionButton={
        <AppButton
          label={'Ajouter'}
          Icon={PlusIcon}
          genre='info'
          rounded
          onClick={() => setTransactionDialogVisible(true)}
        />
      }
      dialogVisible={transactionDialogVisible}
      dialogContent={
        <AppDialog className=' md:min-w-[30vw]'>
          <TransactionForm
            onClose={(value) => {
              if (value) {
                refresh();
                console.log(value);
              }
              setTransactionDialogVisible(false);
            }}
          />
        </AppDialog>
      }
    />
  );
}
