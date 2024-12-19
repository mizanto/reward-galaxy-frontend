import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getRewards } from '../api/rewardService';
import { parseRewardData } from '../utils/parser';

const initialState = {
  items: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null
};

export const fetchRewards = createAsyncThunk(
  'rewards/fetchRewards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRewards();
      return Array.isArray(data) ? data.map(parseRewardData) : [];
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
      return state;
    },
    removeReward(state, action) {
      const rewardId = action.payload;
      state.items = state.items.filter(reward => reward.id !== rewardId);
      return state;
    },
    purchaseReward(state, action) {
      const { rewardId, userId } = action.payload;
      const reward = state.items.find(reward => reward.id === rewardId);
      if (reward && !reward.purchasedBy) {
        reward.purchasedBy = userId;
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.status = 'succeeded';
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