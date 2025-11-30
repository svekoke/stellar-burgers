import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';
import { RootState } from '../services/store'; // ← важно добавить

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

const initialState = {
  items: [] as TIngredient[],
  loading: false,
  error: null as string | null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredientsThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка загрузки';
      });
  }
});

//Селекторы

export const selectIngredients = (state: RootState) => state.ingredients.items;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;

export default ingredientsSlice.reducer;
