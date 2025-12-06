import reducer, {
  fetchProfileOrdersThunk,
  fetchProfileOrderByNumberThunk,
  clearProfileSingleOrder
} from './profileOrdersSlice';

// Полный мок TOrder
const mockOrder = {
  _id: '1',
  status: 'done',
  name: 'Тестовый заказ',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
  number: 1,
  ingredients: ['123', '456']
};

const initialState = {
  orders: [] as (typeof mockOrder)[],
  singleOrder: null as typeof mockOrder | null,
  loading: false,
  error: null as string | null
};

describe('profileOrdersSlice', () => {
  it('initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('pending → loading=true', () => {
    const action = { type: fetchProfileOrdersThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('fulfilled → orders загружены', () => {
    const orders = [mockOrder];
    const action = {
      type: fetchProfileOrdersThunk.fulfilled.type,
      payload: orders
    };

    const state = reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(orders);
  });

  it('fetchProfileOrderByNumber.fulfilled → пишет singleOrder', () => {
    const action = {
      type: fetchProfileOrderByNumberThunk.fulfilled.type,
      payload: mockOrder
    };

    const state = reducer(initialState, action);
    expect(state.singleOrder).toEqual(mockOrder);
  });

  it('clearProfileSingleOrder очищает singleOrder', () => {
    const start = { ...initialState, singleOrder: mockOrder };

    const state = reducer(start, clearProfileSingleOrder());
    expect(state.singleOrder).toBeNull();
  });
});
