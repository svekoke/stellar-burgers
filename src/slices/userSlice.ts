import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  updateUserApi,
  getUserApi
} from '../utils/burger-api';
import { deleteCookie, setCookie } from '../utils/cookie';

interface User {
  email: string;
  name: string;
}

interface UserState {
  user: User | null;

  isAuthenticated: boolean;
  isAuthChecked: boolean;

  request: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,

  isAuthenticated: false,
  isAuthChecked: false,

  request: false,
  error: null
};

// REGISTER
export const registerUser = createAsyncThunk(
  'user/register',
  async (form: { email: string; password: string; name: string }) => {
    const res = await registerUserApi(form);

    // accessToken -> cookie
    setCookie('accessToken', res.accessToken);

    // refreshToken -> localStorage  (ВАЖНО!)
    localStorage.setItem('refreshToken', res.refreshToken);

    return res.user;
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  'user/login',
  async (form: { email: string; password: string }) => {
    const res = await loginUserApi(form);

    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);

    return res.user;
  }
);

// GET USER
export const getUser = createAsyncThunk('user/get', async () => {
  const res = await getUserApi();
  return res.user;
});

// UPDATE USER
export const updateUser = createAsyncThunk(
  'user/update',
  async (form: { name: string; email: string; password?: string }) => {
    const res = await updateUserApi(form);
    return res.user;
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();

  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.request = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.request = false;
      state.error = 'Ошибка регистрации';
    });

    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.request = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.request = false;
      state.error = 'Ошибка входа';
      state.isAuthenticated = false;
      state.isAuthChecked = true;
    });

    // GET USER
    builder.addCase(getUser.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.request = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.request = false;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
    });

    // UPDATE USER
    builder.addCase(updateUser.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.request = false;
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.request = false;
      state.error = 'Ошибка обновления профиля';
    });

    // LOGOUT
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  }
});

export default userSlice.reducer;
