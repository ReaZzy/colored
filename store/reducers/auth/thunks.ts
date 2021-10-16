import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { AuthActionTypes } from '../../../types/IRedux.types';
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  profileRequest,
} from './api';
import { setJwtToken } from '../../../utils/setJwtToken';
import { setLoginError, setRegistrationError, setUser } from './reducer';

export const login =
  (find: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, void, AuthActionTypes>) => {
    const { access_token, user, err } = await loginRequest(find, password);
    if (access_token || user) {
      dispatch(setJwtToken(access_token));
      dispatch(setUser(user!));
      dispatch(setLoginError(null));
    }
    err && dispatch(setLoginError(err));
  };

export const register =
  (login: string, email: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, void, AuthActionTypes>) => {
    const { access_token, err } = await registerRequest(login, email, password);
    if (access_token) {
      dispatch(setJwtToken(access_token));
      dispatch(setRegistrationError(null));
    }
    err && dispatch(setRegistrationError(err));
  };

export const logout =
  () => async (dispatch: ThunkDispatch<RootState, void, AuthActionTypes>) => {
    const token = await logoutRequest();
    dispatch(setJwtToken(token));
    dispatch(setUser(null));
  };

export const user =
  () => async (dispatch: ThunkDispatch<RootState, void, AuthActionTypes>) => {
    const profile = await profileRequest();
    dispatch(setUser(profile));
  };
