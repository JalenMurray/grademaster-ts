import SideDrawer from '../ui/SideDrawer/SideDrawer';
import Navbar from '../ui/Navbar';
import BaseModal from '../ui/BaseModal';
import NewSemesterForm from '../ui/Forms/NewSemesterForm';
import NewClassForm from '../ui/Forms/NewClassForm';
import NewAssignmentTypeForm from '../ui/Forms/NewAssignmentTypeForm';
import Providers from '../Providers';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <SideDrawer />
        <div className="drawer-content ml-4 max-w-screen">
          {/* <Navbar /> */}
          {children}
        </div>
        {/*
    Modals Placed Here so they are in center of screen.  Buttons to open are placed elsewhere
    */}
        <BaseModal id="new_semester_modal" otherProps="items-center">
          <NewSemesterForm />
        </BaseModal>
        <BaseModal id="new_class_modal" otherProps="items-center max-w-3xl">
          <NewClassForm />
        </BaseModal>
        <BaseModal id="new_assignment_type_modal" otherProps="items-center">
          <NewAssignmentTypeForm />
        </BaseModal>
      </div>
    </Providers>
  );
}
