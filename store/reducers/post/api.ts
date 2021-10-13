import { IPosts } from '../../../types/IPosts.types';
import { instance } from '../api';

export const getPostsRequest = async (
  page: number = 1,
): Promise<{
  posts: IPosts[];
  total: number;
}> => {
  const res = await instance.get(`/posts?page=${page}`);
  return res.data;
};

export const getPostByIdRequest = async (id: string): Promise<IPosts> => {
  const res = await instance.get(`/posts/${id}`);
  return res.data;
};

export const setLikeRequest = async (id: string): Promise<IPosts> => {
  const res = await instance.put(`/posts/like/${id}`);
  return res.data;
};

export const setDislikeRequest = async (id: string): Promise<IPosts> => {
  const res = await instance.delete(`/posts/like/${id}`);
  return res.data;
};
