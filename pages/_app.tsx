import React from 'react';
import '../styles/index.css';
import { wrapper } from '../store/store';
import { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default wrapper.withRedux(App);
