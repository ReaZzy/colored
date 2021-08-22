import React, { useEffect } from 'react';
import '../styles/index.css';
import { wrapper } from '../store/store';
import { AppProps } from 'next/app';
import { setJwtToken } from '../utils/setJwtToken';
import { useDispatch } from 'react-redux';

const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setJwtToken(localStorage?.getItem('jwtToken')));
  }, []);
  return <Component {...pageProps} />;
};
export default wrapper.withRedux(WrappedApp);
