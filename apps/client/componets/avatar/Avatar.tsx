import React, { useEffect } from 'react';
import { NextPage } from 'next';
import s from './avatar.module.css';
import { useQuery } from '@apollo/client';
import { ON_ONLINE } from '../../apollo/subscriptions/onOnline';
import { GET_PROFILE } from '../../apollo/queries/getProfile';

interface IProps {
  url?: string;
  alt_img?: string;
  id?: string;
  online?: boolean;
  [key: string]: any;
}
const Avatar: NextPage<IProps> = React.memo(
  ({ url, alt_img, id, online, ...props }) => {
    const { data, loading, subscribeToMore } = useQuery(GET_PROFILE, {
      variables: { id },
    });

    useEffect(() => {
      const onOnline = subscribeToMore({
        document: ON_ONLINE,
        variables: { id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const isOnline = subscriptionData.data.onOnline;

          return {
            getProfile: {
              ...prev.getProfile,
              online: isOnline,
            },
          };
        },
      });
      return () => {
        onOnline();
      };
    }, [subscribeToMore]);

    return (
      <div className={s.avatar__body}>
        <img
          src={
            loading ? '' : `http://localhost:4000/${data?.getProfile?.avatar}`
          }
          alt={alt_img || `avatar`}
          {...props}
          className={`${s.avatar} ${props?.className}`}
        />
        <circle
          className={`${s.status} ${
            !loading && data.getProfile.online ? s.online : s.offline
          } `}
        />
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
export default Avatar;
