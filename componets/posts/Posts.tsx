import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import s from '../../pages/index.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonPreloader from '../skeletonPreloader/SkeletonPreloader';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const Post = dynamic(() => import('../post/Post'));

const query = gql`
  query getAllPosts($page: Float!) {
    getAllPosts(page: $page) {
      posts {
        content
        color
        createdDate
        user {
          avatar
          login
          createdDate
        }
      }
      total
    }
  }
`;
const Posts: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, fetchMore, loading } = useQuery(query, {
    variables: { page: 1 },
  });
  const handleNextPage = async () => {
    await setPage((prev) => prev + 1);
    await fetchMore({
      variables: { page: page + 1 },
    });
  };

  useEffect(() => {
    setPage(1);
  }, []);
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
