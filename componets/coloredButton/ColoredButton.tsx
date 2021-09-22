import React, { ReactChild, ReactChildren, useState } from 'react';
import s from './coloredButton.module.css';

interface IProps {
  children: ReactChild | ReactChildren;
  height?: string;
  width?: string;
  className?: any;
  [key: string]: any;
}

export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const ColoredButton: React.FC<IProps> = React.memo(
  ({ children, height, width, ...props }) => {
    const [style, setStyle] = useState({
      color: '',
    });
    return (
      <button
        className={`${s.button} ${props.className || ''}`}
        onMouseEnter={() => {
          setStyle({
            ...style,
            color: getRandomColor(),
          });
        }}
        onMouseLeave={() => {
          setStyle({
            ...style,
            color: 'black',
          });
        }}
        style={{ ...style, height, width }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default ColoredButton;
