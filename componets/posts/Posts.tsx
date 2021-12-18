import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import s from '../../pages/index.module.css';
import { getPosts } from '../../store/reducers/post/thunks';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonPreloader from '../skeletonPreloader/SkeletonPreloader';
import { useAppDispatch } from '../../hooks/redux';

const Post = dynamic(() => import('../post/Post'));

const Posts: React.FC<{}> = ({ posts }) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, []);
  return (
    <InfiniteScroll
      className={s.center_block__posts}
      dataLength={posts.posts.length}
      next={async () => {
        await setPage((prevState) => prevState + 1);
        await dispatch(await getPosts(page + 1));
      }}
      hasMore={posts.posts.length < posts.total}
      loader={<SkeletonPreloader rows={5} />}
      style={{ overflow: 'visible' }}
    >
      {posts.posts.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

Posts.displayName = 'Posts';
export default Posts;
