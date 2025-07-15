import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loginApi, signupApi, fetchProfile } from '../../api/auth';


interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (data, thunkAPI) => {
  try {
    const res = await loginApi(data);
    localStorage.setItem('token', res.token);
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Login failed');
  }
});

export const registerUser = createAsyncThunk<
  Partial<AuthResponse>,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async (data, thunkAPI) => {
  try {
    const res = await signupApi(data);
    if (res.token) {
      localStorage.setItem('token', res.token);
      return res;
    }
    return {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Signup failed');
  }
});

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    try {
      const res = await fetchProfile();
      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to fetch user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<Partial<AuthResponse>>) => {
        state.loading = false;
        if (action.payload.token) {
          state.token = action.payload.token;
          state.user = action.payload.user!;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Signup failed';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
