import { combineReducers } from 'redux';
import { postReducer } from './post/reducer';
import { HYDRATE } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  post: postReducer,
});

export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};
export type RootState = ReturnType<typeof rootReducer>;
