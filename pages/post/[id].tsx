/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { getPost } from '../../store/reducers/post/thunks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import Router from 'next/router';
import { createGssp } from '../../utils/gssp';

const Post = () => {
  const post = useSelector((state: RootState) => state.post.currentPost);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  useEffect(() => {
    !isAuth && Router.push('/');
  }, [isAuth]);
  return (
    <div>
      <img
        src={`http://localhost:4000/${post?.user.avatar}`}
        alt={`${post?.user.login}_avatar`}
      />
      <div>{post?.createdDate}</div>
      <div>{post?.content}</div>
      <div>
        {post?.comments?.map((comment, index) => {
          return (
            <div key={index}>
              <img
                src={`http://localhost:4000/${comment?.user.avatar}`}
                alt={`${post?.user.login}_avatar`}
              />
              <div>{comment.user.login}</div>
              <div>{comment.createdDate}</div>
              <div>{comment.content}</div>
            </div>
          );
        })}
      </div>
      <div>{post?.likes.length}</div>
    </div>
  );
};
export const getServerSideProps = createGssp(async (ctx, store, dispatch) => {
  await dispatch(await getPost(ctx.params.id as string));
  return { props: { initialReduxState: store.getState() } };
});

export default Post;
