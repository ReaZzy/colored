import React, { ReactChild, ReactChildren, useState } from 'react';
import s from './coloredButton.module.css';
import { useRandomColor } from '../../hooks/useRandomColor';

interface IProps {
  children: ReactChild | ReactChildren;
  height?: string;
  width?: string;
  className?: any;
  [key: string]: any;
}

const ColoredButton: React.FC<IProps> = React.memo(
  ({ children, height, width, ...props }) => {
    const [color] = useRandomColor();
    const [style, setStyle] = useState({
      color: '',
    });
    return (
      <button
        className={`${s.button} ${props.className || ''}`}
        onMouseEnter={() => {
          setStyle({
            ...style,
            color: color,
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
