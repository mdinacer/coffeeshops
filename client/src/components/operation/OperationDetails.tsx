import { format } from 'date-fns';
import { useEffect } from 'react';
import agent from '../../app/api/agent';
import { locale } from '../../app/layout/App';
import { OperationType } from '../../app/models/OperationType';
import {
  fetchOperationAsync,
  operationSelectors,
} from '../../app/slices/operationSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { formatNumber } from '../../app/utils/utils';
import AppButton from '../common/AppButton';
import AppLink from '../common/AppLink';
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

  const getAgentType = () => {
    return operation?.type === OperationType.purchase
      ? 'Fournisseur'
      : 'Client';
  };

  if (!operation)
    return (
      <div className='flex h-20 w-full items-center justify-center'>
        <p className='font-Primary text-3xl font-light'>Aucune operation</p>
      </div>
    );

  return (
    <div className='relative  flex flex-col gap-y-5'>
      <div className=' flex-initial'>
        <DetailItem
          title='Date'
          value={format(new Date(), 'PPPP', { locale })}
        />
        {operation.agentName && (
          <DetailItem
            title={getAgentType()}
            value={
              <AppLink
                label={operation.agentName}
                toPath={`/management/agents/${operation.agentId}`}
                genre='none'
                className=' gap-x-0 px-0  py-0 hover:underline'
                labelStyle=' text-lg capitalize font-normal font-Secondary'
              />
            }
          />
        )}

        <div className='my-4 grid grid-cols-3 border-y border-y-stone-200 py-2'>
          <StatsItem
            title='Total'
            value={`${formatNumber(operation.total)} Da`}
          />
          <StatsItem
            title='Payé'
            value={`${formatNumber(operation.paid)} Da`}
          />
          <StatsItem
            title='Dette'
            value={`${formatNumber(operation.remain)} Da`}
            valueStyle={operation.remain > 0 ? 'text-red-600' : 'text-inherit'}
          />
        </div>
      </div>

      {operation.elements.length > 0 && (
        <div className='flex-auto'>
          <p className=' mb-2 flex-initial font-Primary text-2xl font-thin uppercase'>
            éléments
          </p>

          <div className='flex-auto'>
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
                      value: formatNumber(element.total),
                      align: 'right',
                    },
                  ]}
                />
              ))}
            />
          </div>
        </div>
      )}
      <div className=' mt-5 flex-initial'>
        <AppButton
          onClick={() => onClose()}
          label='Fermer'
          genre='secondary'
          className=' w-full '
        />
      </div>
    </div>
  );
}

function DetailItem({ title, value }: { title: string; value: any }) {
  return (
    <div className='flex flex-row items-end justify-start font-Secondary text-base'>
      <p className='min-w-[5rem] font-medium uppercase'>{title}</p>
      <div className='text-lg capitalize '>{value}</div>
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
    <div className={'flex flex-col items-center  justify-center ' + className}>
      <p
        className={' font-Primary text-base font-light uppercase ' + titleStyle}
      >
        {title}
      </p>
      <p
        className={
          'col-span-3 font-Primary text-2xl font-thin capitalize ' + valueStyle
        }
      >
        {value}
      </p>
    </div>
  );
}
