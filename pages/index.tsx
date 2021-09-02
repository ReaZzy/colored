import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import s from './index.module.css';
import { NextThunkDispatch, wrapper } from '../store/store';
import { RootState } from '../store/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { setJwtToken } from '../utils/setJwtToken';
import Cookies from 'cookies';
import { getPosts } from '../store/reducers/post/thunks';

const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));
const Posts = dynamic(() => import('../componets/posts/Posts'));

const Index: NextPage<RootState> = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  return (
    <div className={s.content}>
      <div className={s.center_block}>
        <div className={s.center_block__whatsnew}>
          <WhatsNew />
        </div>
        {isAuth && <Posts />}
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, res, req }) => {
    const cookies = new Cookies(req, res);
    const dispatch = store.dispatch as NextThunkDispatch;
    const token = cookies.get('auth') || null;
    const valid = await dispatch(setJwtToken(token));

    if (valid) {
      await dispatch(await getPosts(1));
    } else {
      res.statusCode = 302;
      res.setHeader('Location', `/login`);
    }
  },
);

export default Index;
