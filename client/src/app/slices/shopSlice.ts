import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import agent from '../api/agent';
import { Shop } from '../models/shop';

interface ShopState {
  shop: Shop | null;
  shopLoaded: boolean;
  status: string;
  isOwner: boolean;
}

const initialState: ShopState = {
  shop: null,
  shopLoaded: false,
  status: 'idle',
  isOwner: false,
};

export const fetchShopAsync = createAsyncThunk(
  'shop/fetchShopAsync',
  async (_, thunkApi) => {
    try {
      const response = await agent.Shops.get();
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShop: (state, action) => {
      state.shop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShopAsync.pending, (state) => {
      state.status = 'pendingFetchShop';
    });
    builder.addCase(fetchShopAsync.rejected, (state) => {
      state.status = 'idle';
    });
    builder.addCase(fetchShopAsync.fulfilled, (state, action) => {
      const { isOwner, ...shop } = action.payload;
      state.shop = shop;
      state.isOwner = isOwner;
      state.status = 'idle';
      state.shopLoaded = true;
    });
  },
});

export const {
  setShop,
} = shopSlice.actions;
