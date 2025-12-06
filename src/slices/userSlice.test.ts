import reducer, {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser
} from './userSlice';

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  request: false,
  error: null
};

describe('userSlice', () => {
  it('initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // REGISTER
  it('register.pending → request=true', () => {
    const action = { type: registerUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  it('register.fulfilled → сохраняет user', () => {
    const user = { email: 'a@a.com', name: 'A' };
    const action = { type: registerUser.fulfilled.type, payload: user };
    const state = reducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  it('register.rejected → error', () => {
    const action = { type: registerUser.rejected.type };
    const state = reducer(initialState, action);
    expect(state.error).toBe('Ошибка регистрации');
  });

  // LOGIN
  it('login.pending → request=true', () => {
    const state = reducer(initialState, { type: loginUser.pending.type });
    expect(state.request).toBe(true);
  });

  it('login.fulfilled авторизует', () => {
    const user = { email: 'b@b.com', name: 'B' };
    const state = reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: user
    });

    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  it('login.rejected → сброс авторизации', () => {
    const state = reducer(initialState, { type: loginUser.rejected.type });
    expect(state.error).toBe('Ошибка входа');
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  // GET USER
  it('getUser.pending → request=true', () => {
    const state = reducer(initialState, { type: getUser.pending.type });
    expect(state.request).toBe(true);
  });

  it('getUser.fulfilled → user сохранён', () => {
    const user = { email: 'c@c.com', name: 'C' };
    const state = reducer(initialState, {
      type: getUser.fulfilled.type,
      payload: user
    });

    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  it('getUser.rejected → isAuthChecked=true', () => {
    const state = reducer(initialState, { type: getUser.rejected.type });
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  // UPDATE
  it('updateUser.fulfilled → обновляет user', () => {
    const start = { ...initialState, user: { email: 'old', name: 'old' } };
    const updated = { email: 'new', name: 'new' };

    const state = reducer(start, {
      type: updateUser.fulfilled.type,
      payload: updated
    });

    expect(state.user).toEqual(updated);
  });

  // LOGOUT
  it('logout.fulfilled → сбрасывает user', () => {
    const start = {
      ...initialState,
      user: { email: 'x', name: 'y' },
      isAuthenticated: true
    };

    const state = reducer(start, { type: logoutUser.fulfilled.type });

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
