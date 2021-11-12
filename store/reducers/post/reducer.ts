import { createSlice } from '@reduxjs/toolkit';
import { IPosts } from '../../../types/IPosts.types';

const initialState = {
  posts: [] as IPosts[],
  currentPost: null as IPosts | null,
  total: 0,
  isFetching: true,
};
const postReducer = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    setPost(state, action) {
      state.posts.unshift(action.payload);
      state.currentPost = null;
    },
    setPosts(state, action) {
      state.posts = state.posts.concat(action.payload);
      state.currentPost = null;
    },
    initPosts(state, action) {
      state.posts = action.payload;
      state.currentPost = null;
    },
    setFetchingPost(state, action) {
      state.isFetching = action.payload;
    },
    setTotalPost(state, action) {
      state.total = action.payload;
    },
    setCurrentPost(state, action) {
      state.currentPost = action.payload;
      state.posts = [];
    },
    setLike(state, action) {
      const { user, id } = action.payload;

      if (state.currentPost) {
        state.currentPost.likes.push(user);
      } else {
        const candidate = state.posts.findIndex((post) => post.id === id);
        state.posts[candidate].likes.push(user);
      }
    },
    setDislike(state, action) {
      const { user, id } = action.payload;
      if (state.currentPost) {
        state.currentPost = {
          ...state.currentPost,
          likes: state.currentPost.likes.filter((u) => u.id !== user.id),
        };
      } else {
        const candidate = state.posts.findIndex((post) => post.id === id);
        state.posts[candidate] = {
          ...state.posts[candidate],
          likes: state.posts[candidate].likes.filter((u) => u.id !== user.id),
        };
      }
    },
  },
});

export default postReducer.reducer;
export const {
  setDislike,
  setLike,
  setCurrentPost,
  setFetchingPost,
  setPost,
  setPosts,
  setTotalPost,
  initPosts,
} = postReducer.actions;
