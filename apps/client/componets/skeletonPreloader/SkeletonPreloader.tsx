import React from 'react';
import s from './skeletonPreloader.module.css';

interface IProps {
  rows?: number;
  count?: number;
}

const SkeletonPreloader: React.FC<IProps> = React.memo(
  ({ rows, count = 1 }) => {
    return (
      <>
        {new Array(count).fill('').map((_, index) => {
          return (
            <div className={s.loading} key={index}>
              <div className={s.owner}>
                <div className={s.owner__avatar} />
                <div className={s.owner__info}>
                  <div className={s.info__name} />
                  <div className={s.info__date} />
                </div>
              </div>
              <div className={s.content}>
                {new Array(rows || Math.ceil(Math.random() * 10))
                  .fill('')
                  .map((_, index) => (
                    <span className={s.loading_gradient} key={index} />
                  ))}
              </div>
            </div>
          );
        })}
      </>
    );
  },
);

SkeletonPreloader.displayName = 'Loading';
export default SkeletonPreloader;
