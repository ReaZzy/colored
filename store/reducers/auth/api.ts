import axios from 'axios';

export const loginRequest = async (
  find: string,
  password: string,
): Promise<string> => {
  const res = await axios.post('http://localhost:4000/auth/login', {
    find,
    password,
  });
  return res.data.access_token;
};
