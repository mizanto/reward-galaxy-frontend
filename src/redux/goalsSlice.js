import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [
    {
      id: 1,
      title: "Игрушечная машинка",
      price: 80,
      image: "https://dmtoy.ru/upload/iblock/0d6/uozkz2tphsa16tdu6rdnwx7olyntu2t7/igrushechnaya-mashinka-muromets-avtomobil_samosval-polese-44112.jpeg",
      purchasedBy: null
    },
    {
      id: 2,
      title: "Книга",
      price: 30,
      image: "https://via.placeholder.com/150",
      purchasedBy: null
    },
    {
      id: 3,
      title: "Набор для рисования",
      price: 70,
      image: "https://colapsar.ru/upload/iblock/341/341ee44944632a20d6a1eb507e3447bb.jpg",
      purchasedBy: null
    },
    {
      id: 4,
      title: "Игрушечная машинка",
      price: 50,
      image: "https://via.placeholder.com/150",
      purchasedBy: null
    },
    {
      id: 5,
      title: "Книга",
      price: 10,
      image: "https://gollandia.com/wp-content/uploads/2019/01/books.gif",
      purchasedBy: null
    },
    {
      id: 6,
      title: "Аквапарк",
      price: 120,
      image: "https://xpresent.ru/filecache/cache/a0508641720578d2e0180c8418fe5176.jpeg",
      purchasedBy: null
    },
  ]
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal(state, action) {
      const { title, price, image } = action.payload;
      if (title && price > 0) {
        state.items.push({ 
          id: uuidv4(), 
          title: title,
          price: price, 
          image: image,
          purchasedBy: null
        });
      }
    },
    removeGoal(state, action) {
      const goalId = action.payload;
      state.items = state.items.filter(goal => goal.id !== goalId);
    },
    purchaseGoal(state, action) {
      const { goalId, userId } = action.payload;
      const goal = state.items.find(goal => goal.id === goalId);
      if (goal && !goal.purchasedBy) {
        goal.purchasedBy = userId;
      }
    },
  }
});

export const { addGoal, removeGoal, purchaseGoal } = goalsSlice.actions;
export default goalsSlice.reducer;