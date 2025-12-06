import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';
import { RootState } from '../services/store';

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const fetchFeedThunk = createAsyncThunk('feed/fetchFeed', async () => {
  const res = await getFeedsApi();
  return res;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeedThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка загрузки ленты заказов';
      });
  }
});

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeed = (state: RootState) => state.feed;

export default feedSlice.reducer;
