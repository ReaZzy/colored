import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { AuthActionTypes } from '../../../types/IRedux.types';
import { loginRequest } from './api';
import { setJwtToken } from '../../../utils/setJwtToken';

export const login =
  (find: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, void, AuthActionTypes>) => {
    const token = await loginRequest(find, password);
    dispatch(setJwtToken(token));
  };
