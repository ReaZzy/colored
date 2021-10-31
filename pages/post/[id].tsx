import React from 'react';
import { getPost } from '../../store/reducers/post/thunks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { createGssp } from '../../utils/gssp';
import Post from '../../componets/post/Post';

const PostPage = () => {
  const post = useSelector((state: RootState) => state.post.currentPost!);
  return (
    <>
      <Post post={post} />
    </>
  );
};
export const getServerSideProps = createGssp(async (ctx, store, dispatch) => {
  await dispatch(await getPost(ctx.params.id as string));
  if (store.getState().post.currentPost) {
    return { props: { initialReduxState: store.getState() } };
  } else {
    return { notFound: true };
  }
});

export default PostPage;
