'use client';

import { useContext, useEffect } from 'react';
import { ClassContext } from '../context/class';
import ClassHeader from '../ui/ClassPage/ClassHeader';
import GradeCalculator from '../ui/ClassPage/GradeCalculator';
import BaseModal from '../ui/BaseModal';
import NewSemesterForm from '../ui/Forms/NewSemesterForm';
import NewClassForm from '../ui/Forms/NewClassForm';
import NewAssignmentTypeForm from '../ui/Forms/NewAssignmentTypeForm';
import EditClassForm from '../ui/Forms/EditClassForm';

export default function Page() {
  const { createGuestClass } = useContext(ClassContext);

  useEffect(() => {
    createGuestClass();
  }, []);

  return (
    <div className="w-full min-h-[90vh] px-8">
      <div className="w-full h-full flex-grow pt-10">
        <ClassHeader />
        <GradeCalculator />
      </div>
      <BaseModal id="new_assignment_type_modal" otherProps="items-center">
        <NewAssignmentTypeForm guest />
      </BaseModal>
      <BaseModal id="edit_class_modal" otherProps="items-center">
        <EditClassForm />
      </BaseModal>
    </div>
  );
}
