import React from 'react';
import { IPosts } from '../../types/IPosts.types';

interface IProps {
  post: IPosts;
}

const Post: React.FC<IProps> = ({ post }) => {
  return (
    <div>
      <div>
        <div>
          <img
            src={
              'https://lh3.googleusercontent.com/proxy/PQnczxJk9X514Y4qjdqKMPIIUBwbjdBgBCjGoyMuB8dptAx4SXqtVK-YHjrTjVfc6XOc6Hp6zmyh1q8RtJ2mZzE_bm_xm94aUzcPB_8YEzwc'
            }
            alt={`${post.user.login}`}
          />
          <div>{post.user.login}</div>
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
