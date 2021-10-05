import React from 'react';
import s from './skeletonPreloader.module.css';

const SkeletonPreloader: React.FC = React.memo(() => {
  return (
    <div className={s.loading}>
      <div className={s.owner}>
        <div className={s.owner__avatar} />
        <div className={s.owner__info}>
          <div className={s.info__name} />
          <div className={s.info__date} />
        </div>
      </div>
      <div className={s.content}>
        <span className={s.loading_gradient}></span>
        <span className={s.loading_gradient}></span>
        <span className={s.loading_gradient}></span>
        <span className={s.loading_gradient}></span>
      </div>
    </div>
  );
});

SkeletonPreloader.displayName = 'Loading';
export default SkeletonPreloader;
