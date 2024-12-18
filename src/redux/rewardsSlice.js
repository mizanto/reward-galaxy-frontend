import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getRewards } from '../api/rewardService';
import { parseRewardData } from '../utils/parser';

const initialState = {
  items: []
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
      state.items.push(action.payload);
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
        const rewardsData = action.payload;
        console.log('Rewards data:', rewardsData);
        let rewards = [];
        if (Array.isArray(rewardsData)) {
          rewards = rewardsData.map(reward => parseRewardData(reward));
        } 
        console.log('Rewards:', rewards);
        state.items = rewards;
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addReward, removeReward, purchaseReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;