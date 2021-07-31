import React from 'react';
import { IPosts } from '../../types/IPosts.types';
import s from './post.module.css';

interface IProps {
  post: IPosts;
}

const Post: React.FC<IProps> = ({ post }) => {
  return (
    <div className={s.post}>
      <div>
        <div className={s.owner}>
          <img
            src={
              'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
            }
            alt={`${post.user.login}`}
            className={s.owner__photo}
          />
          <div className={s.owner__login}>{post.user.login}</div>
        </div>

        <div>
          <div>{post.content}</div>
        </div>
      </div>

      <div>
        {post.comments.map((comment) => (
          <div key={comment.id}>
            {comment.user.login}
            {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
