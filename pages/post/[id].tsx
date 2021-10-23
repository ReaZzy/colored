/* eslint-disable @next/next/no-img-element */
import Cookies from 'cookies';
import React, { useEffect } from 'react';
import { user } from '../../store/reducers/auth/thunks';
import { initializeStore } from '../../store/store';
import { setJwtToken } from '../../utils/setJwtToken';
import { getPost } from '../../store/reducers/post/thunks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import Router from 'next/router';

const Post = () => {
  const post = useSelector((state: RootState) => state.post.currentPost);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  useEffect(() => {
    !isAuth && Router.push('/');
  }, [isAuth]);
  return (
    <div>
      <img src={`http://localhost:4000/${post?.user.avatar}`} alt={`${post?.user.login}_avatar`}/>
      <div>{post?.createdDate}</div>
      <div>{post?.content}</div>
      <div>
        {post?.comments?.map((comment, index) => {
          return (
            <div key={index}>
              <img src={`http://localhost:4000/${comment?.user.avatar}`} alt={`${post?.user.login}_avatar`}/>
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

export const getServerSideProps = async (ctx: any) => {
  const store = initializeStore();
  const { dispatch } = store;

  const cookies = new Cookies(ctx.req, ctx.res);
  const token = cookies.get('auth') || null;

  if (!ctx.params?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const valid = await dispatch(setJwtToken(token));
  valid && (await dispatch(await user()));
  valid && (await dispatch(await getPost(ctx.params.id as string)));
  if (!valid) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { initialReduxState: store.getState() } };
};

export default Post;
