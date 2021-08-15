import { PostActionTypes } from '../../../types/IRedux.types';
import { IPosts } from '../../../types/IPosts.types';

const initialState = {
  posts: [] as IPosts[],
};
type InitialStateType = typeof initialState;

export const postReducer = (
  state: InitialStateType = initialState,
  action: PostActionTypes,
): InitialStateType => {
  switch (action.type) {
    case 'post/SET_POST': {
      return { ...state, posts: [...state.posts, action.payload] };
    }
    case 'post/SET_POSTS': {
      return { ...state, posts: [...action.payload] };
    }
    default:
      return { ...state };
  }
};
