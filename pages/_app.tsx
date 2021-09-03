import React from 'react';
import '../styles/index.css';
import { wrapper } from '../store/store';
import { AppProps } from 'next/app';
import Layout from '../componets/layout/Layout';

const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(WrappedApp);
