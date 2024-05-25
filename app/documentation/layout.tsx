import React from 'react';
import SideDrawer from '../ui/Documentation/SideDrawer';
import NoAuthNavBar from '../ui/NoAuthNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="documentation-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col px-4">
        <NoAuthNavBar />
        <div className="max-w-[60rem] mb-24">{children}</div>
      </div>
      <SideDrawer />
    </div>
  );
}
