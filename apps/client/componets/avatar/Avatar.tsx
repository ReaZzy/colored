import React from 'react';
import { NextPage } from 'next';
import s from './avatar.module.css';

interface IProps {
  url?: string;
  alt_img?: string;
  [key: string]: any;
}
const Avatar: NextPage<IProps> = React.memo(({ url, alt_img, ...props }) => {
  return (
    <img
      src={url && `http://localhost:4000/${url}`}
      alt={alt_img || `avatar`}
      {...props}
      className={`${s.avatar} ${props?.className}`}
    />
  );
});

Avatar.displayName = 'Avatar';
export default Avatar;
