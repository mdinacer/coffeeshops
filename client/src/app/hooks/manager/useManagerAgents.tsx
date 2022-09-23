import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { agentsSelectors, fetchAgentsAsync } from '../../slices/agentsSlice';

export default function useManagerAgents() {
  const { status, agentsParams } = useAppSelector((state) => state.agent);
  const agents = useAppSelector(agentsSelectors.selectAll);
  const { agentsLoaded, metaData, agentType } = useAppSelector(
    (state) => state.agent
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!agentsLoaded && !status.includes('pending')) {
      dispatch(fetchAgentsAsync());
    }
  }, [agentsLoaded, dispatch, status]);

  return {
    agents,
    agentsLoaded,
    agentType,
    metaData,
    agentsParams,
  };
}
