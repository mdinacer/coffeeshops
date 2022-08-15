import {useState} from 'react';
import {TransactionDirection} from '../../app/models/TransactionDirection';
import {TransactionParams} from '../../app/models/TransactionParams';
import {TransactionType} from '../../app/models/TransactionType';
import AppPageSize from '../common/AppPageSize';
import AppSort from '../common/AppSort';
import AppDatePicker from '../input/DatePicker';
import DropDown from '../input/DropDown';

interface Props {
  transactionParams?: TransactionParams;
  setParams: (value: any) => void;
}

export default function TransactionFilters({ setParams }: Props) {
  const [startDate, setStartDate] = useState<Date | null | undefined>(
    new Date()
  );
  const [endDate, setEndDate] = useState<Date | null | undefined>(new Date());
  const [selectedType, setSelectedType] = useState<TransactionType | null>(-1);
  const [selectedDirection, setSelectedDirection] =
    useState<TransactionDirection | null>(-1);

  function filter(property: string, value: any) {
    setParams({ [property]: value });
  }

  const handlePageSizeChange = (count: number) => {
    filter('pageSize', count);
  };

  return (
    <div className='grid xl:grid-cols-6 md:grid-cols-3 gap-4'>
      <div>
        <DropDown
          items={typeFilters}
          label={`Type`}
          selectedValue={selectedType}
          onChange={(item) => {
            setSelectedType(item.value);
            filter('type', TransactionType[item.value]);
          }}
        />
      </div>
      <div>
        <DropDown
          items={directionFilters}
          label={`Flux`}
          selectedValue={selectedDirection}
          onChange={(item) => {
            setSelectedDirection(item.value);
            filter('direction', TransactionDirection[item.value]);
          }}
        />
      </div>
      <div>
        <AppSort
          items={orderByList}
          initialValue='date'
          onSort={(value: string) => {
            setParams({ orderBy: value });
          }}
        />
      </div>
      <div>
        <AppDatePicker
          label={'Début'}
          selectsStart
          selectedDate={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={(value) => {
            setStartDate(value);
            if (value) {
              filter('startDate', new Date(value));
            }
          }}
        />
      </div>
      <div>
        <AppDatePicker
          isClearable
          selectsEnd
          selectedDate={endDate}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          label={'Fin'}
          onChange={(value) => {
            setEndDate(value);
            if (value) {
              filter('endDate', new Date(value));
            }
          }}
        />
      </div>
      <div>
        <AppPageSize onChange={handlePageSizeChange} />
      </div>
    </div>
  );
}

const typeFilters = [
  { title: 'Tout', value: -1 },
  { title: 'Paiement', value: 0 },
  { title: 'Transaction', value: 1 },
];

const directionFilters = [
  { title: 'Tout', value: -1 },
  { title: 'Entrant', value: 0 },
  { title: 'Sortant', value: 1 },
];

const orderByList = [
  { title: 'Date', value: 'date' },
  { title: 'Montant', value: 'amount' },
  { title: 'Nature', value: 'direction' },
  { title: 'Type', value: 'type' },
];
