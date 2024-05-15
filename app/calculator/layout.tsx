import SideDrawer from '../ui/SideDrawer/SideDrawer';
import Navbar from '../ui/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <SideDrawer />
        <div className="drawer-content ml-4 max-w-screen">
          {/* <Navbar /> */}
          {children}
        </div>
      </div>
    </div>
  );
}
