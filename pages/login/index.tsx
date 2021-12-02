import React from 'react';
import Login from '../../componets/login/Login';
import { createGssp } from '../../utils/gssp';

const Index = () => {
  return <Login />;
};

export const getServerSideProps = createGssp(
  async (ctx, store, dispatch) => {
    if (store.getState().auth.isAuth)
      return { redirect: { destination: '/', permanent: false } };

    return { props: { initialReduxState: store.getState() } };
  },
  false,
  true,
);

Index.displayName = 'Login';
export default Index;
