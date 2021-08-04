import React, { ReactChild, ReactChildren, useState } from 'react';
import s from './coloredButton.module.css';

interface IProps {
  children: ReactChild | ReactChildren;
  height?: string;
  width?: string;
  className?: any;
}
const ColoredButton: React.FC<IProps> = (
  { children, height, width, className },
  ...props
) => {
  const colorArray = [
    '#e24b4b',
    '#00B594',
    '#FFD93B',
    '#CF6848',
    '#FECECE',
    '#F8746B',
    '#FC6E51',
    '#DA4453',
    '#D770AD',
    '#A7BC7A',
    '#5D9CEC',
    '#4A89DC',
    '#4A566E',
  ];
  const [style, setStyle] = useState({
    color: '',
  });
  return (
    <button
      className={`${s.button} ${className || ''}`}
      onMouseEnter={() => {
        setStyle({
          ...style,
          color: colorArray[Math.ceil(Math.random() * colorArray.length)],
        });
      }}
      onMouseLeave={() => {
        setStyle({
          ...style,
          color: 'black',
        });
      }}
      style={{ ...style, height, width }}
    >
      {children}
    </button>
  );
};

export default ColoredButton;
