import reducer, { fetchIngredientsThunk } from './ingredientsSlice';

const initialState = {
  items: [],
  loading: false,
  error: null
};

describe('ingredientsSlice', () => {
  it('возвращает initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('pending → loading=true', () => {
    const action = { type: fetchIngredientsThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('fulfilled → items загружены', () => {
    const ingredients = [{ _id: '1', name: 'Булка' }];
    const action = {
      type: fetchIngredientsThunk.fulfilled.type,
      payload: ingredients
    };

    const state = reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(ingredients);
  });

  it('rejected → ошибка', () => {
    const action = { type: fetchIngredientsThunk.rejected.type };
    const state = reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
