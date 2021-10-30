import React, { useEffect } from 'react';
import Router from 'next/router';
import s from '../../componets/post/post.module.css';
import Owner from '../../componets/post/owner/Owner';
import Avatar from '../../componets/avatar/Avatar';
import { getPost } from '../../store/reducers/post/thunks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { createGssp } from '../../utils/gssp';

const Post = () => {
  const post = useSelector((state: RootState) => state.post.currentPost);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    !isAuth && Router.push('/');
  }, [isAuth]);
  return (
    <div className={s.post}>
      <Owner
        color={post?.color}
        login={post?.user?.login}
        date={post?.createdDate}
        avatar={post?.user?.avatar}
      />

      <div>{post?.content}</div>
      <div>
        {post?.comments?.map((comment, index) => {
          return (
            <div key={index}>
              <Avatar url={comment?.user.avatar} />
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
