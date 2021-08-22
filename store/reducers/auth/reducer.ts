import { AuthActionTypes } from '../../../types/IRedux.types';

const initialState = {
  token: null as string | null,
  isAuth: false,
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
    default:
      return { ...state };
  }
};
