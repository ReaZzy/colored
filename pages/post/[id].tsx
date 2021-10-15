import Cookies from 'cookies';
import React from 'react';
import { user } from '../../store/reducers/auth/thunks';
import { NextThunkDispatch, wrapper, initializeStore } from '../../store/store';
import { setJwtToken } from '../../utils/setJwtToken';
import { getPost } from '../../store/reducers/post/thunks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { Context } from 'next-redux-wrapper';

const Post = () => {
  const post = useSelector((state: RootState) => state.post.currentPost);
  return (
    <div>
      <div>{post?.content}</div>
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
  return { props: { initialReduxState: store.getState() } };
};

export default Post;
