import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  closeOrderModal,
  createOrder
} from './orderSlice';

const bun = {
  _id: 'bun1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 50,
  image: '',
  image_mobile: '',
  image_large: ''
};

const ingredient = {
  _id: 'sauce1',
  name: 'Соус',
  type: 'sauce',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 10,
  image: '',
  image_mobile: '',
  image_large: ''
};

const initialState = {
  orderRequest: false,
  orderModalData: null,
  constructorItems: { bun: null, ingredients: [] },
  error: null
};

describe('orderSlice', () => {
  it('initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('addIngredient добавляет булку', () => {
    const state = reducer(initialState, addIngredient(bun));
    expect(state.constructorItems.bun?._id).toBe('bun1');
  });

  it('addIngredient добавляет не-булку', () => {
    const state = reducer(initialState, addIngredient(ingredient));

    expect(state.constructorItems.ingredients.length).toBe(1);
    expect(state.constructorItems.ingredients[0]._id).toBe('sauce1');
    expect(state.constructorItems.ingredients[0].constructorId).toBe(
      'test-uuid'
    );
  });

  it('removeIngredient удаляет по индексу', () => {
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

    const state = reducer(start, removeIngredient(0));
    expect(state.constructorItems.ingredients.length).toBe(1);
  });

  it('moveIngredient меняет порядок элементов', () => {
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

  it('closeOrderModal очищает модалку', () => {
    const start = { ...initialState, orderModalData: 123 };
    const state = reducer(start, closeOrderModal());

    expect(state.orderModalData).toBeNull();
  });

  it('createOrder.pending ставит orderRequest=true', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('createOrder.fulfilled сбрасывает конструктор и ставит номер заказа', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: { number: 555 } }
    };

    const state = reducer(
      {
        ...initialState,
        constructorItems: {
          bun,
          ingredients: [{ ...ingredient, constructorId: '100' }]
        }
      },
      action
    );

    expect(state.orderModalData).toBe(555);
    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients.length).toBe(0);
  });

  it('createOrder.rejected → error', () => {
    const action = { type: createOrder.rejected.type };
    const state = reducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка оформления заказа');
  });
});
