import { IPosts } from '../../../types/IPosts.types';
import { PostActionTypes } from '../../../types/IRedux.types';


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
      return { ...state, posts: [...state.posts, ...action.payload] };
    }
    case 'post/SET_TOTAL': {
      return { ...state, total: action.payload };
    }
    case 'post/SET_FETCHING': {
      return { ...state, isFetching: action.payload };
    }
    case 'post/SET_DISLIKE': {
      const { user, id } = action.payload;
      if (!user) return { ...state };
      const candidate = state.posts.findIndex((post) => post.id === id);
      state.posts[candidate] = {
        ...state.posts[candidate],
        likes: state.posts[candidate].likes.filter((u) => u.id !== user.id),
      };
      return {
        ...state,
      };
    }
    case 'post/SET_LIKE': {
      const { user, id } = action.payload;
      if (!user) return { ...state };
      const candidate = state.posts.findIndex((post) => post.id === id);
      state.posts[candidate].likes.push(user);

      return {
        ...state,
      };
    }
    default:
      return { ...state };
  }
};
