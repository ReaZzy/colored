import React from 'react';
import '../styles/index.css';
import { Provider } from 'react-redux';
import { useStore } from '../store/store';

export default function App({ Component, pageProps }: any) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
