import React from 'react';
import s from './navbar.module.css';
import { IoIosAddCircleOutline } from '@react-icons/all-files/io/IoIosAddCircleOutline';
import { IoChatboxEllipsesOutline } from '@react-icons/all-files/io5/IoChatboxEllipsesOutline';
import { IoSearchOutline } from '@react-icons/all-files/io5/IoSearchOutline';
import { IoMdHeartEmpty } from '@react-icons/all-files/io/IoMdHeartEmpty';
import ColoredButton from '../coloredButton/ColoredButton';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducers/auth/thunks';
import { RootState } from '../../store/reducers/rootReducer';

interface IProps {}

const Navbar: React.FC<IProps> = React.memo(() => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = async () => {
    await dispatch(await logout());
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
        <img
          src={`http://localhost:4000/${user?.avatar}`}
          className={`${s.nav__img} ${s.nav__item}`}
          alt={'avatar'}
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
