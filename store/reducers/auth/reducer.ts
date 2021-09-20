import { AuthActionTypes } from '../../../types/IRedux.types';
import { IUsers } from '../../../types/IUsers.types';

const initialState = {
  token: null as string | null,
  isAuth: false,
  user: null as IUsers | null,
  loginError: null as string | null,
  registrationError: null as string | null,
};
type InitialStateType = typeof initialState;
export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionTypes,
) => {
  switch (action.type) {
    case 'auth/SET_ISAUTH':
      return { ...state, isAuth: action.payload };
    case 'auth/SET_TOKEN':
      return { ...state, token: action.payload };
    case 'auth/SET_USER':
      return { ...state, user: action.payload };
    case 'auth/SET_REGISTRATION_ERROR':
      return { ...state, registrationError: action.payload };
    case 'auth/SET_LOGIN_ERROR':
      return { ...state, loginError: action.payload };
    default:
      return { ...state };
  }
};
