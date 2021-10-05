import React, { useState } from 'react';
import '../styles/index.css';
import { wrapper } from '../store/store';
import { AppProps } from 'next/app';
import Layout from '../componets/layout/Layout';
import Modal from 'react-modal';
import { Router } from 'next/router';
import Preloader from '../componets/preloader/Preloader';

Modal.setAppElement('#__next');
const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  Router.events.on('routeChangeStart', () => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  });

  return (
    <Layout>{isLoading ? <Preloader /> : <Component {...pageProps} />}</Layout>
  );
};

export default wrapper.withRedux(WrappedApp);
