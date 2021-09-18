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
import { setUser } from './actions';

export const login =
  (find: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, void, AuthActionTypes>) => {
    const { access_token, user } = await loginRequest(find, password);
    dispatch(setJwtToken(access_token));
    dispatch(setUser(user));
  };

export const register =
  (login: string, email: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, void, AuthActionTypes>) => {
    const token = await registerRequest(login, email, password);
    dispatch(setJwtToken(token));
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
