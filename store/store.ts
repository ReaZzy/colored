import { useMemo } from 'react';
import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/rootReducer';

let store: Store | undefined;

function initStore(initialState: any) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

export const initializeStore = (preloadedState: Store = {} as Store) => {
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
  }
  if (typeof window === 'undefined') return _store;
  if (!store) store = _store as Store;
  return _store;
};

export function useStore(initialState: Store) {
  return useMemo(() => initializeStore(initialState) as Store, [initialState]);
}
