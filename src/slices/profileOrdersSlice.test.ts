import reducer, {
  fetchProfileOrdersThunk,
  fetchProfileOrderByNumberThunk,
  clearProfileSingleOrder,
  initialState
} from './profileOrdersSlice';

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
    const action = {
      type: fetchProfileOrdersThunk.fulfilled.type,
      payload: [mockOrder]
    };

    const state = reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([mockOrder]);
  });

  it('fetchProfileOrderByNumberThunk.fulfilled → пишет singleOrder', () => {
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
