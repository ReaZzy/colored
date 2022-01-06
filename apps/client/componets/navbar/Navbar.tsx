import React from 'react';
import s from './navbar.module.css';
import { IoIosAddCircleOutline } from '@react-icons/all-files/io/IoIosAddCircleOutline';
import { IoChatboxEllipsesOutline } from '@react-icons/all-files/io5/IoChatboxEllipsesOutline';
import { IoSearchOutline } from '@react-icons/all-files/io5/IoSearchOutline';
import { IoMdHeartEmpty } from '@react-icons/all-files/io/IoMdHeartEmpty';
import ColoredButton from '../coloredButton/ColoredButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Avatar from '../avatar/Avatar';
import { useMutation } from '@apollo/client';
import router from 'next/router';
import { setIsAuth } from '../../store/reducers/auth/reducer';
import { LOGOUT } from '../../apollo/mutations/logout';

const Navbar: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [logoutMutate] = useMutation(LOGOUT);
  const handleLogout = async () => {
    await logoutMutate();
    await dispatch(setIsAuth(false));
    await router.push('/login');
  };

  return (
    <nav className={s.nav}>
      <div className={s.nav__content}>
        <ColoredButton height={'26px'} width={'26px'}>
          <IoSearchOutline />
        </ColoredButton>
        <ColoredButton height={'26px'} width={'26px'}>
          <IoIosAddCircleOutline />
        </ColoredButton>
        <Avatar
          url={user?.avatar}
          id={user?.id}
          online={user?.online}
          className={`${s.nav__img} ${s.nav__item}`}
          onClick={handleLogout}
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
