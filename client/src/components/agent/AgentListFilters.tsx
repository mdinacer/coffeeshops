import { useState } from 'react';
import { AgentParams } from '../../app/models/agentParams';
import { setAgentParams } from '../../app/slices/agentsSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppPageSize from '../common/AppPageSize';
import AppSearch from '../common/AppSearch';
import AppSort from '../common/AppSort';
import DropDown from '../input/DropDown';

interface Props {
  loading: boolean;
  agentParams: AgentParams;
}

export default function AgentsListFilters({
  agentParams,
  loading = false,
}: Props) {
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
      <DropDown
        className='flex-auto py-1'
        buttonStyle=' border-none px-0  '
        items={typesList}
        label={"Type d'agent"}
        selectedValue={selectedType}
        onChange={(item) => {
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
  { title: 'Client', value: 'client' },
  { title: 'Fournisseur', value: 'provider' },
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
