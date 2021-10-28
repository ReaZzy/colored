import { createSlice } from '@reduxjs/toolkit';
import { IUsers } from '../../../types/IUsers.types';

const initialState = {
  token: null as string | null,
  isAuth: false,
  user: null as IUsers | null,
  loginError: null as string | null,
  registrationError: null as string | null,
};

const authReducer = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.loginError = null;
      state.registrationError = null;
    },
    setRegistrationError(state, action) {
      state.registrationError = action.payload;
      state.loginError = null;
    },
    setLoginError(state, action) {
      state.loginError = action.payload;
      state.registrationError = null;
    },
  },
});
export default authReducer.reducer;
export const {
  setIsAuth,
  setUser,
  setLoginError,
  setRegistrationError,
  setToken,
} = authReducer.actions;
