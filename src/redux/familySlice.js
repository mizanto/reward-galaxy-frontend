import { createSlice, createSelector } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  members: [
    { id: 1, name: 'Иван', email: 'ivan@mail.com', role: 'parent' },
    { id: 2, name: 'Мария', email: 'maria@mail.com', role: 'parent' },
    { id: 3, name: 'Дима', email: 'dima@mail.com', role: 'child', balance: 10 },
    { id: 4, name: 'Аня', email: 'anya@mail.com', role: 'child', balance: 5 }
  ]
};

const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    addMember(state, action) {
      const { name, email, role } = action.payload;
      state.members.push({ 
        id: uuidv4(), 
        name: name, 
        email: email, 
        role: role, 
        balance: role === 'child' ? 0 : undefined
      });
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
  }
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