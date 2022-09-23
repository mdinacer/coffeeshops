import { useCallback, useEffect, useState } from 'react';
import { ShopAgent } from '../models/shopAgent';
import { ShopAgentType } from '../models/shopAgentType';
import agent from '../api/agent';

export default function useAgents(
  agentType: ShopAgentType,
  autoLoad: boolean = true
) {
  const [agents, setAgents] = useState<ShopAgent[]>([]);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [agentsLoaded, setAgentsLoaded] = useState(false);

  const fetchAgents = useCallback(async (agentType: ShopAgentType) => {
    setAgentsLoading(true);
    try {
      const params = getAgentAxiosParams(agentType);
      const result: ShopAgent[] = await agent.Agents.listFull(params);
      if (result) {
        setAgents(result);
        setAgentsLoaded(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAgentsLoading(false);
    }
  }, []);

  function addAgent(agent: ShopAgent) {
    const items = [...agents, agent].sort((a, b) => (a.name < b.name ? -1 : 1));
    setAgents(items);
  }

  useEffect(() => {
    if (autoLoad && agentType >= 0 && !agentsLoaded) {
      fetchAgents(agentType);
    }
  }, [agentsLoaded, fetchAgents, agentType, autoLoad]);

  return {
    agents,
    agentsLoaded,
    agentsLoading,
    addAgent,
    fetchAgents,
  };
}

function getAgentAxiosParams(type: ShopAgentType) {
  const params = new URLSearchParams();
  params.append('type', ShopAgentType[type]);
  return params;
}
