import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';
import { RootState } from '../services/store';

interface OrdersFeedState {
  orders: TOrder[];
  connected: boolean;
  error: string | null;
  orderByNumber: TOrder | null;
}

const initialState: OrdersFeedState = {
  orders: [],
  connected: false,
  error: null,
  orderByNumber: null
};

export const fetchOrderByNumberThunk = createAsyncThunk(
  'ordersFeed/fetchOrderByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);

const ordersFeedSlice = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {
    connectUserOrders(state) {
      state.connected = true;
    },
    disconnectUserOrders(state) {
      state.connected = false;
      state.orders = [];
    },
    setUserOrders(state, action) {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderByNumberThunk.fulfilled, (state, action) => {
      state.orderByNumber = action.payload;
    });
  }
});

export const selectOrderByNumber = (state: RootState) =>
  state.ordersFeed.orderByNumber;

export const { connectUserOrders, disconnectUserOrders, setUserOrders } =
  ordersFeedSlice.actions;

export default ordersFeedSlice.reducer;
