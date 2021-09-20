import { IUsers } from '../../../types/IUsers.types';
export const setToken = (payload: string | null) =>
  ({
    type: 'auth/SET_TOKEN',
    payload,
  } as const);

export const setIsAuth = (payload: boolean) =>
  ({
    type: 'auth/SET_ISAUTH',
    payload,
  } as const);

export const setUser = (payload: IUsers | null) =>
  ({
    type: 'auth/SET_USER',
    payload,
  } as const);

export const setRegistrationError = (payload: string | null) =>
  ({
    type: 'auth/SET_REGISTRATION_ERROR',
    payload,
  } as const);
export const setLoginError = (payload: string | null) =>
  ({
    type: 'auth/SET_LOGIN_ERROR',
    payload,
  } as const);
