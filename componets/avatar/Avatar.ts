import { NextPage } from 'next';
import React from 'react';

interface IProps {
  url: string;
  alt_img?: string;
  [key: string]: any;
}
const Avatar: NextPage<IProps> = React.memo(() => {
  return <img src={`http://localhost:4000/${url}`} alt={alt_img || `avatar`} />;
});

Avatar.displayName = 'Avatar';
export default Avatar;
