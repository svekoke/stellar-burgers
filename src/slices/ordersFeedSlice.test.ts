import reducer, {
  connectUserOrders,
  disconnectUserOrders,
  setUserOrders,
  fetchOrderByNumberThunk
} from './ordersFeedSlice';

const mockOrder = {
  _id: '1',
  name: 'Test Order',
  status: 'done',
  number: 123,
  createdAt: '',
  updatedAt: '',
  ingredients: []
};

const initialState = {
  orders: [],
  connected: false,
  error: null,
  orderByNumber: null
};

describe('ordersFeedSlice', () => {
  it('initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('connectUserOrders → connected=true', () => {
    const state = reducer(initialState, connectUserOrders());
    expect(state.connected).toBe(true);
  });

  it('disconnectUserOrders → connected=false + очистка orders', () => {
    const start = {
      ...initialState,
      connected: true,
      orders: [mockOrder]
    };

    const state = reducer(start, disconnectUserOrders());

    expect(state.connected).toBe(false);
    expect(state.orders).toEqual([]);
  });

  it('setUserOrders → записывает массив заказов', () => {
    const state = reducer(initialState, setUserOrders([mockOrder]));

    expect(state.orders).toEqual([mockOrder]);
  });

  it('fetchOrderByNumber.fulfilled → сохраняет orderByNumber', () => {
    const action = {
      type: fetchOrderByNumberThunk.fulfilled.type,
      payload: mockOrder
    };

    const state = reducer(initialState, action);

    expect(state.orderByNumber).toEqual(mockOrder);
  });
});
