import React from 'react';
import { IPosts } from '../../types/IPosts.types';
import s from './post.module.css';
import Color from 'color';
import ColoredButton from '../coloredButton/ColoredButton';
import { IoMdHeartEmpty } from '@react-icons/all-files/io/IoMdHeartEmpty';
import { IoMdHeart } from '@react-icons/all-files/io/IoMdHeart';
import { GoComment } from '@react-icons/all-files/go/GoComment';
import Link from 'next/link';
import { like, dislike } from '../../store/reducers/post/thunks';
import ReactTooltip from 'react-tooltip';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Avatar from '../avatar/Avatar';
import Owner from './owner/Owner';
import { useRandomColor } from '../../hooks/useRandomColor';

interface IProps {
  post: IPosts;
}

const Post: React.FC<IProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isLiked = post.likes?.some((u) => u.id === user?.id);
  const [randomColor] = useRandomColor();

  const handleClick = async () => {
    !isLiked
      ? await dispatch(like(post.id, user))
      : await dispatch(dislike(post.id, user));
  };

  const color = Color(post.color);

  return (
    <div className={s.post}>
      <div>
        <Owner
          color={post?.color}
          login={post?.user?.login}
          date={post?.createdDate}
          avatar={post?.user?.avatar}
        />
      </div>

      <div className={s.post__main}>
        <div className={s.post__content}>
          {post.content}
          <div className={s.post__images} />
        </div>
      </div>
      <div className={s.post__actions}>
        <a data-for={`${post.id}`} data-tip>
          <div className={s.post__actions__item}>
            <ColoredButton height={'25px'} width={'25px'} onClick={handleClick}>
              {isLiked ? <IoMdHeart color={'#EE3D48'} /> : <IoMdHeartEmpty />}
            </ColoredButton>

            {post.likes?.length}
          </div>
        </a>
        {post.likes?.length > 0 && (
          <ReactTooltip
            id={`${post.id}`}
            type="light"
            effect={'solid'}
            className={s.tooltip}
            backgroundColor={randomColor}
          >
            <div className={s.tooltip__body}>
              {post.likes.map((user) => {
                return (
                  <Avatar
                    url={user.avatar}
                    className={s.tooltip__item}
                    key={user.id}
                  />
                );
              })}
            </div>
          </ReactTooltip>
        )}

        <div className={s.post__actions__item}>
          <Link href={`/post/${post.id}`} as={`/post/${post.id}`}>
            <a>
              <ColoredButton height={'25px'} width={'25px'}>
                <GoComment />
              </ColoredButton>
            </a>
          </Link>
          {post.comments?.length}
        </div>
      </div>
      <div>
        {post.comments?.map((comment) => (
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
