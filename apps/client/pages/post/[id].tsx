import React from 'react';
import s from './post.module.css';
import { createGssp } from '../../utils/gssp';
import Post from '../../componets/post/Post';
import { Back } from '../../componets/back/Back';
import { addApolloState } from '../../apollo/client';
import {
  GET_POST_BY_ID,
  IGET_POST_BY_ID,
} from '../../apollo/queries/getPostById';
import { NextPage } from 'next';
import { IPosts } from '../../types/IPosts.types';

const PostPage: NextPage<{ post: IPosts }> = ({ post }) => {
  return (
    <div>
      <Back />
      <div className={s.content}>
        <Post post={post} />
        {post.comments?.map((comment, index) => {
          return <div key={index}>{comment.content}</div>;
        })}
        <div className={s.sideBar} />
      </div>
    </div>
  );
};
export const getServerSideProps = createGssp(async (ctx, client, store) => {
  const post = await client.query<IGET_POST_BY_ID>({
    query: GET_POST_BY_ID,
    variables: { postId: ctx.params.id },
  });
  if (post?.data.getPostById) {
    return addApolloState(client, {
      props: {
        initialReduxState: store.getState(),
        title: post.data.getPostById.user.login,
        post: post.data.getPostById,
      },
    });
  } else {
    return { notFound: true };
  }
});

export default PostPage;
