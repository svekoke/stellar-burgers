import reducer, {
  fetchIngredientsThunk,
  initialState
} from './ingredientsSlice';

describe('ingredientsSlice', () => {
  it('initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('pending → loading=true', () => {
    const action = { type: fetchIngredientsThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('fulfilled → items загружены', () => {
    const items = [{ _id: '1', name: 'Булка' }];

    const action = {
      type: fetchIngredientsThunk.fulfilled.type,
      payload: items
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(items);
  });

  it('rejected → error', () => {
    const action = { type: fetchIngredientsThunk.rejected.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
