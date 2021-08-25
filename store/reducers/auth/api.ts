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
