import React from 'react';
import s from './preloader.module.css';

const Preloader = React.memo(() => {
  return (
    <img
      src={'https://v.fastcdn.co/u/430e104e/57768696-0-Paint-Roller-2.svg'}
    />
  );
});
Preloader.displayName = 'Preloader';
export default Preloader;
