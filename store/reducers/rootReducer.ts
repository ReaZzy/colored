import { combineReducers } from '@reduxjs/toolkit';
import postReducer from './post/reducer';
import authReducer from './auth/reducer';

export const reducer = combineReducers({
  post: postReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof reducer>;
