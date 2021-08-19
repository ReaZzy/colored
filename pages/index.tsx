import React, { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import s from './index.module.css';
import { NextThunkDispatch, wrapper } from '../store/store';
import { RootState } from '../store/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/reducers/post/thunks';

const Post = dynamic(() => import('../componets/post/Post'));
const Navbar = dynamic(() => import('../componets/navbar/Navbar'));
const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));

const Index: NextPage<RootState> = () => {
  const dispatch = useDispatch();
  const handleScroll = async (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      await dispatch(await getPosts(3));
    }
  };
  const posts = useSelector((state: RootState) => state.post.posts);
  return (
    <div>
      <Navbar />
      <div className={s.content}>
        <div className={s.center_block}>
          <div className={s.center_block__whatsnew}>
            <WhatsNew />
          </div>
          <div
            className={s.center_block__posts}
            onScroll={(e) => handleScroll(e)}
          >
            {posts?.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await getPosts(2));
  },
);

export default Index;
