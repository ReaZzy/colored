import React from 'react';
import { IPosts } from '../../types/IPosts.types';
import s from './post.module.css';
import Color from 'color';
import ColoredButton from '../coloredButton/ColoredButton';
import { IoMdHeartEmpty } from '@react-icons/all-files/io/IoMdHeartEmpty';
import { GoComment } from '@react-icons/all-files/go/GoComment';
import Link from 'next/link';

interface IProps {
  post: IPosts;
}

const Post: React.FC<IProps> = React.memo(({ post }) => {
  const color = Color(post.color);
  const fontColor = color.isDark() ? '#fff' : '#000';

  return (
    <div className={s.post}>
      <div>
        <div
          className={s.owner}
          style={{ backgroundColor: `${color}`, color: `${fontColor}` }}
        >
          <img
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeGZMvntM86MXW_ddi6psTHg9z0hAB4LVA_w&usqp=CAU'
            }
            alt={`${post.user.login}`}
            className={`shadow ${s.owner__photo}`}
          />
          <div className={s.owner__login}>
            <div>{post.user.login}</div>
            <div className={s.postDate}>{post.createdDate}</div>
          </div>
        </div>
      </div>

      <div className={s.post__main}>
        <div className={s.post__content}>
          {post.content}
          <div className={s.post__images}>
            <img
              width={'100%'}
              src={
                'https://www.worldforestry.org/wp-content/uploads/2020/02/dan-otis-OYFHT4X5isg-unsplash-scaled.jpg'
              }
            />
            <img
              width={'100%'}
              src={
                'https://www.worldforestry.org/wp-content/uploads/2020/02/dan-otis-OYFHT4X5isg-unsplash-scaled.jpg'
              }
            />
            <img
              width={'100%'}
              src={
                'https://www.worldforestry.org/wp-content/uploads/2020/02/dan-otis-OYFHT4X5isg-unsplash-scaled.jpg'
              }
            />
            <img
              width={'100%'}
              src={
                'https://www.worldforestry.org/wp-content/uploads/2020/02/dan-otis-OYFHT4X5isg-unsplash-scaled.jpg'
              }
            />
          </div>
        </div>
      </div>
      <div className={s.post__actions}>
        <div className={s.post__actions__item}>
          <ColoredButton height={'25px'} width={'25px'}>
            <IoMdHeartEmpty />
          </ColoredButton>
          21
        </div>
        <div className={s.post__actions__item}>
          <Link href={`/post/${post.id}`}>
            <a>
              <ColoredButton height={'25px'} width={'25px'}>
                <GoComment />
              </ColoredButton>
            </a>
          </Link>
          32
        </div>
      </div>
      <div>
        {post.comments.map((comment) => (
          <div key={comment.id}>
            <span style={{ marginRight: '5px', color: `${color}` }}>
              {comment.user.login}
            </span>
            {comment.content}
            <div>
              {comment.replies.map((reply) => (
                <div key={reply.id} style={{ marginLeft: '5px' }}>
                  {reply.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
Post.displayName = 'Post';
export default Post;
