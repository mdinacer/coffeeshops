import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAgents from '../../app/hooks/useAgents';
import useOperations from '../../app/hooks/useOperations';
import { OperationType } from '../../app/models/OperationType';
import { setOperationParams } from '../../app/slices/operationSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppButtonSelect from '../common/AppButtonSelect';
import AppSort from '../common/AppSort';
import AppDatePicker from '../input/DatePicker';
import DropDown from '../input/DropDown';

interface Props {
  setOperationType: (type: OperationType) => void;
}

export default function OperationsFilters({ setOperationType }: Props) {
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get('agentId');

  const dispatch = useAppDispatch();
  const { operationParams } = useOperations();
  const { agents, fetchAgents } = useAgents(0);
  const [selectedOperationType, setSelectedOperationType] = useState(1);

  const typeFilters = [
    { title: 'Achat', value: 0 },
    { title: 'Vente', value: 1 },
  ];

  const orderByList = [
    { title: 'Date', value: 'date' },
    { title: 'Montant', value: 'total' },
    { title: 'Dettes', value: 'remain' },
  ];

  function filter(property: string, value: any) {
    dispatch(setOperationParams({ [property]: value }));
  }

  const handleOrderChange = (value: string) => {
    filter('orderBy', value);
  };

  const agentsList = () => {
    return [
      { title: 'Tout', value: '' },
      ...agents.map((a) => ({ title: a.name, value: a.id })),
    ];
  };

  useEffect(() => {
    if (agentId) {
      dispatch(
        setOperationParams({
          type: null,
          agentId,
          startDate: null,
        })
      );
    }
  }, []);

  return (
    <div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        <div>
          <AppButtonSelect
            disabled={!!agentId}
            items={typeFilters}
            label={`opération`}
            selectedValue={selectedOperationType}
            onChange={(item) => {
              fetchAgents(item.value);
              setSelectedOperationType(+item.value);

              setOperationType(
                item.value === 0 ? OperationType.purchase : OperationType.sale
              );
              filter('type', OperationType[item.value].toString());
            }}
          />
        </div>
        <div>
          <AppSort
            items={orderByList}
            initialValue={'date'}
            onSort={(value: string) => {
              handleOrderChange(value);
            }}
          />
        </div>

        <div>
          <DropDown
            items={agentsList()}
            disabled={!!agentId}
            label={`Agent`}
            selectedValue={operationParams.agentId || ''}
            onChange={(item) => {
              filter('agentId', item.value);
            }}
          />
        </div>
        <div>
          <AppDatePicker
            label={'Début'}
            selectsStart
            startDate={
              operationParams.startDate
                ? new Date(operationParams.startDate)
                : null
            }
            selectedDate={
              operationParams.startDate
                ? new Date(operationParams.startDate)
                : null
            }
            endDate={
              operationParams.endDate ? new Date(operationParams.endDate) : null
            }
            onChange={(value) => {
              filter(
                'startDate',
                value ? format(new Date(value), 'yyyy-MM-dd') : undefined
              );
            }}
          />
        </div>
        <div>
          <AppDatePicker
            isClearable
            selectsEnd
            startDate={
              operationParams.startDate
                ? new Date(operationParams.startDate)
                : null
            }
            selectedDate={
              operationParams.endDate ? new Date(operationParams.endDate) : null
            }
            endDate={
              operationParams.endDate ? new Date(operationParams.endDate) : null
            }
            minDate={
              operationParams.startDate
                ? new Date(operationParams.startDate)
                : null
            }
            label={'Fin'}
            onChange={(value) => {
              filter(
                'endDate',
                value ? format(new Date(value), 'yyyy-MM-dd') : undefined
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
