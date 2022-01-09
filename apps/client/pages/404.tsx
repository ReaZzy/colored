import React from 'react';
import { NextPage } from 'next';
import router from 'next/router';
import { Meta } from '../componets/meta/Meta';

const Custom404: NextPage = () => {
  return (
    <div>
      <Meta
        title={'404 - Page not found'}
        description={'This page cannot be found'}
      />
      <h1>404 - Page Not Found</h1>{' '}
      <button
        onClick={() => {
          router.back();
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Custom404;
