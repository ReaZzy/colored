import React, { useState } from 'react';
import '../styles/index.css';
import { useStore } from '../store/store';
import { AppProps } from 'next/app';
import Layout from '../componets/layout/Layout';
import Modal from 'react-modal';
import { Router } from 'next/router';
import Preloader from '../componets/preloader/Preloader';
import { Provider } from 'react-redux';

Modal.setAppElement('#__next');
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  Router.events.on('routeChangeStart', () => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  });

  return (
    <Provider store={store}>
      <Layout>
        {isLoading ? <Preloader /> : <Component {...pageProps} />}
      </Layout>
    </Provider>
  );
};

export default App;
