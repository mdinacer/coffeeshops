import {useState} from 'react';
import useManageAgents from '../../app/hooks/manager/useManageAgents';
import ListPageLayout from '../../app/layout/ListPageLayout';
import {ShopAgent} from '../../app/models/shopAgent';
import {ShopAgentType} from '../../app/models/shopAgentType';
import {setPageNumber} from '../../app/slices/shopSlice';
import {useAppDispatch} from '../../app/store/configureStore';
import AgentDetails from '../../components/agent/AgentDetails';
import AgentsListFilters from '../../components/agent/AgentListFilters';
import AgentsList from '../../components/agent/AgentsList';
import AppButton from '../../components/common/AppButton';
import AppDialog from '../../components/common/AppDialog';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import AgentForm from '../../components/forms/AgentForm';

export default function AgentsManagerPage() {
  const dispatch = useAppDispatch();
  const { agentsParams, agentsLoaded, metaData, agents } = useManageAgents();
  const [addAgent, setAddAgent] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<ShopAgent | null>(null);

  function handleSelectAgent(agent: ShopAgent) {
    setSelectedAgent(agent);
  }

  function handlePageChange(page: number) {
    dispatch(setPageNumber({ pageNumber: page + 1 }));
  }

  return (
    <ListPageLayout
      title={`Gestion des ${
        agentsParams.type === 'client' ? 'clients' : 'fournisseurs'
      }`}
      list={<AgentsList agents={agents} onSelect={handleSelectAgent} />}
      filters={
        <CollapsibleMenu title='Filtres'>
          <AgentsListFilters
            loading={!agentsLoaded}
            agentParams={agentsParams}
          />
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
      dialogContent={
        <>
          {addAgent && (
            <AppDialog
              title={`Ajouter un ${
                agentsParams.type === 'client' ? 'client' : 'fournisseur'
              }`}
              buttonsVisible={false}
            >
              <AgentForm
                type={
                  agentsParams.type === 'client'
                    ? ShopAgentType.client
                    : ShopAgentType.provider
                }
                onClose={(value) => setAddAgent(false)}
              />
            </AppDialog>
          )}

          {selectedAgent && (
            <AppDialog className=' w-auto'>
              <AgentDetails
                agentId={selectedAgent.id}
                onClose={() => setSelectedAgent(null)}
              />
            </AppDialog>
          )}
        </>
      }
      dialogVisible={addAgent || !!selectedAgent}
    />
  );
}
