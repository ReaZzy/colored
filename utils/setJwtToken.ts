import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/reducers/rootReducer';
import { AnyAction } from 'redux';
import { setIsAuth, setToken } from '../store/reducers/auth/actions';
import { instance } from '../store/reducers/api';

export const setJwtToken =
  (token?: string | null) =>
  (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    if (!!token) {
      instance.defaults.headers.common.Cookie = `auth=${token}`;
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(setToken(token));
      dispatch(setIsAuth(true));
    } else {
      delete instance.defaults.headers.common['Authorization'];
      dispatch(setToken(null));
      dispatch(setIsAuth(false));
    }
  };
