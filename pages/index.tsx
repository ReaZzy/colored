import React, { useEffect } from 'react';
import axios from 'axios';
import { IPosts } from '../types/IPosts.types';
import { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import s from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../store/reducers/post/actions';
import { RootState } from '../store/reducers/rootReducer';
import { initializeStore } from '../store/store';

const Post = dynamic(() => import('../componets/post/Post'));
const Navbar = dynamic(() => import('../componets/navbar/Navbar'));
const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));

interface IProps {
  posts: IPosts[];
}

const Index = ({ posts }: IProps) => {
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

export const getServerSideProps = async (ctx: GetStaticPropsContext) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NGIzMDRiLTgwODAtNGYwYi1iYWQ1LWUwNzBhNmIwOWM0NiIsImxvZ2luIjoiUmVhWnp5RkFLRTEiLCJpYXQiOjE2Mjg5NjcyNTIsImV4cCI6MTYyOTA1MzY1Mn0.Ec7VD7Zyygz42jxoC9C4l5j24kRUwZexIze2acynMXE';
  const res = await axios.get('http://localhost:4000/posts?page=1', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      posts: [...res.data.posts],
    },
  };
};

export default Index;
