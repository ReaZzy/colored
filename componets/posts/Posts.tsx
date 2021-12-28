import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import s from '../../pages/index.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonPreloader from '../skeletonPreloader/SkeletonPreloader';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { GET_POST_SUBSCRIPTION } from '../../apollo/subscriptions/getPostSubsciption';
import { GET_ALL_POSTS } from '../../apollo/queries/getAllPosts';

const Post = dynamic(() => import('../post/Post'));

const Posts: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, fetchMore, loading, subscribeToMore } = useQuery(
    GET_ALL_POSTS,
    {
      variables: { page: 1 },
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    const postsSubscription = subscribeToMore({
      document: GET_POST_SUBSCRIPTION,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newPost = subscriptionData.data.getPostSubscription;

        return {
          getAllPosts: {
            posts: [newPost, ...prev.getAllPosts.posts],
            total: prev.getAllPosts.total + 1,
          },
        };
      },
    });
    return () => {
      postsSubscription();
    };
  }, [subscribeToMore]);

  const handleNextPage = async () => {
    await setPage((prev) => prev + 1);
    await fetchMore({
      variables: { page: page + 1, isFetchMore: true },
    });
  };

  return (
    <div>
      {loading ? (
        <SkeletonPreloader count={10} />
      ) : (
        <InfiniteScroll
          className={s.center_block__posts}
          dataLength={data.getAllPosts.posts.length}
          next={handleNextPage}
          hasMore={data.getAllPosts.posts.length < data.getAllPosts.total}
          loader={<SkeletonPreloader />}
          style={{ overflow: 'visible' }}
        >
          {data.getAllPosts.posts.map((post: any) => (
            <Post key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

Posts.displayName = 'Posts';
export default Posts;
