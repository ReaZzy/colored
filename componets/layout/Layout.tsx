import React from 'react';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./../navbar/Navbar'));

const Layout: React.FC = ({ children }) => {
  return (
    <div className={'content'}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
