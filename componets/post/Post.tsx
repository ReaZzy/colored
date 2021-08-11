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

const Post: React.FC<IProps> = ({ post }) => {
  const color = Color(post.color);
  const fontColor = color.isDark() ? '#fff' : '#000';

  return (
    <div className={s.post}>
      <div>
        <div className={s.owner}>
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
        <div>
          <div className={s.post__actions}>
            <ColoredButton
              className={s.whatsNew__button}
              height={'25px'}
              width={'25px'}
            >
              <IoMdHeartEmpty />
            </ColoredButton>
            <Link href={`post/${post.id}`}>
              <a>
                <ColoredButton
                  className={s.whatsNew__button}
                  height={'25px'}
                  width={'25px'}
                >
                  <GoComment />
                </ColoredButton>
              </a>
            </Link>
          </div>
          <div
            className={s.actions_bc}
            style={{ backgroundColor: `${color}`, color: `${fontColor}` }}
          />
        </div>

        <div
          className={s.post__content}
          style={{ backgroundColor: `${color}`, color: `${fontColor}` }}
        >
          {post.content}
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
