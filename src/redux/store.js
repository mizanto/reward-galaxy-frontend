import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './userSlice';
import familyReducer from './familySlice';
import goalsReducer from './goalsSlice';
import transactionsReducer from './transactionsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    family: familyReducer,
    goals: goalsReducer,
    transactions: transactionsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});