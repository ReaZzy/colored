import { instance } from '../api';
import { IUsers } from '../../../types/IUsers.types';

export const loginRequest = async (
  find: string,
  password: string,
): Promise<{ access_token: string; user: IUsers }> => {
  const res = await instance.post('/auth/login', {
    find,
    password,
  });
  return { access_token: res.data.access_token, user: res.data.user };
};

export const registerRequest = async (
  login: string,
  email: string,
  password: string,
): Promise<string> => {
  const res = await instance.post('/auth/register', {
    login,
    email,
    password,
  });
  return res.data.access_token;
};

export const logoutRequest = async (): Promise<undefined> => {
  const res = await instance.delete('/auth/logout');
  return;
};

export const profileRequest = async (): Promise<IUsers> => {
  const res = await instance.get('/profile');
  return res.data as IUsers;
};
