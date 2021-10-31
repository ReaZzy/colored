import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../rootReducer';

import {
  getPostsRequest,
  setDislikeRequest,
  setLikeRequest,
  getPostByIdRequest,
} from './api';
import { IUsers } from '../../../types/IUsers.types';
import {
  setCurrentPost,
  setDislike,
  setFetchingPost,
  setLike,
  setPosts,
  setTotalPost,
} from './reducer';
import { AnyAction } from '@reduxjs/toolkit';

export const getPosts =
  (page?: number) =>
  async (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    dispatch(setFetchingPost(true));
    const res = await getPostsRequest(page);
    dispatch(setPosts(res.posts));
    dispatch(setTotalPost(res.total ?? 0));
    dispatch(setFetchingPost(false));
  };

export const getPost =
  (id: string) =>
  async (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    try {
      dispatch(setFetchingPost(true));
      const res = await getPostByIdRequest(id);
      dispatch(setCurrentPost(res));
      dispatch(setFetchingPost(false));
    } catch (e) {
      dispatch(setCurrentPost(null));
    }
  };

export const like =
  (id: string, user: IUsers | null) =>
  async (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    await setLikeRequest(id);
    dispatch(setLike({ id, user }));
  };

export const dislike =
  (id: string, user: IUsers | null) =>
  async (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    await setDislikeRequest(id);
    dispatch(setDislike({ id, user }));
  };
