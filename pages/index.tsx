import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { IPosts } from '../types/IPosts.types';

const Index = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/posts', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzFjNTAxLTExMzQtNDliNy1hODMzLTdmZGMzN2UwZWY1ZSIsImxvZ2luIjoiUmVhWnp5RkFLRTEiLCJpYXQiOjE2Mjc0MTI5ODYsImV4cCI6MTYyNzQ5OTM4Nn0.mwASSi5tQJ0NyjifuZf_tRetXn-GHhJDA8B0CJdZfzM',
        },
      })
      .then((res) => setPosts(res.data.posts));
  }, []);
  return (
    <div>
      Hello Next!
      <Link href={'/hello'}>
        <a>Hello</a>
      </Link>
      {posts.map((post, index) => (
        <div key={index}>
          {post.user.login}
          <Link href={`/posts/${post.id}`}>
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

export default Index;
