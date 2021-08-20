import React from 'react';
import s from './navbar.module.css';
import { IoIosAddCircleOutline } from '@react-icons/all-files/io/IoIosAddCircleOutline';
import { IoChatboxEllipsesOutline } from '@react-icons/all-files/io5/IoChatboxEllipsesOutline';
import { IoSearchOutline } from '@react-icons/all-files/io5/IoSearchOutline';
import { IoMdHeartEmpty } from '@react-icons/all-files/io/IoMdHeartEmpty';
import ColoredButton from '../coloredButton/ColoredButton';

interface IProps {}

const Navbar: React.FC<IProps> = React.memo(() => {
  return (
    <nav className={s.nav}>
      <div className={s.nav__content}>
        <ColoredButton height={'26px'} width={'26px'}>
          <IoSearchOutline />
        </ColoredButton>
        <ColoredButton height={'26px'} width={'26px'}>
          <IoIosAddCircleOutline />
        </ColoredButton>
        <img
          src={
            'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
          }
          className={`${s.nav__img} ${s.nav__item}`}
          alt={'avatar'}
        />
        <ColoredButton height={'26px'} width={'26px'}>
          <IoMdHeartEmpty />
        </ColoredButton>
        <ColoredButton height={'26px'} width={'26px'}>
          <IoChatboxEllipsesOutline />
        </ColoredButton>
      </div>
    </nav>
  );
});
Navbar.displayName = 'Navbar';
export default Navbar;
