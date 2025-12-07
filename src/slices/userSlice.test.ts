import reducer, {
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  getUser,
  initialState
} from './userSlice';

describe('userSlice', () => {
  it('initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('login.pending', () => {
    const state = reducer(initialState, { type: loginUser.pending.type });
    expect(state.request).toBe(true);
  });

  it('login.fulfilled', () => {
    const user = { email: 'test@test.com', name: 'Test' };

    const state = reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: user
    });

    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('login.rejected', () => {
    const state = reducer(initialState, {
      type: loginUser.rejected.type
    });

    expect(state.error).toBe('Ошибка входа');
  });

  it('logout.fulfilled', () => {
    const start = { ...initialState, user: { email: '1', name: '1' } };

    const state = reducer(start, { type: logoutUser.fulfilled.type });

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
