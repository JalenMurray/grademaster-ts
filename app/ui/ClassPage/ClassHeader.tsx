'use client';

import { AddCircleOutline, Delete, Edit } from '@mui/icons-material';
import OpenModalButton from '../OpenModalButton';
import { useClassContext } from '@/app/context/class';
import { AssignmentType } from '@/app/context/types';

export default function ClassHeader() {
  const { cls, isGuest, addAssignmentType } = useClassContext();

  return (
    <>
      <h1 className="text-5xl" style={{ color: cls.displayColor }}>
        {cls.code} <br /> <span className="text-3xl">{cls.name}</span>
      </h1>
      <h2 className="text-2xl">Actions</h2>
      <div className="mt-2 flex gap-3 w-full" data-test="actionButtons">
        <button className="btn btn-neutral">
          <Edit />
          Edit Class
        </button>
        <OpenModalButton
          modalId="new_assignment_type_modal"
          btnClasses="btn-success text-white"
          extraVariable={{ name: 'class', value: cls.id }}
        >
          <AddCircleOutline />
          New Assignment Type
        </OpenModalButton>
        {!isGuest && (
          <button className="btn btn-error text-white">
            <Delete /> Delete Class
          </button>
        )}
      </div>
    </>
  );
}
