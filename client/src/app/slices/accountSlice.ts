import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import agent from '../api/agent';
import { User } from '../models/user';
import { UserProfile } from '../models/userProfile';
import customHistory from '../layout/history';

interface AccountState {
  user: User | null;
  profile: UserProfile | null;
  shopId: string | null;
  roles: string[];
}

const initialState: AccountState = {
  user: null,
  profile: null,
  shopId: null,
  roles: [],
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  'account/signInUser',
  async (data, thunkApi) => {
    try {
      const user: User = await agent.Account.login(data);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const signUpUser = createAsyncThunk<User, FieldValues>(
  'account/signUpUser',
  async (data, thunkApi) => {
    try {
      const user = await agent.Account.register(data);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  'account/fetchCurrentUser',
  async (_, thunkApi) => {
    thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {
      const user = await agent.Account.currentUser();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('user')) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      customHistory.push('/');
    },
    setShopId: (state, action) => {
      state.shopId = action.payload;
    },

    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUser: (state, action) => {
      const data = action.payload.token.split('.')[1];
      if (data) {
        let claims = JSON.parse(atob(data));
        let roles = claims['role'];
        let shopId = claims['shopId'];

        if (shopId) {
          state.shopId = shopId;
        }
        state.user = {
          ...action.payload,
          role: typeof roles === 'string' ? [roles] : roles,
        };
      } else {
        state.user = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem('user');
      customHistory.push('/account/login');
    });

    builder.addCase(signInUser.rejected, (state, action) => {
      throw action.payload;
    });

    builder.addMatcher(
      isAnyOf(
        signUpUser.fulfilled,
        signInUser.fulfilled,
        fetchCurrentUser.fulfilled
      ),
      (state, action) => {
        const data = action.payload.token.split('.')[1];

        if (data) {
          let claims = JSON.parse(atob(data));

          let shopId = claims['shopId'];

          if (shopId) {
            state.shopId = shopId;
          }
          let roles = claims['role'];
          state.user = {
            ...action.payload,
            roles: typeof roles === 'string' ? [roles] : roles,
          };
          state.roles = typeof roles === 'string' ? [roles] : roles;
          if (action.payload.profile) {
            state.profile = action.payload.profile;
          }

          if (!state.user.profile) {
            customHistory.push('/account/profile/');
          } else if (state.user.profile && !state.shopId) {
            customHistory.push('/shop/');
          }
        } else {
          state.user = action.payload;
        }
      }
    );
  },
});

export const { setUser, signOut, setShopId, setProfile } = accountSlice.actions;
