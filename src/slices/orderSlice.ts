import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';
import { RootState } from '../services/store';

export interface OrderState {
  orderRequest: boolean;
  orderModalData: number | null;
  constructorItems: {
    bun: TIngredient | null;
    ingredients: (TIngredient & { constructorId: string })[];
  };
  error: string | null;
}

export const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  error: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const items = state.order.constructorItems;

    const ids = [
      items.bun?._id,
      ...items.ingredients.map((i) => i._id),
      items.bun?._id
    ].filter(Boolean) as string[];

    return await orderBurgerApi(ids);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // УСТАНОВИТЬ БУЛКУ
    setBun(state, action: PayloadAction<TIngredient>) {
      state.constructorItems.bun = action.payload;
    },

    //ДОБАВИТЬ ИНГРЕДИЕНТ
    addIngredient: {
      reducer(
        state,
        action: PayloadAction<TIngredient & { constructorId: string }>
      ) {
        state.constructorItems.ingredients.push(action.payload);
      },
      prepare(ingredient: TIngredient) {
        return {
          payload: {
            ...ingredient,
            constructorId: crypto.randomUUID()
          }
        };
      }
    },

    //УДАЛИТЬ ПО INDEX
    removeIngredient(state, action: PayloadAction<number>) {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },

    //ПЕРЕТАСКИВАНИЕ
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const items = state.constructorItems.ingredients;
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
    },

    closeOrderModal(state) {
      state.orderModalData = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order.number;
        state.constructorItems = { bun: null, ingredients: [] };
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.error = 'Ошибка оформления заказа';
      });
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  closeOrderModal
} = orderSlice.actions;

export default orderSlice.reducer;
