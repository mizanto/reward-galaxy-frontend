import { createSlice } from '@reduxjs/toolkit';

import { parseUserData } from '../utils/parser';

const initialState = {
  currentUser: null,
  isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.currentUser = parseUserData(action.payload);
    },
    updateBalance(state, action) {
      const { amount, reason } = action.payload;
      if (state.currentUser) {
        state.currentUser.balance += amount;
        console.debug("transaction: ", amount, reason)
      }
    }
  }
});

export const { logout, login, updateBalance } = userSlice.actions;
export default userSlice.reducer;