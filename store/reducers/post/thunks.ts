import { ThunkDispatch } from 'redux-thunk';
import { PostActionTypes } from '../../../types/IRedux.types';
import { RootState } from '../rootReducer';
import { setFetchingPost, setPosts, setTotalPost } from './actions';
import { getPostsRequest } from './api';

export const getPosts =
  (page?: number) =>
  async (dispatch: ThunkDispatch<RootState, void, PostActionTypes>) => {
    dispatch(setFetchingPost(true));
    const res = await getPostsRequest(page);
    dispatch(setPosts(res.posts));
    dispatch(setTotalPost(res.total));
    dispatch(setFetchingPost(false));
  };
