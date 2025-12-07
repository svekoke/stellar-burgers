import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  closeOrderModal,
  createOrder,
  initialState
} from './orderSlice';

(global as any).crypto = { randomUUID: () => 'uuid-test' };

const ingredient = {
  _id: 'ing1',
  name: 'Соус',
  type: 'sauce',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 10,
  image: '',
  image_large: '',
  image_mobile: ''
};

const bun = { ...ingredient, _id: 'bun1', type: 'bun' };

describe('orderSlice', () => {
  it('initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('addIngredient добавляет булку', () => {
    const state = reducer(initialState, addIngredient(bun));
    expect(state.constructorItems.bun!._id).toBe('bun1');
  });

  it('addIngredient добавляет начинку', () => {
    const state = reducer(initialState, addIngredient(ingredient));
    expect(state.constructorItems.ingredients[0]._id).toBe('ing1');
    expect(state.constructorItems.ingredients[0].constructorId).toBe(
      'uuid-test'
    );
  });

  it('removeIngredient', () => {
    const start = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [{ ...ingredient, constructorId: '1' }]
      }
    };

    const state = reducer(start, removeIngredient(0));
    expect(state.constructorItems.ingredients.length).toBe(0);
  });

  it('moveIngredient', () => {
    const start = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          { ...ingredient, constructorId: '1' },
          { ...ingredient, constructorId: '2' }
        ]
      }
    };

    const state = reducer(start, moveIngredient({ fromIndex: 0, toIndex: 1 }));
    expect(state.constructorItems.ingredients[0].constructorId).toBe('2');
  });

  it('closeOrderModal', () => {
    const start = { ...initialState, orderModalData: 123 };
    const state = reducer(start, closeOrderModal());
    expect(state.orderModalData).toBeNull();
  });

  it('createOrder.pending', () => {
    const state = reducer(initialState, {
      type: createOrder.pending.type
    });

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('createOrder.fulfilled', () => {
    const fulfilled = {
      type: createOrder.fulfilled.type,
      payload: { order: { number: 777 } }
    };

    const start = {
      ...initialState,
      constructorItems: {
        bun,
        ingredients: [{ ...ingredient, constructorId: '1' }]
      }
    };

    const state = reducer(start, fulfilled);

    expect(state.orderModalData).toBe(777);
    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients.length).toBe(0);
  });

  it('createOrder.rejected', () => {
    const state = reducer(initialState, {
      type: createOrder.rejected.type
    });

    expect(state.error).toBe('Ошибка оформления заказа');
  });
});
