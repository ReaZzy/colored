import { IPosts } from '../../../types/IPosts.types';

export const setPosts = (posts: IPosts[]) =>
  ({
    type: 'post/SET_POSTS',
    payload: posts,
  } as const);

export const setPost = (post: IPosts) =>
  ({
    type: 'post/SET_POST',
    payload: post,
  } as const);
