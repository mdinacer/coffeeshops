import { UserIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { AgentParams } from '../../app/models/agentParams';
import { setAgentParams } from '../../app/slices/agentsSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppButtonSelect from '../common/AppButtonSelect';
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

  return (
    <div className='flex w-full flex-row items-center justify-between gap-5'>
      <div className=' w-full  md:max-w-xl '>
        <AppSearch onSearch={handleSearch} />
      </div>
      <div className=' w-full  md:max-w-sm'>
        <AppButtonSelect
          items={typesList}
          label={'Type'}
          Icon={UserIcon}
          selectedValue={selectedType}
          onChange={(item) => {
            setSelectedType(item.value);
            handleTypeChange(item.value);
          }}
        />
      </div>

      <div className=' w-full md:max-w-sm'>
        <AppSort items={orderFilters} onSort={handleSort} initialValue='name' />
      </div>
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
