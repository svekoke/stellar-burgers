// slices/ordersFeedSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';

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

// === Грузим заказ по номеру ===
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

export const selectOrderByNumber = (state: any) =>
  state.ordersFeed.orderByNumber;

export const { connectUserOrders, disconnectUserOrders, setUserOrders } =
  ordersFeedSlice.actions;

export default ordersFeedSlice.reducer;
