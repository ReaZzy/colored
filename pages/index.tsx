import React from 'react';
import axios from 'axios';
import { IPosts } from '../types/IPosts.types';
import { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';

const Post = dynamic(() => import('../componets/post/Post'));
const Navbar = dynamic(() => import('../componets/navbar/Navbar'));

interface IProps {
  posts: IPosts[];
}

const Index = ({ posts }: IProps) => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          width: '60%',
          margin: '0 auto',
        }}
      >
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetStaticPropsContext) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmZjA1Yjc0LThhZTQtNDlkNS1iN2E3LTA3YzhmYTZkZjdiYyIsImxvZ2luIjoiUmVhWnp5RkFLRTEiLCJpYXQiOjE2Mjc2NzQzNDAsImV4cCI6MTYyNzc2MDc0MH0.EoW6zafXHvhVKrAbGXmEfYYnHFkDkGV6ZElvXhRPPMY';
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
