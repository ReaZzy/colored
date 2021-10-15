import { reducer, RootState } from './reducers/rootReducer';
import { AnyAction, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { useMemo } from 'react';

let store: any;
const makeStore: any = (preloadedState = {}) =>
  createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

export const initializeStore = (preloadedState?: any) => {
  let _store = store ?? makeStore(preloadedState);
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }
  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
