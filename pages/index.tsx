import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import s from './index.module.css';
import { NextThunkDispatch, wrapper } from '../store/store';
import { RootState } from '../store/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/reducers/post/thunks';
import InfiniteScroll from 'react-infinite-scroll-component';

const Post = dynamic(() => import('../componets/post/Post'));
const Navbar = dynamic(() => import('../componets/navbar/Navbar'));
const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));

const Index: NextPage<RootState> = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const { posts, total } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={s.content}>
        <div className={s.center_block}>
          <div className={s.center_block__whatsnew}>
            <WhatsNew />
          </div>
          <InfiniteScroll
            className={s.center_block__posts}
            dataLength={posts.length}
            next={async () => {
              await setPage((prevState) => prevState + 1);
              await dispatch(await getPosts(page + 1));
            }}
            hasMore={posts.length < total}
            loader={<h4>Loading...</h4>}
          >
            {posts?.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await getPosts(1));
  },
);

export default Index;
