import { reducer } from './reducers/rootReducer';
import { useMemo } from 'react';
import { configureStore, Store } from '@reduxjs/toolkit';

let store: Store | null | undefined;

const makeStore: any = (preloadedState = {}) =>
  configureStore({
    reducer,
    preloadedState,
  });

export const initializeStore = (preloadedState?: AppStore) => {
  let _store = store ?? makeStore(preloadedState);
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (!store) store = _store;
  return _store;
};

export function useStore(initialState?: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
