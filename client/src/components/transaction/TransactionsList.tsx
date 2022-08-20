import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { locale } from '../../app/layout/App';
import { ShopTransaction } from '../../app/models/shopTransaction';
import { TransactionDirection } from '../../app/models/TransactionDirection';
import { TransactionType } from '../../app/models/TransactionType';
import ResponsiveTable from '../common/ResponsiveTable';
import ResponsiveTableRow from '../common/ResponsiveTableRow';

interface Props {
  transactions: ShopTransaction[];
  onSelect: (transaction: ShopTransaction) => void;
}

export default function TransactionsList({
  transactions = [],
  onSelect,
}: Props) {
  return (
    <ResponsiveTable
      headers={[
        'Flux',
        'Type',
        'Date',
        'Description',
        'Montant',
        'Utilisateur',
      ]}
    >
      {transactions.map((item, index) => (
        <ResponsiveTableRow
          key={item.id}
          cells={[
            {
              title: 'Name',
              value: (
                <div className=' flex flex-row items-center text-base lg:w-full'>
                  {item.direction === TransactionDirection.outgoing ? (
                    <ArrowDownIcon className='mr-2 h-6 w-6 text-red-600 dark:text-red-400' />
                  ) : (
                    <ArrowUpIcon className='mr-2 h-6 w-6 text-green-600 dark:text-green-400' />
                  )}
                  <p className=' font-Secondary text-lg'>
                    {item.direction === TransactionDirection.incoming
                      ? 'Entrant'
                      : 'Sortant'}
                  </p>
                </div>
              ),
            },
            {
              title: 'Type',
              value:
                item.type === TransactionType.payment
                  ? 'Paiement'
                  : item.direction === TransactionDirection.incoming
                  ? 'Depot'
                  : 'Retrait',
              align: 'right',
            },

            {
              title: 'Date',
              value: item.date
                ? format(new Date(item.date), 'PP', { locale })
                : '',
              align: 'right',
            },
            { title: 'Description', value: item.description, align: 'left' },
            { title: 'Montant', value: item.amount.toFixed(2), align: 'right' },
            { title: 'Utilisateur', value: item.user, align: 'center' },
          ]}
          onClick={() => onSelect(item)}
        />
      ))}
    </ResponsiveTable>
  );
}
