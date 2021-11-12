import { NextPage } from 'next';
import Cookies from 'js-cookie';
import router from 'next/router';
import React from 'react';
import { useAppDispatch } from '../hooks/redux';
import { user } from '../store/reducers/auth/thunks';
import { setJwtToken } from '../utils/setJwtToken';
import { Meta } from '../componets/meta/Meta';

const Custom404: NextPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Meta title={'404 - Page not found'} />
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
