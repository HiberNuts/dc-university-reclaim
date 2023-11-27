import React from 'react';
import { useLocation } from 'react-router-dom';
import { SideNav } from '../SideNav/SideNav';
import { TopBar } from '../TopBar/TopBar';

const Layout = ({ children }) => {
  const location = useLocation();
  const showNav = location.pathname !== '/login';

  return (
    <div className="Layout">
      {showNav && <SideNav />}
      <div className="Layout1">
        {showNav && <TopBar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
