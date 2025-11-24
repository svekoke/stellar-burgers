import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';

type ProfileOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: ProfileOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchProfileOrdersThunk = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrdersThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка загрузки заказов пользователя';
      });
  }
});

export const selectProfileOrders = (state: any) => state.profileOrders.orders;
export const selectProfileOrdersState = (state: any) => state.profileOrders;

export default profileOrdersSlice.reducer;
