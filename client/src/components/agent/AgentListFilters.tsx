import { UserIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { AgentParams } from '../../app/models/agentParams';
import { setAgentParams } from '../../app/slices/agentsSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppButtonSelect from '../common/AppButtonSelect';
import AppPageSize from '../common/AppPageSize';
import AppSearch from '../common/AppSearch';
import AppSort from '../common/AppSort';

interface Props {
  agentParams: AgentParams;
}

export default function AgentsListFilters({ agentParams }: Props) {
  const dispatch = useAppDispatch();
  const [selectedType, setSelectedType] = useState(agentParams.type);

  const handleTypeChange = (value: string) => {
    dispatch(
      setAgentParams({
        type: value,
      })
    );
  };

  const handleSearch = (value: string) => {
    dispatch(setAgentParams({ searchTerm: value }));
  };

  function handleSort(value: string) {
    dispatch(setAgentParams({ orderBy: value }));
  }

  const handlePageSizeChange = (count: number) => {
    dispatch(setAgentParams({ pageSize: count }));
  };

  return (
    <div className=' grid xl:grid-cols-5 md:grid-cols-2 gap-5 w-full'>
      <AppButtonSelect
        items={typesList}
        label={'Type'}
        Icon={UserIcon}
        selectedValue={selectedType}
        onChange={(item) => {
          console.log(item.value);

          setSelectedType(item.value);
          handleTypeChange(item.value);
        }}
      />
      <div className=' flex-auto w-full xl:col-span-2'>
        <AppSearch onSearch={handleSearch} />
      </div>
      <AppSort items={orderFilters} onSort={handleSort} initialValue='name' />
      <AppPageSize onChange={handlePageSizeChange} />
    </div>
  );
}

const typesList = [
  { title: 'Clients', value: 'client' },
  { title: 'Fournisseurs', value: 'provider' },
];

const orderFilters = [
  { title: 'Nom', value: 'name' },
  { title: 'Montant Total', value: 'total' },
  { title: 'Montant Payé', value: 'paid' },
  { title: 'Dettes', value: 'remain' },
];

// const pageSizes = [
//   { title: '10', value: 10 },
//   { title: '25', value: 25 },
//   { title: '50', value: 50 },
// ];
