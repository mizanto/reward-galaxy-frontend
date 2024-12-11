import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import familyReducer from './familySlice';
import goalsReducer from './goalsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    family: familyReducer,
    goals: goalsReducer
  }
});