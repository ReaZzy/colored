import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import s from './index.module.css';
import { wrapper } from '../store/store';
import { RootState } from '../store/reducers/rootReducer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { setPosts } from '../store/reducers/post/actions';

const Post = dynamic(() => import('../componets/post/Post'));
const Navbar = dynamic(() => import('../componets/navbar/Navbar'));
const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));

const Index: NextPage<RootState> = () => {
  const posts = useSelector((state: RootState) => state.post.posts);
  return (
    <div>
      <Navbar />
      <div className={s.content}>
        <div className={s.center_block}>
          <div className={s.center_block__whatsnew}>
            <WhatsNew />
          </div>
          <div className={s.center_block__posts}>
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
  (store) => async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NGIzMDRiLTgwODAtNGYwYi1iYWQ1LWUwNzBhNmIwOWM0NiIsImxvZ2luIjoiUmVhWnp5RkFLRTEiLCJpYXQiOjE2MjkwNTQ0ODYsImV4cCI6MTYyOTE0MDg4Nn0.C4jwO2gJ91QqAabo6_1vkhBXFPjWTHkNk4PE1Qj0S-8';
    const res = await axios.get('http://localhost:4000/posts?page=1', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await store.dispatch(setPosts(res.data.posts));
    return '' as any;
  },
);

export default Index;
