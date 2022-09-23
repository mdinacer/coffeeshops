import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { HistoryParams } from '../../app/models/HistoryParams';
import AppSort from '../common/AppSort';
import AppDatePicker from '../input/DatePicker';
import DropDown from '../input/DropDown';

interface Props {
  historyParams: HistoryParams;
  setParams: (values: any) => void;
}

export default function HistoryFilters({ historyParams, setParams }: Props) {
  const [users, setUsers] = useState<any[]>([]);
  const orderByList = [
    { title: 'Date', value: 'date' },
    { title: 'Action', value: 'action' },
    { title: 'Utilisateur', value: 'user' },
  ];

  const actionsFilter = [
    { title: 'tout', value: undefined },
    { title: 'création', value: 0 },
    { title: 'édition', value: 1 },
    { title: 'suppression', value: 2 },
  ];

  const fetchUsers = useCallback(async () => {
    try {
      const result = await agent.Shops.listUsers();
      setUsers([
        { title: 'Tout', value: undefined },
        ...result.map((u: any) => ({ title: u.username, value: u.id })),
      ]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function filter(property: string, value: any) {
    setParams({ [property]: value });
  }

  const handleOrderChange = (value: string) => {
    filter('orderBy', value);
  };

  useEffect(() => {
    fetchUsers();
    return () => {};
  }, []);

  return (
    <div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        <div>
          <DropDown
            label='utilisateur'
            selectedValue={historyParams.userId}
            items={users}
            onChange={(item) => {
              filter('userId', item.value);
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
            selectedValue={historyParams.action}
            label='action'
            items={actionsFilter}
            onChange={(item) => {
              filter('action', item.value);
            }}
          />
        </div>

        <div>
          <AppDatePicker
            label={'Début'}
            selectsStart
            startDate={
              historyParams.startDate ? new Date(historyParams.startDate) : null
            }
            selectedDate={
              historyParams.startDate ? new Date(historyParams.startDate) : null
            }
            endDate={
              historyParams.endDate ? new Date(historyParams.endDate) : null
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
              historyParams.startDate ? new Date(historyParams.startDate) : null
            }
            selectedDate={
              historyParams.endDate ? new Date(historyParams.endDate) : null
            }
            endDate={
              historyParams.endDate ? new Date(historyParams.endDate) : null
            }
            minDate={
              historyParams.startDate ? new Date(historyParams.startDate) : null
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
