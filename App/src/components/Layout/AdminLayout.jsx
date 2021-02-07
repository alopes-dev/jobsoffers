import React, { useEffect } from 'react';

import MainHeader from '../Navs/MainHeader';
import SideBarMenu from '../Navs/SideBar';
import MainPanel from '../Navs/MainPanel';

function AdminLayout(props) {
  useEffect(() => {
    const body = document.querySelector('body').classList;
    body.remove('bg-secondary-gradientn');
    body.add('background-dark');
  }, []);

  return (
    <div className="wrapper ">
      <MainHeader />
      <SideBarMenu />
      <MainPanel {...props} />
    </div>
  );
}
export default AdminLayout;
