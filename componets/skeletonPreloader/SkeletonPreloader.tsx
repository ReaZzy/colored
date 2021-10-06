import React from 'react';
import s from './skeletonPreloader.module.css';

interface IProps {
  rows: number;
}

const SkeletonPreloader: React.FC<IProps> = React.memo(({ rows }) => {
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
        {new Array(rows).fill('').map((_, index) => (
          <span className={s.loading_gradient} key={index} />
        ))}
      </div>
    </div>
  );
});

SkeletonPreloader.displayName = 'Loading';
export default SkeletonPreloader;
