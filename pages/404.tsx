import Cookies from 'cookies';
import { GetStaticProps, NextPage } from 'next';
import { user } from '../store/reducers/auth/thunks';
import { initializeStore } from '../store/store';
import { setJwtToken } from '../utils/setJwtToken';

const Custom404: NextPage = () => {
  return <h1>404 - Page Not Found</h1>;
};

export default Custom404;
