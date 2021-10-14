import { IPosts } from '../../../types/IPosts.types';
import { IUsers } from '../../../types/IUsers.types';

export const setPosts = (posts: IPosts[]) =>
  ({
    type: 'post/SET_POSTS',
    payload: posts,
  } as const);
export const setCurrentPost = (posts: IPosts) =>
  ({
    type: 'post/SET_CURRENT_POST',
    payload: posts,
  } as const);

export const setPost = (post: IPosts) =>
  ({
    type: 'post/SET_POST',
    payload: post,
  } as const);

export const setFetchingPost = (fetching: boolean) =>
  ({
    type: 'post/SET_FETCHING',
    payload: fetching,
  } as const);

export const setTotalPost = (total: number) =>
  ({
    type: 'post/SET_TOTAL',
    payload: total,
  } as const);

export const setLike = (id: string, user: IUsers | null) =>
  ({
    type: 'post/SET_LIKE',
    payload: { id, user },
  } as const);

export const setDislike = (id: string, user: IUsers | null) =>
  ({
    type: 'post/SET_DISLIKE',
    payload: { id, user },
  } as const);
