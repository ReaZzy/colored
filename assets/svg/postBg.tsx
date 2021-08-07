import React from 'react';
import s from '../../componets/post/post.module.css';

interface IProps {
  color: string;
}
export const PostBgSvg: React.FC<IProps> = ({ color }) => {
  return (
    <svg
      className={s.postBg}
      fill={color}
      viewBox="0 0 290 221"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M46.8718 10C46.8718 4.47715 51.3489 0 56.8718 0H279.61C285.133 0 289.61 4.47715 289.61 10V211C289.61 216.523 285.133 221 279.61 221H10.3902C4.8674 221 0.390259 216.523 0.390259 211V153.5V94C0.390259 88.4771 4.86741 84 10.3903 84H36.8718C42.3946 84 46.8718 79.5229 46.8718 74V10Z" />
    </svg>
  );
};
