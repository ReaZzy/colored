import React from 'react';
import { NextPage } from 'next';
import s from './owner.module.css';
import { convertDate } from '../../../utils/convertDate';
import Color from 'color';
import Avatar from '../../avatar/Avatar';

interface IProps {
  date?: string;
  color?: any;
  avatar?: string;
  login?: string;
  id?: string;
  online?: boolean;
  [key: string]: any;
}
const Owner: NextPage<IProps> = React.memo(
  ({ date, color, avatar, login, id, online, ...props }) => {
    const postColor = Color(color);
    const fontColor = postColor.isDark() ? '#ffffff' : '#000000';

    return (
      <div
        style={{ backgroundColor: `${postColor}`, color: `${fontColor}` }}
        className={`${s.owner} ${props.className}`}
        {...props}
      >
        <Avatar
          url={avatar}
          id={id}
          online={online}
          className={`shadow ${s.owner__photo}`}
        />

        <div className={s.owner__login}>
          <div>{login}</div>
          <div className={s.postDate}>{convertDate(date)}</div>
        </div>
      </div>
    );
  },
);

Owner.displayName = 'Owner';
export default Owner;
