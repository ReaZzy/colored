import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { IPosts } from '../types/IPosts.types';
import { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';

const Post = dynamic(() => import('../componets/post/Post'));

interface IProps {
  posts: IPosts[];
}

const Index = ({ posts }: IProps) => {
  const [text, setText] = useState<string>('');
  const handleClick = () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmZjA1Yjc0LThhZTQtNDlkNS1iN2E3LTA3YzhmYTZkZjdiYyIsImxvZ2luIjoiUmVhWnp5RkFLRTEiLCJpYXQiOjE2Mjc2NzQzNDAsImV4cCI6MTYyNzc2MDc0MH0.EoW6zafXHvhVKrAbGXmEfYYnHFkDkGV6ZElvXhRPPMY';
    axios.post(
      'http://localhost:4000/posts',
      { content: text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };
  return (
    <div>
      Hello Next!
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => handleClick()}>POST</button>
      <Link href={'/hello'}>
        <a>Hello</a>
      </Link>
      <div>
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
  const res = await axios.get('http://localhost:4000/posts?page=7', {
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
