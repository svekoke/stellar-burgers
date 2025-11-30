import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, getOrderByNumberApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';
import { RootState } from '../services/store';

type ProfileOrdersState = {
  orders: TOrder[];
  singleOrder: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProfileOrdersState = {
  orders: [],
  singleOrder: null,
  loading: false,
  error: null
};

export const fetchProfileOrdersThunk = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  getOrdersApi
);

export const fetchProfileOrderByNumberThunk = createAsyncThunk(
  'profileOrders/fetchProfileOrderByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res.orders[0];
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    clearProfileSingleOrder(state) {
      state.singleOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrderByNumberThunk.fulfilled, (state, action) => {
        state.singleOrder = action.payload;
      });
  }
});

export const { clearProfileSingleOrder } = profileOrdersSlice.actions;

// Селекторы

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;

export const selectProfileSingleOrder = (state: RootState) =>
  state.profileOrders.singleOrder;

export default profileOrdersSlice.reducer;
