import React, { useEffect } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import s from './index.module.css';
import { NextThunkDispatch, wrapper } from '../store/store';
import { RootState } from '../store/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setJwtToken } from '../utils/setJwtToken';
import { login } from '../store/reducers/auth/thunks';
import Cookies from 'cookies';
import { getPosts } from '../store/reducers/post/thunks';
import axios from 'axios';
import { instance } from '../store/reducers/api';

const Navbar = dynamic(() => import('../componets/navbar/Navbar'));
const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));
const Posts = dynamic(() => import('../componets/posts/Posts'));

const Index: NextPage<RootState> = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.auth);
  useEffect(() => {}, []);
  return (
    <div>
      <Navbar />
      <div className={s.content}>
        <button
          onClick={async () =>
            dispatch(await login('ReaZzyFAKE1', 'Nebela2005'))
          }
        >
          LOGIN 🔐
        </button>
        {isAuth && (
          <div className={s.center_block}>
            <div className={s.center_block__whatsnew}>
              <WhatsNew />
            </div>
            <Posts />
          </div>
        )}
      </div>
    </div>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, res, req }) => {
    const cookies = new Cookies(req, res);
    const dispatch = store.dispatch as NextThunkDispatch;
    const token = cookies.get('auth') || null;
    await dispatch(setJwtToken(token));
    instance.defaults.headers.common.Cookie = `auth=${token}`;
    token && (await dispatch(await getPosts(1)));
  },
);

export default Index;
