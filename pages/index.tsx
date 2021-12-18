import React, { PropsWithChildren } from 'react';
import s from './index.module.css';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import gql from 'graphql-tag';
import { Meta } from '../componets/meta/Meta';
import { addApolloState } from '../apollo/client';
import { createGssp } from '../utils/gssp';
import { IPosts } from '../types/IPosts.types';

const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));
const Posts = dynamic(() => import('../componets/posts/Posts'));

const Index: NextPage<any> = ({ posts }) => {
  return (
    <div className={s.content}>
      <Meta />
      <div className={s.center_block}>
        <div className={s.center_block__whatsnew}>
          <WhatsNew />
        </div>

        <Posts posts={posts} />
      </div>
    </div>
  );
};

export const getServerSideProps = createGssp(
  async (ctx, store, client, dispatch) => {
    const query = gql`
      query getAllPosts {
        getAllPosts(page: 1) {
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
    type IGetAllPosts = { getAllPosts: { total: number; posts: IPosts } };
    const { data } = await client!.query<IGetAllPosts>({
      query: query,
    });

    return addApolloState(client!, {
      props: {
        initialReduxState: store.getState(),
        posts: data.getAllPosts,
      },
    });
  },
);

export default Index;
