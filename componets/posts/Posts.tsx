import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import s from '../../pages/index.module.css';
import { getPosts } from '../../store/reducers/post/thunks';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonPreloader from '../skeletonPreloader/SkeletonPreloader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

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
      dataLength={posts.getAllPosts.posts.length}
      next={async () => {
        await setPage((prevState) => prevState + 1);
        await dispatch(await getPosts(page + 1));
      }}
      hasMore={posts.getAllPosts.posts.length < posts.getAllPosts.total}
      loader={<SkeletonPreloader rows={5} />}
      style={{ overflow: 'visible' }}
    >
      {posts.getAllPosts.posts.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

Posts.displayName = 'Posts';
export default Posts;
