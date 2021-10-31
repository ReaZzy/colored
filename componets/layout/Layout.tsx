import React from 'react';
import dynamic from 'next/dynamic';
import { useAppSelector } from '../../hooks/redux';

const Navbar = dynamic(() => import('./../navbar/Navbar'));

const Layout: React.FC = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    <div className={'content'}>
      {isAuth && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
