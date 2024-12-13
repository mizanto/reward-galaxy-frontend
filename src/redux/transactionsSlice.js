import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { userId, amount, reason, timestamp } = action.payload;
      console.log('addTransaction action:', action);
      state.transactions.push({
        id: uuidv4(),
        userId,
        amount,
        reason,
        timestamp: timestamp || new Date().toISOString(),
      });
    },
  },
});

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;