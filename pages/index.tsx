import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import s from './index.module.css';
import { RootState } from '../store/reducers/rootReducer';
import { getPosts } from '../store/reducers/post/thunks';
import { useAppSelector } from '../hooks/redux';
import { createGssp } from '../utils/gssp';

const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));
const Posts = dynamic(() => import('../componets/posts/Posts'));
const Login = dynamic(() => import('../componets/login/Login'));

const Index: NextPage<RootState> = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
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

export const getServerSideProps = createGssp(async (ctx, store, dispatch) => {
  await dispatch(await getPosts(1));
  return { props: { initialReduxState: store.getState() } };
}, false);

export default Index;
