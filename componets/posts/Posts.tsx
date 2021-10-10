import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import s from '../../pages/index.module.css';
import { getPosts } from '../../store/reducers/post/thunks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import SkeletonPreloader from '../skeletonPreloader/SkeletonPreloader';
const Post = dynamic(() => import('../post/Post'));

const Posts: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const { posts, total } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    setPage(1);
  }, []);
  return (
    <InfiniteScroll
      className={s.center_block__posts}
      dataLength={posts.length}
      next={async () => {
        await setPage((prevState) => prevState + 1);
        await dispatch(await getPosts(page + 1));
      }}
      hasMore={posts.length < total}
      loader={<SkeletonPreloader rows={5} />}
      style={{ overflow: 'visible' }}
    >
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

Posts.displayName = 'Posts';
export default Posts;
