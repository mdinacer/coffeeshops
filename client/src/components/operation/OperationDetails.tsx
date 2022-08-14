import { XIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { locale } from '../../app/layout/App';
import { OperationType } from '../../app/models/OperationType';
import {
  fetchOperationAsync,
  operationSelectors,
} from '../../app/slices/operationSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import AppButton from '../common/AppButton';
import ResponsiveTable from '../common/ResponsiveTable';
import ResponsiveTableRow from '../common/ResponsiveTableRow';

interface Props {
  operationId: string;
  onClose: () => void;
}

export default function OperationDetails({ operationId, onClose }: Props) {
  const dispatch = useAppDispatch();
  const operation = useAppSelector((state) =>
    operationSelectors.selectById(state, operationId)
  );

  useEffect(() => {
    if (!operation) {
      dispatch(fetchOperationAsync(operationId));
    }
  }, [dispatch, operation, operationId]);

  const getTitle = () => {
    return operation?.type === OperationType.purchase ? 'Achat' : 'Vente';
  };

  const getAgentType = () => {
    return operation?.type === OperationType.purchase
      ? 'Fournisseur'
      : 'Client';
  };

  return (
    <>
      {!operation && (
        <div className='w-full flex items-center justify-center h-20'>
          <p className='font-Primary text-3xl font-light'>Aucune operation</p>
        </div>
      )}
      {operation && (
        <div className='relative  flex flex-col gap-y-5'>
          <button
            type='button'
            title='Fermer'
            onClick={onClose}
            className='absolute top-2 right-2 bg-gray-400 text-white rounded-full p-1'
          >
            <XIcon className='h-5 w-5' />
          </button>
          <div className='mt-5'>
            <p className='font-Primary text-5xl font-light'>{getTitle()}</p>
          </div>

          <div className=''>
            <DetailItem
              title='Date'
              value={format(new Date(), 'PPPP', { locale })}
            />
            {operation.agentName && (
              <DetailItem title={getAgentType()} value={operation.agentName} />
            )}

            <div className='grid grid-cols-3 py-2 border-y border-y-gray-200 my-4'>
              <StatsItem
                title='Total'
                value={`${operation.total.toFixed(2)} Da`}
              />
              <StatsItem
                title='Payé'
                value={`${operation.paid.toFixed(2)} Da`}
              />
              <StatsItem
                title='Dette'
                value={`${operation.remain.toFixed(2)} Da`}
                valueStyle={
                  operation.remain > 0 ? 'text-red-600' : 'text-inherit'
                }
              />
            </div>

            {operation.elements.length > 0 && (
              <div>
                <p className=' font-Primary text-2xl mb-2 font-thin uppercase'>
                  éléments
                </p>

                <ResponsiveTable
                  headers={['article', 'quantité', 'total']}
                  children={operation.elements.map((element, index) => (
                    <ResponsiveTableRow
                      key={element.id}
                      cells={[
                        {
                          title: 'article',
                          value: element.productName,
                        },
                        {
                          title: 'quantité',
                          value: element.quantity,
                          align: 'center',
                        },

                        {
                          title: 'total',
                          value: element.total.toFixed(2),
                          align: 'right',
                        },
                      ]}
                    />
                  ))}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className=' mt-10'>
        <AppButton
          onClick={() => onClose()}
          label='Fermer'
          genre='secondary'
          className='w-full'
        />
      </div>
    </>
  );
}

function DetailItem({ title, value }: { title: string; value: string }) {
  return (
    <div className='grid grid-cols-4 items-end font-Secondary'>
      <p className='uppercase  text-base font-semibold'>{title}</p>
      <p className='capitalize text-lg col-span-3'>{value}</p>
    </div>
  );
}

interface StatsItemProps {
  title: string;
  value: string;
  className?: string;
  titleStyle?: string;
  valueStyle?: string;
}

function StatsItem({
  title,
  value,
  className,
  valueStyle,
  titleStyle,
}: StatsItemProps) {
  return (
    <div className={'flex flex-col justify-center  items-center ' + className}>
      <p
        className={' font-Primary uppercase font-light text-base ' + titleStyle}
      >
        {title}
      </p>
      <p
        className={
          'capitalize col-span-3 font-Primary text-2xl font-thin ' + valueStyle
        }
      >
        {value}
      </p>
    </div>
  );
}
