import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage or initialize as an empty array
const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push({
        ...action.payload,
        addedAt: new Date().toISOString(),
        quantity: 1, // Ensure initial quantity is set to 1
      });
      // Save updated state to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    deleteFromCart(state, action) {
      const newState = state.filter(item => item.id !== action.payload.id);
      // Save updated state to localStorage
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    },
    incrementQuantity(state, action) {
      const { payload } = action;
      const existingItem = state.find(item => item.id === payload);
      if (existingItem) {
        existingItem.quantity++;
      }
      // Save updated state to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decrementQuantity(state, action) {
      const { payload } = action;
      const existingItem = state.find(item => item.id === payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      }
      // Save updated state to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
