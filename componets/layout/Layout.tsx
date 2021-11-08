import React from 'react';
import dynamic from 'next/dynamic';
import { useAppSelector } from '../../hooks/redux';

const Navbar = dynamic(() => import('./../navbar/Navbar'));

const Layout: React.FC = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <main className={'content'}>
      {isAuth && <Navbar />}
      {children}
    </main>
  );
};

export default Layout;
