import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './userSlice';
import familyReducer from './familySlice';
import rewardsReducer from './rewardsSlice';
import transactionsReducer from './transactionsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    family: familyReducer,
    rewards: rewardsReducer,
    transactions: transactionsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});