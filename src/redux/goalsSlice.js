// src/redux/goalsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goals: [
    { id: 1, title: "Игрушечная машинка", price: 50, image: "https://via.placeholder.com/150" },
    { id: 2, title: "Книга", price: 30, image: "https://via.placeholder.com/150" },
    { id: 3, title: "Набор для рисования", price: 70, image: "https://via.placeholder.com/150" },
  ]
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal(state, action) {
      const { title, price, image } = action.payload;
      const newId = Date.now();
      state.goals.push({ id: newId, title, price, image });
    },
    removeGoal(state, action) {
      const { goalId } = action.payload;
      state.goals = state.goals.filter(goal => goal.id !== goalId);
    }
  }
});

export const { addGoal, removeGoal } = goalsSlice.actions;
export default goalsSlice.reducer;