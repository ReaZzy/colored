import React from 'react';
import s from './index.module.css';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import gql from 'graphql-tag';
import { Meta } from '../componets/meta/Meta';
import { addApolloState, initializeApollo } from '../apollo/client';
import { RootState } from '../store/reducers/rootReducer';
import { createGssp } from '../utils/gssp';

const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));
const Posts = dynamic(() => import('../componets/posts/Posts'));

const Index: NextPage<RootState> = ({ posts }) => {
  console.log(posts);
  return (
    <div className={s.content}>
      <Meta />
      <div className={s.center_block}>
        <div className={s.center_block__whatsnew}>
          <WhatsNew />
        </div>
        <Posts />
      </div>
    </div>
  );
};

export const getServerSideProps = createGssp(async (ctx, store, dispatch) => {
  const apolloClient = initializeApollo();
  const query = gql`
    query getAllPosts {
      getAllPosts(page: 1) {
        posts {
          content
        }
      }
    }
  `;
  const abd = await apolloClient.query({
    query: query,
  });

  return addApolloState(apolloClient, {
    props: { initialReduxState: store.getState(), posts: abd },
  });
});

export default Index;
