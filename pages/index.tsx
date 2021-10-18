import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import s from './index.module.css';
import { initializeStore } from '../store/store';
import { RootState } from '../store/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { setJwtToken } from '../utils/setJwtToken';
import Cookies from 'cookies';
import { getPosts } from '../store/reducers/post/thunks';
import { user } from '../store/reducers/auth/thunks';

const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));
const Posts = dynamic(() => import('../componets/posts/Posts'));
const Login = dynamic(() => import('../componets/login/Login'));

const Index: NextPage<RootState> = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  return (
    <div className={s.content}>
      <div className={s.center_block}>
        {isAuth && (
          <div className={s.center_block__whatsnew}>
            <WhatsNew />
          </div>
        )}
        {isAuth ? <Posts /> : <Login />}
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const store = initializeStore();
  const { dispatch } = store;
  const cookies = new Cookies(ctx.req, ctx.res);
  const token = cookies.get('auth') || null;
  const valid = await dispatch(setJwtToken(token));
  valid && (await dispatch(await user()));
  valid && (await dispatch(await getPosts(1)));

  return {
    props: {
      initialReduxState: store.getState(),
    },
  };
};

export default Index;
