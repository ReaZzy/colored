import React from 'react';
import { IPosts } from '../../types/IPosts.types';
import s from './post.module.css';
import Color from 'color';
import ColoredButton from '../coloredButton/ColoredButton';
import { IoMdHeartEmpty } from '@react-icons/all-files/io/IoMdHeartEmpty';
import { IoMdHeart } from '@react-icons/all-files/io/IoMdHeart';
import { GoComment } from '@react-icons/all-files/go/GoComment';
import Link from 'next/link';
import { like } from '../../store/reducers/post/thunks';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { getRandomColor } from '../../utils/getRandomColor';
import { RootState } from '../../store/reducers/rootReducer';

interface IProps {
  post: IPosts;
}

const Post: React.FC<IProps> = ({ post }) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const color = Color(post.color);
  const fontColor = color.isDark() ? '#fff' : '#000';

  const convertDate = (inputFormat: string) => {
    const pad = (s: number) => {
      return s < 10 ? '0' + s : s;
    };
    const date = new Date(inputFormat);
    return [
      pad(date.getDate()),
      pad(date.getMonth() + 1),
      date.getFullYear(),
    ].join('.');
  };

  return (
    <div className={s.post}>
      <div>
        <div
          className={s.owner}
          style={{ backgroundColor: `${color}`, color: `${fontColor}` }}
        >
          <img
            src={
              `http://localhost:4000/${post.user.avatar}` ||
              'https://i.pinimg.com/280x280_RS/09/07/3a/09073a84815d6669d9f3104623ab143c.jpg'
            }
            alt={''}
            className={`shadow ${s.owner__photo}`}
          />
          <div className={s.owner__login}>
            <div>{post.user.login}</div>
            <div className={s.postDate}>{convertDate(post.createdDate)}</div>
          </div>
        </div>
      </div>

      <div className={s.post__main}>
        <div className={s.post__content}>
          {post.content}
          <div className={s.post__images}></div>
        </div>
      </div>
      <div className={s.post__actions}>
        <a data-for={`${post.id}`} data-tip>
          <div className={s.post__actions__item}>
            <ColoredButton
              height={'25px'}
              width={'25px'}
              onClick={() => {
                dispatch(like(post.id, user));
              }}
            >
              {post.likes.some((u) => u.id === user?.id) ? (
                <IoMdHeart color={'#EE3D48'} />
              ) : (
                <IoMdHeartEmpty />
              )}
            </ColoredButton>

            {post.likes.length}
          </div>
        </a>
        {post.likes.length > 0 && (
          <ReactTooltip
            id={`${post.id}`}
            type="light"
            effect={'solid'}
            className={s.tooltip}
            backgroundColor={getRandomColor()}
          >
            <div className={s.tooltip__body}>
              {post.likes.map((user) => {
                return (
                  <img
                    src={`http://localhost:4000/${user.avatar}`}
                    className={s.tooltip__item}
                  />
                );
              })}
            </div>
          </ReactTooltip>
        )}

        <div className={s.post__actions__item}>
          <Link href={`/post/${post.id}`}>
            <a>
              <ColoredButton height={'25px'} width={'25px'}>
                <GoComment />
              </ColoredButton>
            </a>
          </Link>
          {post.comments.length}
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
};
Post.displayName = 'Post';
export default Post;
