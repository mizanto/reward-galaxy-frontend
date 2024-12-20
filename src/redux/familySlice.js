import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

import { getFamilyMembers } from '../api/familyService';
import { parseNewMemberData } from '../utils/parser';

const initialState = {
  members: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null
};

export const fetchFamilyMembers = createAsyncThunk(
  'family/fetchFamilyMembers',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFamilyMembers();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Не удалось загрузить членов семьи');
    }
  }
);

const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    addMember(state, action) {
      const newMember = parseNewMemberData(action.payload)
      state.members.push(newMember);
    },
    removeMember(state, action) {
      const id = action.payload;
      state.members = state.members.filter(member => member.id !== id);
    },
    topUpChildBalance(state, action) {
      const { childId, amount } = action.payload;
      const numericAmount = Number(amount);
      const child = state.members.find(m => m.id === childId && m.role === 'child');
      if (child && !isNaN(numericAmount)) {
        child.balance += numericAmount;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilyMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFamilyMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Fetched members:', action.payload);
        state.members = action.payload;
      })
      .addCase(fetchFamilyMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export const selectParents = createSelector(
  (state) => state.family.members,
  (members) => members.filter((m) => m.role === 'parent')
);

export const selectChildren = createSelector(
  (state) => state.family.members,
  (members) => members.filter((m) => m.role === 'child')
);

export const { addMember, removeMember, topUpChildBalance } = familySlice.actions;
export default familySlice.reducer;