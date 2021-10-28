import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import s from './index.module.css';
import { RootState } from '../store/reducers/rootReducer';
import { getPosts } from '../store/reducers/post/thunks';
import { createGssp } from '../utils/gssp';

const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));
const Posts = dynamic(() => import('../componets/posts/Posts'));

const Index: NextPage<RootState> = () => {
  return (
    <div className={s.content}>
      <div className={s.center_block}>
        <div className={s.center_block__whatsnew}>
          <WhatsNew />
        </div>
        <Posts />
      </div>
    </div>
  );
};

export const getServerSideProps = createGssp(async (ctx, store, dispatch) => {
  await dispatch(await getPosts(1));
  return { props: { initialReduxState: store.getState() } };
});

export default Index;
