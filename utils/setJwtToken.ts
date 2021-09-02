import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/reducers/rootReducer';
import { AnyAction } from 'redux';
import { setIsAuth, setToken } from '../store/reducers/auth/actions';
import { instance } from '../store/reducers/api';
import * as jwt from 'jsonwebtoken';
export const setJwtToken =
  (token?: string | null) =>
  (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    if (!!token) {
      try {
        if (jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!)) {
          instance.defaults.headers.common.Cookie = `auth=${token}`;
          instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          dispatch(setToken(token));
          dispatch(setIsAuth(true));
          return true;
        }
      } catch (e) {
        return false;
      }
    } else {
      delete instance.defaults.headers.common['Authorization'];
      dispatch(setToken(null));
      dispatch(setIsAuth(false));
      return false;
    }
  };
