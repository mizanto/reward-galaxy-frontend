import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { parseUserData } from '../utils/parser';
import { getCurrentUser } from '../api/userService';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: true,
};

export const restoreUserFromToken = createAsyncThunk(
  'user/restoreUser',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return rejectWithValue('No token found');

    try {
      return await getCurrentUser();
    } catch (error) {
      return rejectWithValue('Failed to restore user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.removeItem('accessToken');
      state.loading = false;
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.currentUser = parseUserData(action.payload);
      state.loading = false;
    },
    updateBalance(state, action) {
      const { amount, reason } = action.payload;
      if (state.currentUser) {
        state.currentUser.balance += amount;
        console.debug("transaction: ", amount, reason)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreUserFromToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreUserFromToken.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(restoreUserFromToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.loading = false;
      });
  }
});

export const { logout, login, updateBalance } = userSlice.actions;
export default userSlice.reducer;