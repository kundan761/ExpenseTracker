import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the user slice

export default configureStore({
  reducer: {
    user: userReducer, // Add the user slice to the store
  },
});
