import {createAsyncThunk, createEntityAdapter, createSlice,} from '@reduxjs/toolkit';
import agent from '../api/agent';
import {ShopAgent} from '../models/shopAgent';

import {MetaData} from '../models/pagination';
import {RootState} from '../store/configureStore';
import {AgentParams} from '../models/agentParams';
import {ShopAgentType} from '../models/shopAgentType';

interface ShopAgentState {
    agentsLoaded: boolean;
    status: string;
    agentsParams: AgentParams;
    agentType: string;
    metaData: MetaData | null;
}

const agentsAdapter = createEntityAdapter<ShopAgent>({
    selectId: (shopAgent) => shopAgent.id,
});

export function getAxiosAgentParams(agentParams: AgentParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', agentParams.pageNumber.toString());
    params.append('pageSize', agentParams.pageSize.toString());
    params.append('orderBy', agentParams.orderBy);

    if (agentParams.type) {
        params.append('type', agentParams.type);
    } else {
        params.delete('type');
    }

    if (agentParams.searchTerm) {
        params.append('searchTerm', agentParams.searchTerm);
    } else {
        params.delete('searchTerm');
    }

    if (agentParams.debtOnly) {
        params.append('debtOnly', agentParams.debtOnly.toString());
    } else {
        params.delete('debtOnly');
    }

    return params;
}

export const fetchAgentsAsync = createAsyncThunk<
    ShopAgent[],
    void,
    { state: RootState }
>('agent/fetchAgentsAsync', async (_, thunkApi) => {
    const agentsParams = thunkApi.getState().agent.agentsParams;
    const params = getAxiosAgentParams(agentsParams);
    try {
        const response: any = await agent.Agents.list(params);
        thunkApi.dispatch(setMetaData(response.metaData));
        return response.items;
    } catch (error: any) {
        return thunkApi.rejectWithValue({ error: error.data });
    }
});

export const fetchAgentAsync = createAsyncThunk<
    ShopAgent,
    string
>('agent/fetchAgentAsync', async (agentId, thunkApi) => {

    try {
        const response: ShopAgent = await agent.Agents.get(agentId);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue({ error: error.data });
    }
});

//TODO: ADD FETCH AGENT FUNCTION

function initParams(): AgentParams {
    return {
        pageNumber: 1,
        pageSize: 10,
        orderBy: 'name',
        type: ShopAgentType[0],
        debtOnly: null
    };
}

export const agentSlice = createSlice({
    name: 'agent',
    initialState: agentsAdapter.getInitialState<ShopAgentState>({
        agentsLoaded: false,
        status: 'idle',
        agentsParams: initParams(),
        agentType: ShopAgentType[0],
        metaData: null,
    }),
    reducers: {
        setAgentParams: (state, action) => {
            state.agentsLoaded = false;
            state.agentsParams = {
                ...state.agentsParams,
                ...action.payload,
                pageNumber: 1,
            };
            state.agentType = state.agentsParams.type.toString();
        },

        setPageNumber: (state, action) => {
            state.agentsLoaded = false;
            state.agentsParams = { ...state.agentsParams, ...action.payload };
        },

        setPageSize: (state, action) => {
            state.agentsLoaded = false;
            state.agentsParams = { ...state.agentsParams, ...action.payload };
        },

        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },

        resetAgentParams: (state) => {
            state.agentsParams = initParams();
            state.agentType = ShopAgentType[1];
        },

        addShopAgent: agentsAdapter.addOne,
        updateShopAgent: agentsAdapter.updateOne,
        removeShopAgent: agentsAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAgentsAsync.pending, (state) => {
            state.status = 'pendingFetchShopAgents';
        });

        builder.addCase(fetchAgentsAsync.fulfilled, (state, action) => {
            agentsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.agentsLoaded = true;
        });

        builder.addCase(fetchAgentsAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchAgentAsync.pending, (state) => {
            state.status = "pendingFetchProduct";
        });

        builder.addCase(fetchAgentAsync.fulfilled, (state, action) => {
            agentsAdapter.upsertOne(state, action.payload)
            state.status = "idle";
        });

        builder.addCase(fetchAgentAsync.rejected, (state) => {
            state.status = "idle";
        });
    },
});

export const agentsSelectors = agentsAdapter.getSelectors(
    (state: RootState) => state.agent
);

export const {
    setAgentParams,
    resetAgentParams,
    setMetaData,
    setPageNumber,
    setPageSize,
    addShopAgent,
    updateShopAgent,
    removeShopAgent,
} = agentSlice.actions;
