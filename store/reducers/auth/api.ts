import { instance } from '../api';

export const loginRequest = async (
  find: string,
  password: string,
): Promise<string> => {
  const res = await instance.post('/auth/login', {
    find,
    password,
  });
  return res.data.access_token;
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
