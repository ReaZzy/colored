import React from 'react';
import s from './post.module.css';
import { getPost } from '../../store/reducers/post/thunks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { createGssp } from '../../utils/gssp';
import Post from '../../componets/post/Post';
import { Back } from '../../componets/back/Back';

const PostPage = () => {
  const post = useSelector((state: RootState) => state.post.currentPost!);
  return (
    <div>
      <Back />
      <div className={s.content}>
        <Post post={post} />
        {post.comments?.map((comment, index) => {
          return <div key={index}>{comment.content}</div>;
        })}
        <div className={s.sideBar}></div>
      </div>
    </div>
  );
};
export const getServerSideProps = createGssp(async (ctx, store, dispatch) => {
  await dispatch(await getPost(ctx.params.id as string));
  if (store.getState().post.currentPost) {
    return {
      props: {
        initialReduxState: store.getState(),
        title: store.getState().post.currentPost.user.login,
      },
    };
  } else {
    return { notFound: true };
  }
});

export default PostPage;
