import { createSlice } from '@reduxjs/toolkit';
import { IUser, IUserState } from '../../../types/user';

const initialState: IUserState = {
  user: null,
  isLoggedIn: false
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: state => {
      state.user = null;
      state.isLoggedIn = false;
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: any) => state.auth.user;