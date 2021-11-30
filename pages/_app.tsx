import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import '../styles/index.css';
import { useStore } from '../store/store';
import { AppProps } from 'next/app';
import Layout from '../componets/layout/Layout';
import Modal from 'react-modal';
import { Router } from 'next/router';
import Preloader from '../componets/preloader/Preloader';
import { Provider } from 'react-redux';
import { Meta } from '../componets/meta/Meta';
import { useApollo } from '../apollo/client';

Modal.setAppElement('#__next');
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const apolloClient = useApollo(pageProps);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  Router.events.on('routeChangeStart', () => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Meta title={pageProps.title} />
        <Layout>
          {isLoading ? <Preloader /> : <Component {...pageProps} />}
        </Layout>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
