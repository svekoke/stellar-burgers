import reducer, { fetchFeedThunk, initialState } from './feedSlice';

describe('feedSlice', () => {
  it('initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('pending → loading=true', () => {
    const action = { type: fetchFeedThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled → данные загружены', () => {
    const payload = {
      orders: [{ number: 1 }],
      total: 10,
      totalToday: 5
    };

    const action = { type: fetchFeedThunk.fulfilled.type, payload };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
  });

  it('rejected → error', () => {
    const action = { type: fetchFeedThunk.rejected.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ленты заказов');
  });
});
