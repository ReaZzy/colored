import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/reducers/rootReducer';
import { AnyAction } from 'redux';
import { setIsAuth, setToken } from '../store/reducers/auth/actions';

export const setJwtToken =
  (token?: string | null) =>
  (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('jwtToken', token);
      dispatch(setToken(token));
      dispatch(setIsAuth(true));
      return true;
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('jwtToken');
      dispatch(setToken(null));
      dispatch(setIsAuth(false));
      return false;
    }
  };
