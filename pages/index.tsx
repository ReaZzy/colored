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
  const client = initializeApollo({ headers: ctx?.req?.headers });

  const query = gql`
    query getAllPosts {
      getAllPosts(page: 1) {
        posts {
          content
        }
      }
    }
  `;
  // const { data } = await client.query({
  //   query: query,
  // });
  console.log(ctx.req.user);

  return addApolloState(client, {
    props: { initialReduxState: store.getState() },
  });
});

export default Index;
