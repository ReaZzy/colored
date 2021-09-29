import React, { ReactChild, ReactChildren, useState } from 'react';
import { getRandomColor } from '../../utils/getRandomColor';
import s from './coloredButton.module.css';

interface IProps {
  children: ReactChild | ReactChildren;
  height?: string;
  width?: string;
  className?: any;
  [key: string]: any;
}

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
