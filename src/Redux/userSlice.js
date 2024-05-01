import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: JSON.parse(localStorage.getItem('user')) || null, 
  },
  reducers: {
    login: (state, action) => {
      console.log('Login action dispatched with payload:', action.payload);
      state.value = action.payload; 
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      console.log('Logout action dispatched');
      state.value = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
