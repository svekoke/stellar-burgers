import reducer, { fetchFeedThunk } from './feedSlice';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

describe('feedSlice', () => {
  it('должен вернуть initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchFeedThunk.pending устанавливает loading=true', () => {
    const action = { type: fetchFeedThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchFeedThunk.fulfilled загружает данные ленты', () => {
    const payload = {
      orders: [{ number: 1 }],
      total: 100,
      totalToday: 10
    };
    const action = { type: fetchFeedThunk.fulfilled.type, payload };

    const state = reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('fetchFeedThunk.rejected устанавливает ошибку', () => {
    const action = { type: fetchFeedThunk.rejected.type };
    const state = reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ленты заказов');
  });
});
