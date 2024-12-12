// src/redux/goalsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      title: "Игрушечная машинка",
      price: 80,
      image: "https://dmtoy.ru/upload/iblock/0d6/uozkz2tphsa16tdu6rdnwx7olyntu2t7/igrushechnaya-mashinka-muromets-avtomobil_samosval-polese-44112.jpeg",
    },
    {
      id: 2,
      title: "Книга",
      price: 30,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Набор для рисования",
      price: 70,
      image: "https://colapsar.ru/upload/iblock/341/341ee44944632a20d6a1eb507e3447bb.jpg",
    },
    {
      id: 4,
      title: "Игрушечная машинка",
      price: 50,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Книга",
      price: 10,
      image: "https://gollandia.com/wp-content/uploads/2019/01/books.gif",
    },
    {
      id: 6,
      title: "Аквапарк",
      price: 120,
      image: "https://xpresent.ru/filecache/cache/a0508641720578d2e0180c8418fe5176.jpeg",
    },
  ]
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal(state, action) {
      const { title, price, image } = action.payload;
      state.items.push({ 
        id: Date.now(), 
        title: title,
        price: price, 
        image: image
      });
    },
    removeGoal(state, action) {
      const goalId = action.payload;
      console.log("Removing goal with ID:", goalId);
      state.items = state.items.filter(goal => goal.id !== goalId);
    }
  }
});

export const { addGoal, removeGoal } = goalsSlice.actions;
export default goalsSlice.reducer;