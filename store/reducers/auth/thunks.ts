import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { AuthActionTypes } from '../../../types/IRedux.types';
import { loginRequest, registerRequest } from './api';
import { setJwtToken } from '../../../utils/setJwtToken';

export const login =
  (find: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, void, AuthActionTypes>) => {
    const token = await loginRequest(find, password);
    dispatch(setJwtToken(token));
  };

export const register =
  (login: string, email: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, void, AuthActionTypes>) => {
    const token = await registerRequest(login, email, password);
    dispatch(setJwtToken(token));
  };
