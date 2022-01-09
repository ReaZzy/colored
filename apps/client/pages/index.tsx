import React from 'react';
import s from './index.module.css';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Meta } from '../componets/meta/Meta';
import { addApolloState } from '../apollo/client';
import { createGssp } from '../utils/gssp';

const WhatsNew = dynamic(() => import('../componets/whatsNew/WhatsNew'));
const Posts = dynamic(() => import('../componets/posts/Posts'));

const Index: NextPage<any> = () => {
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

export const getServerSideProps = createGssp(async (ctx, client, store) => {
  return addApolloState(client, {
    props: {
      initialReduxState: store.getState(),
    },
  });
});

export default Index;
