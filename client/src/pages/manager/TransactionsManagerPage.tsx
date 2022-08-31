import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import useManageTransactions from '../../app/hooks/manager/useManageTransactions';
import ListPageLayout from '../../app/layout/ListPageLayout';
import { ShopTransaction } from '../../app/models/shopTransaction';
import { TransactionType } from '../../app/models/TransactionType';
import { formatNumber } from '../../app/utils/utils';
import AppButton from '../../components/common/AppButton';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import ModalDialog from '../../components/common/ModalDialog';
import TransactionForm from '../../components/forms/TransactionForm';
import TransactionDetails from '../../components/transaction/TransactionDetails';
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
    { title: 'Depot', value: `${formatNumber(totalIncoming)} Da` },
    { title: 'Retrait', value: `${formatNumber(totalOngoing)} Da` },
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
          >{`${formatNumber(Math.abs(totalIncoming - totalOngoing))} Da`}</p>
        </div>
      ),
    },
  ];
  return (
    <>
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
            onClick={() => setTransactionDialogVisible(true)}
          />
        }
      />

      {selectedTransaction && (
        <ModalDialog
          title={
            selectedTransaction.type === TransactionType.payment
              ? 'Paiement'
              : 'Transaction'
          }
          active={!!selectedTransaction}
          containerStyle=' items-stretch '
          contentStyle={'p-5 '}
          onClose={() => setSelectedTransaction(null)}
        >
          <TransactionDetails
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        </ModalDialog>
      )}

      <ModalDialog
        title='Ajouter une transaction'
        active={transactionDialogVisible}
        contentStyle={'p-5'}
      >
        <TransactionForm
          onClose={(value) => {
            if (value) {
              refresh();
              console.log(value);
            }
            setTransactionDialogVisible(false);
          }}
        />
      </ModalDialog>
    </>
  );
}
