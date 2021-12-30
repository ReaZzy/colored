import React, { useState } from 'react';
import '../styles/index.css';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { Router } from 'next/router';
import { useStore } from '../store/store';
import { useApollo } from '../apollo/client';
import { AppProps } from 'next/app';
import Layout from '../componets/layout/Layout';
import Modal from 'react-modal';
import Preloader from '../componets/preloader/Preloader';
import { Meta } from '../componets/meta/Meta';

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
        <Meta
          title={pageProps.title}
          image={pageProps.image}
          url={pageProps.url}
          description={pageProps.description}
        />
        <Layout>
          {isLoading ? <Preloader /> : <Component {...pageProps} />}
        </Layout>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
