import { configureStore } from '@reduxjs/toolkit';

// Auth
import authReducer from '../features/auth/authSlice'

// Item
import itemReducer from '../features/items/itemSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer
  },
});
