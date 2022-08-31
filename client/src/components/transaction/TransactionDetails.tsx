import { format } from 'date-fns';
import { locale } from '../../app/layout/App';
import { ShopTransaction } from '../../app/models/shopTransaction';
import { TransactionDirection } from '../../app/models/TransactionDirection';
import { TransactionType } from '../../app/models/TransactionType';
import { formatNumber } from '../../app/utils/utils';
import AppButton from '../common/AppButton';

interface Props {
  transaction: ShopTransaction;
  onClose: () => void;
}

export default function TransactionDetails({ transaction, onClose }: Props) {
  return (
    <div className=' flex h-full w-full flex-col items-stretch '>
      <div className=' mb-5 font-Secondary'>
        <DetailItem
          title={'Date'}
          value={format(new Date(transaction.date), 'PPP', { locale: locale })}
        />
        <DetailItem title={'Utilisateur'} value={transaction.user} />
        <DetailItem
          title={'Montant'}
          value={formatNumber(transaction.amount)}
        />

        {transaction.type === TransactionType.payment ? (
          <DetailItem
            title={'Nature'}
            value={
              transaction.direction === TransactionDirection.incoming
                ? 'Paiement Client'
                : 'Paiement Fournisseur'
            }
          />
        ) : (
          <DetailItem
            title={'Nature'}
            value={
              transaction.direction === TransactionDirection.incoming
                ? 'Entrée'
                : 'Sorite'
            }
          />
        )}

        {transaction.type === TransactionType.payment && !!transaction.agent ? (
          <DetailItem
            title={
              transaction.direction === TransactionDirection.incoming
                ? 'Client'
                : 'Fournisseur'
            }
            value={transaction.agent}
          />
        ) : (
          <DetailItem title={'Utilisateur'} value={transaction.user} />
        )}
      </div>
      <div className=''>
        <p className=' mb-3 w-full border-b border-b-stone-300 pb-1 font-Secondary text-base uppercase text-stone-500 '>
          Détails
        </p>
        <p className=' whitespace-pre-wrap font-Secondary text-base'>
          {transaction.description}
        </p>
      </div>

      <div className=' pt-5'>
        <AppButton
          className=' w-full'
          onClick={onClose}
          label='Fermer'
          genre='secondary'
        />
      </div>
    </div>
  );
}

function DetailItem({ title, value }: { title: string; value: any }) {
  return (
    <div className=' flex w-full flex-row items-end gap-x-5 font-Secondary'>
      <p className=' min-w-[7rem] uppercase text-stone-500'>{title}</p>
      <p className=' text-lg capitalize text-stone-700'>{value}</p>
    </div>
  );
}
