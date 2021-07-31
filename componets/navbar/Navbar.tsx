import React from 'react';
import s from './navbar.module.css';
import { BiHeart, BiSearch } from 'react-icons/bi';
import {
  IoChatboxEllipsesOutline,
  IoIosAddCircleOutline,
} from 'react-icons/all';

interface iProps {}

const Navbar: React.FC<iProps> = () => {
  return (
    <nav className={s.nav}>
      <div className={s.nav__content}>
        <IoIosAddCircleOutline className={s.nav__item} />
        <BiSearch className={s.nav__item} />
        <img
          src={
            'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
          }
          className={s.nav__img}
          alt={'avatar'}
        />
        <BiHeart className={s.nav__item} />
        <IoChatboxEllipsesOutline className={s.nav__item} />
      </div>
    </nav>
  );
};

export default Navbar;
