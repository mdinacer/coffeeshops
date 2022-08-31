import { format } from 'date-fns';
import { useState } from 'react';
import useOperations from '../../app/hooks/useOperations';
import { OperationType } from '../../app/models/OperationType';
import { setOperationParams } from '../../app/slices/operationSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppButtonSelect from '../common/AppButtonSelect';
import AppSort from '../common/AppSort';
import AppDatePicker from '../input/DatePicker';

export default function OperationsFilters() {
  const dispatch = useAppDispatch();
  const { operationType } = useOperations();
  const [startDate, setStartDate] = useState<Date | null | undefined>(
    new Date()
  );
  const type =
    operationType === OperationType[0]
      ? OperationType.purchase
      : OperationType.sale;
  const [endDate, setEndDate] = useState<Date | null | undefined>();
  const [selectedType, setSelectedType] = useState(type);

  const typeFilters = [
    { title: 'Achat', value: 0 },
    { title: 'Vente', value: 1 },
  ];

  const orderByList = [
    { title: 'Référence', value: 'id' },
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

  return (
    <div>
      <div className='grid  gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <div>
          <AppButtonSelect
            items={typeFilters}
            label={`opération`}
            selectedValue={selectedType}
            onChange={(item) => {
              setSelectedType(item.value);
              filter('type', OperationType[item.value]);
            }}
          />
        </div>
        <div>
          <AppSort
            items={orderByList}
            initialValue='date'
            onSort={(value: string) => {
              handleOrderChange(value);
            }}
          />
        </div>
        <div>
          <AppDatePicker
            label={'Début'}
            selectsStart
            startDate={startDate}
            selectedDate={startDate}
            endDate={endDate}
            onChange={(value) => {
              setStartDate(value);
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
            startDate={startDate}
            selectedDate={endDate}
            endDate={endDate}
            minDate={startDate}
            label={'Fin'}
            onChange={(value) => {
              setEndDate(value);
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
