import { format } from 'date-fns';
import { useState } from 'react';
import { OperationType } from '../../app/models/OperationType';
import { setOperationParams } from '../../app/slices/operationSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppSort from '../common/AppSort';
import AppDatePicker from '../input/DatePicker';
import DropDown from '../input/DropDown';

export default function OperationsFilters() {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Date | null | undefined>(null);
  const [endDate, setEndDate] = useState<Date | null | undefined>(null);
  const [selectedType, setSelectedType] = useState(OperationType.sale);

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
      <div className='grid  md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div>
          <DropDown
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
              if (value) {
                filter('startDate', format(new Date(value), 'yyyy-MM-dd'));
              }
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
              if (value) {
                filter('endDate', format(new Date(value), 'yyyy-MM-dd'));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
