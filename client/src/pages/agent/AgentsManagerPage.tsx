import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useManagerAgents from '../../app/hooks/manager/useManagerAgents';
import ListPageLayout from '../../app/layout/ListPageLayout';
import { ShopAgent } from '../../app/models/shopAgent';
import { ShopAgentType } from '../../app/models/shopAgentType';
import { setPageNumber } from '../../app/slices/productsSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AgentsListFilters from '../../components/agent/AgentListFilters';
import AgentsList from '../../components/agent/AgentsList';
import AppButton from '../../components/common/AppButton';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import ModalDialog from '../../components/common/ModalDialog';
import AgentForm from '../../components/forms/AgentForm';

export default function AgentsManagerPage() {
  const dispatch = useAppDispatch();
  const { agentsParams, metaData, agents } = useManagerAgents();
  const [addAgent, setAddAgent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleSelectAgent(agent: ShopAgent) {
    navigate(agent.id, { state: { from: location } });
  }

  function handlePageChange(page: number) {
    dispatch(setPageNumber({ pageNumber: page + 1 }));
  }

  return (
    <>
      <ListPageLayout
        title={`Gestion des ${
          agentsParams.type === 'client' ? 'clients' : 'fournisseurs'
        }`}
        list={<AgentsList agents={agents} onSelect={handleSelectAgent} />}
        filters={
          <CollapsibleMenu title='Filtres'>
            <AgentsListFilters agentParams={agentsParams} />
          </CollapsibleMenu>
        }
        metaData={metaData}
        onPageChange={handlePageChange}
        actionButton={
          <AppButton
            onClick={() => setAddAgent(true)}
            label={`Ajouter un ${
              agentsParams.type === 'client' ? 'client' : 'fournisseur'
            }`}
            genre={'info'}
          />
        }
      />

      <ModalDialog
        title={`Ajouter un ${
          agentsParams.type === 'client' ? 'client' : 'fournisseur'
        }`}
        active={addAgent}
        contentStyle='p-5'
      >
        <AgentForm
          type={
            agentsParams.type === 'client'
              ? ShopAgentType.client
              : ShopAgentType.provider
          }
          onClose={(value) => setAddAgent(false)}
        />
      </ModalDialog>
    </>
  );
}
