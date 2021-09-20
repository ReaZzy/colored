import { instance } from '../api';
import { IUsers } from '../../../types/IUsers.types';

export const loginRequest = async (
  find: string,
  password: string,
): Promise<{ access_token?: string; user?: IUsers; err?: string }> => {
  try {
    const res = await instance.post('/auth/login', {
      find,
      password,
    });
    return { access_token: res.data.access_token, user: res.data.user };
  } catch (err: any) {
    return { err: err.response.data.message };
  }
};

export const registerRequest = async (
  login: string,
  email: string,
  password: string,
): Promise<{ access_token?: string; err?: string }> => {
  try {
    const res = await instance.post('/auth/register', {
      login,
      email,
      password,
    });
    return { access_token: res.data.access_token };
  } catch (err: any) {
    return { err: err.response.data.message };
  }
};

export const logoutRequest = async (): Promise<undefined> => {
  const res = await instance.delete('/auth/logout');
  return;
};

export const profileRequest = async (): Promise<IUsers> => {
  const res = await instance.get('/profile');
  return res.data as IUsers;
};
