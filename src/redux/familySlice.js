import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parents: [
    { id: 1, name: 'Иван', email: 'ivan@mail.com', role: 'parent' },
    { id: 2, name: 'Мария', email: 'maria@mail.com', role: 'parent' }
  ],
  children: [
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
      const newId = Date.now(); // just a simple way to generate a unique ID for now
      if (role === 'parent') {
        state.parents.push({ id: newId, name, email, role });
      } else if (role === 'child') {
        state.children.push({ id: newId, name, email, role, balance: 0 });
      }
    },
    removeMember(state, action) {
      const { id, role } = action.payload;
      if (role === 'parent') {
        state.parents = state.parents.filter(p => p.id !== id);
      } else if (role === 'child') {
        state.children = state.children.filter(c => c.id !== id);
      }
    },
    topUpChildBalance(state, action) {
      const { childId, amount } = action.payload;
      const numericAmount = Number(amount);
      const child = state.children.find(c => c.id === childId);
      if (child && !isNaN(numericAmount)) {
        child.balance += numericAmount;
      }
    }
  }
});

export const { addMember, removeMember, topUpChildBalance } = familySlice.actions;
export default familySlice.reducer;