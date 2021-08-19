import { PostActionTypes } from '../../../types/IRedux.types';
import { IPosts } from '../../../types/IPosts.types';

const initialState = {
  posts: [] as IPosts[],
  total: 0,
  isFetching: true,
};
type InitialStateType = typeof initialState;

export const postReducer = (
  state: InitialStateType = initialState,
  action: PostActionTypes,
): InitialStateType => {
  switch (action.type) {
    case 'post/SET_POST': {
      return { ...state, posts: [action.payload, ...state.posts] };
    }
    case 'post/SET_POSTS': {
      return { ...state, posts: [...action.payload] };
    }
    case 'post/SET_TOTAL': {
      return { ...state, total: action.payload };
    }
    case 'post/SET_FETCHING': {
      return { ...state, isFetching: action.payload };
    }
    default:
      return { ...state };
  }
};
