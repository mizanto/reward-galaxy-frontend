import { createSlice } from '@reduxjs/toolkit';

import { addTransaction } from './transactionsSlice';

const initialState = {
  currentUser: {
    id: 1,
    role: 'parent',  // или 'child'
    name: 'Иван',
    balance: 5
  },
  isAuthenticated: true // для примера, потом этот флаг будет меняться после логина/логаута
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
      state.currentUser = action.payload;
    },
    updateBalance(state, action) {
      const { amount, reason } = action.payload;
      if (state.currentUser) {
        state.currentUser.balance += amount;

        console.log("transaction: ", amount, reason)
        action.dispatch(
            addTransaction({userId: state.currentUser.id, amount, reason,})
        );
      }
    }
  }
});

export const { logout, login, updateBalance } = userSlice.actions;
export default userSlice.reducer;