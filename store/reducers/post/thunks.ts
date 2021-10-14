import { ThunkDispatch } from 'redux-thunk';
import { PostActionTypes } from '../../../types/IRedux.types';
import { RootState } from '../rootReducer';
import {
  setFetchingPost,
  setPosts,
  setTotalPost,
  setLike,
  setDislike,
} from './actions';
import {
  getPostsRequest,
  setDislikeRequest,
  setLikeRequest,
  getPostByIdRequest,
} from './api';
import { IUsers } from '../../../types/IUsers.types';
import { setCurrentPost } from './actions';

export const getPosts =
  (page?: number) =>
  async (dispatch: ThunkDispatch<RootState, void, PostActionTypes>) => {
    dispatch(setFetchingPost(true));
    const res = await getPostsRequest(page);
    dispatch(setPosts(res.posts));
    dispatch(setTotalPost(res.total ?? 0));
    dispatch(setFetchingPost(false));
  };

export const getPost =
  (id: string) =>
  async (dispatch: ThunkDispatch<RootState, void, PostActionTypes>) => {
    dispatch(setFetchingPost(true));
    const res = await getPostByIdRequest(id);
    dispatch(setCurrentPost(res));
    dispatch(setFetchingPost(false));
  };

export const like =
  (id: string, user: IUsers | null) =>
  async (dispatch: ThunkDispatch<RootState, void, PostActionTypes>) => {
    await setLikeRequest(id);
    dispatch(setLike(id, user));
  };

export const dislike =
  (id: string, user: IUsers | null) =>
  async (dispatch: ThunkDispatch<RootState, void, PostActionTypes>) => {
    await setDislikeRequest(id);
    dispatch(setDislike(id, user));
  };
