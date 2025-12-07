import reducer, {
  connectUserOrders,
  disconnectUserOrders,
  setUserOrders,
  fetchOrderByNumberThunk,
  initialState
} from './ordersFeedSlice';
import { TOrder } from '../utils/types';

const mockOrder: TOrder = {
  _id: 'order1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2024-01-01T12:00:00Z',
  updatedAt: '2024-01-01T12:00:00Z',
  number: 123,
  ingredients: ['item1', 'item2']
};

describe('ordersFeedSlice', () => {
  it('initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('connectUserOrders → connected=true', () => {
    const state = reducer(initialState, connectUserOrders());
    expect(state.connected).toBe(true);
  });

  it('disconnectUserOrders → connected=false и orders очищены', () => {
    const start = {
      ...initialState,
      connected: true,
      orders: [mockOrder]
    };

    const state = reducer(start, disconnectUserOrders());

    expect(state.connected).toBe(false);
    expect(state.orders).toEqual([]);
  });

  it('setUserOrders → сохраняет заказы', () => {
    const state = reducer(initialState, setUserOrders([mockOrder]));
    expect(state.orders).toEqual([mockOrder]);
  });

  it('fetchOrderByNumberThunk.fulfilled → записывает orderByNumber', () => {
    const action = {
      type: fetchOrderByNumberThunk.fulfilled.type,
      payload: mockOrder
    };

    const state = reducer(initialState, action);
    expect(state.orderByNumber).toEqual(mockOrder);
  });
});
