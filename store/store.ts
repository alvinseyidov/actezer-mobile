import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';

// Combine your reducers
const rootReducer = combineReducers({
  user: userSlice,
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  // Add this line to export AppDispatch

// Export the store as default
export default store;
