import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 1,
    role: 'parent',  // или 'child'
    name: 'Иван',
    balance: 5
  },
  isAuthenticated: true // для примера, потом этот флаг будет меняться после логина/логаута
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    updateBalance(state, action) {
      // Обновляем баланс текущего пользователя, например, после покупки
      const { amount } = action.payload;
      if (state.user) {
        state.user.balance += amount;
      }
    }
  }
});

export const { logout, login, updateBalance } = authSlice.actions;
export default authSlice.reducer;