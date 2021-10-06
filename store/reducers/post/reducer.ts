import { IPosts } from '../../../types/IPosts.types';
import { PostActionTypes } from '../../../types/IRedux.types';
import { IUsers } from '../../../types/IUsers.types';

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
    case 'post/SET_LIKE': {
      const { user, id } = action.payload;
      if (!user) return { ...state };
      const candidate = state.posts.map((post) => {
        if (post.id === id) {
          !post.likes.find((u) => u.id === user.id) && post.likes.push(user);
          return post;
        }
        return post;
      });

      return {
        ...state,
        posts: [...candidate],
      };
    }
    default:
      return { ...state };
  }
};
