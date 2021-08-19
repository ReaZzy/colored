import { instance } from '../api';
import { IPosts } from '../../../types/IPosts.types';

export const getPostsRequest = async (
  page: number = 1,
): Promise<{
  posts: IPosts[];
  total: number;
}> => {
  const res = await instance.get(`posts?page=${page}`);
  return res.data;
};
