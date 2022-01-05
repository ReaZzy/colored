import React from 'react';
import { NextPage } from 'next';
import s from './avatar.module.css';
import { useSubscription } from '@apollo/client';
import { ON_ONLINE } from '../../apollo/subscriptions/onOnline';

interface IProps {
  url?: string;
  alt_img?: string;
  id?: string;
  [key: string]: any;
}
const Avatar: NextPage<IProps> = React.memo(
  ({ url, alt_img, id, ...props }) => {
    const data = useSubscription(ON_ONLINE, { variables: { id } });
    console.log(data);
    return (
      <>
        <img
          src={url && `http://localhost:4000/${url}`}
          alt={alt_img || `avatar`}
          {...props}
          className={`${s.avatar} ${props?.className}`}
        />
        {data.loading ? 'Loading...' : data.data?.onOnline}
      </>
    );
  },
);

Avatar.displayName = 'Avatar';
export default Avatar;
