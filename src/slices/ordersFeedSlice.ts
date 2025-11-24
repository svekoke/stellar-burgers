import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrdersFeedState {
  orders: TOrder[];
  connected: boolean;
  error: string | null;
}

const initialState: OrdersFeedState = {
  orders: [],
  connected: false,
  error: null
};

const ordersFeedSlice = createSlice({
  name: 'userOrdersFeed',
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
  }
});

export const { connectUserOrders, disconnectUserOrders, setUserOrders } =
  ordersFeedSlice.actions;

export default ordersFeedSlice.reducer;
