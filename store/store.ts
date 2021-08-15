import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { reducer, RootState } from './reducers/rootReducer';
import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';

const makeStore: MakeStore<Store<RootState>> = (context: Context) =>
  createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
