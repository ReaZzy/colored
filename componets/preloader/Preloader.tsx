import React from 'react';
import s from './preloader.module.css';

const Preloader = React.memo(() => {
  return (
    <div className={s.preloader}>
      <div className={s.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
});
Preloader.displayName = 'Preloader';
export default Preloader;
