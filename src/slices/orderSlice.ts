import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';

interface OrderState {
  orderRequest: boolean;
  orderModalData: any | null;
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
  };
  error: string | null;
}

const initialState: OrderState = {
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
    const state: any = getState();
    const items = state.order.constructorItems;

    const ids = [
      items.bun?._id,
      ...items.ingredients.map((i: TIngredient) => i._id),
      items.bun?._id
    ].filter(Boolean) as string[];

    return await orderBurgerApi(ids);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // добавить ингредиент в конструктор
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        state.constructorItems.ingredients.push(ingredient);
      }
    },

    // удалить начинку по индексу
    removeIngredient(state, action: PayloadAction<number>) {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },

    // поменять местами начинки
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const items = state.constructorItems.ingredients;
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
    },

    //закрыть модалку
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

        // очищение конструктора после заказа
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.error = 'Ошибка оформления заказа';
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  closeOrderModal
} = orderSlice.actions;

export default orderSlice.reducer;
