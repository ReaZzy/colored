import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';

const Navbar = dynamic(() => import('./../navbar/Navbar'));

const Layout: React.FC = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return (
    <div className={'content'}>
      {isAuth && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
