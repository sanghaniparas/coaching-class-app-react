import React, { useState } from 'react';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export const Layout = ({ children }) => {
  const [sidebar, setsidebar] = useState(false);
  const sidebarToggle = () => {
    return setsidebar(!sidebar);
  };
  const sidebarClose = () => {
    setsidebar(false);
  };
  return (
    <div className={`a-layout ${sidebar ? 'open' : ''}`}>
      <Sidebar sidebarClose={sidebarClose} />
      <div className="a-dashboard-fullwidth">
        <Header sidebarToggle={sidebarToggle} />
        <div className="a-dashboard-body">{children}</div>
      </div>
    </div>
  );
};
