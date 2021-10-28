import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppSelector } from '../../hooks/redux';
import router from 'next/router';

const Navbar = dynamic(() => import('./../navbar/Navbar'));

const Layout: React.FC = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  useEffect(() => {
    !isAuth && router.push('/login');
  }, [isAuth]);
  return (
    <div className={'content'}>
      {isAuth && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
