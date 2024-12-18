import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { getRewards } from '../api/rewardService';

const initialState = {
  items: [
    // {
    //   id: 1,
    //   title: "Игрушечная машинка",
    //   price: 80,
    //   image: "https://dmtoy.ru/upload/iblock/0d6/uozkz2tphsa16tdu6rdnwx7olyntu2t7/igrushechnaya-mashinka-muromets-avtomobil_samosval-polese-44112.jpeg",
    //   purchasedBy: null
    // },
    // {
    //   id: 2,
    //   title: "Книга",
    //   price: 30,
    //   image: "https://via.placeholder.com/150",
    //   purchasedBy: null
    // },
    // {
    //   id: 3,
    //   title: "Набор для рисования",
    //   price: 70,
    //   image: "https://colapsar.ru/upload/iblock/341/341ee44944632a20d6a1eb507e3447bb.jpg",
    //   purchasedBy: null
    // },
    // {
    //   id: 4,
    //   title: "Игрушечная машинка",
    //   price: 50,
    //   image: "https://via.placeholder.com/150",
    //   purchasedBy: null
    // },
    // {
    //   id: 5,
    //   title: "Книга",
    //   price: 10,
    //   image: "https://gollandia.com/wp-content/uploads/2019/01/books.gif",
    //   purchasedBy: null
    // },
    // {
    //   id: 6,
    //   title: "Аквапарк",
    //   price: 120,
    //   image: "https://xpresent.ru/filecache/cache/a0508641720578d2e0180c8418fe5176.jpeg",
    //   purchasedBy: null
    // },
  ]
};

export const fetchRewards = createAsyncThunk(
  'rewards/fetchRewards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRewards();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Не удалось загрузить награды');
    }
  }
);

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    addReward(state, action) {
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
    removeReward(state, action) {
      const rewardId = action.payload;
      state.items = state.items.filter(reward => reward.id !== rewardId);
    },
    purchaseReward(state, action) {
      const { rewardId, userId } = action.payload;
      const reward = state.items.find(reward => reward.id === rewardId);
      if (reward && !reward.purchasedBy) {
        reward.purchasedBy = userId;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Fetched rewards:', action.payload);
        state.items = action.payload;
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addReward, removeReward, purchaseReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;