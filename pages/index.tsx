import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { IPosts } from '../types/IPosts.types';
import { GetStaticPropsContext } from 'next';

interface IProps {
  posts: IPosts[];
}

const Index = ({ posts }: IProps) => {
  return (
    <div>
      Hello Next!
      <Link href={'/hello'}>
        <a>Hello</a>
      </Link>
      {posts.map((post, index) => (
        <div key={index}>
          {post.user.login}
          <Link href={`/post/${post.id}`}>
            <a>{post.title}</a>
          </Link>
          <div>
            {post.comments.map((comment) => (
              <div key={comment.id}>
                {comment.user.login}
                {comment.content}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const res = await axios.get('http://localhost:4000/posts', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmZjA1Yjc0LThhZTQtNDlkNS1iN2E3LTA3YzhmYTZkZjdiYyIsImxvZ2luIjoiUmVhWnp5RkFLRTEiLCJpYXQiOjE2Mjc1MDAyOTQsImV4cCI6MTYyNzU4NjY5NH0.8r1UWbjtWHL-CRy2LuP0vp1fRSY68NhXjlOVfkgKdCY',
    },
  });
  return {
    props: {
      posts: [...res.data.posts],
    },
  };
};

export default Index;
