import { NextPage } from 'next';
import Cookies from 'js-cookie';
import router from 'next/router';
import React from 'react';
import { useAppDispatch } from '../hooks/redux';
import { user } from '../store/reducers/auth/thunks';
import { setJwtToken } from '../utils/setJwtToken';

const Custom404: NextPage = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const token = Cookies.get('auth') || null;
    const valid = dispatch(setJwtToken(token));

    valid && dispatch(user());
    if (!valid) router.push('/login');
  }, []);

  return (
    <div>
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
