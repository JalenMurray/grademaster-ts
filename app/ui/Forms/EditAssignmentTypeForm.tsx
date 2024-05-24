'use client';

import { useClassContext } from '@/app/context/class';
import { AssignmentType, EditAssignmentTypeInput } from '@/app/context/types';
import { CreateAssignmentType, createAssignmentType } from '@/app/lib/actions';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function EditAssignmentTypeForm({ at }: { at: AssignmentType }) {
  const { updateAssignmentType, isGuest } = useClassContext();

  function handleSubmit() {
    const modal = document.getElementById(`edit-${at.id}-modal`) as HTMLDialogElement;
    modal.close();
  }

  function guestUpdateAssignment(formData: FormData) {
    const toUpdate: EditAssignmentTypeInput = {
      name: formData.get('name').toString(),
      defaultName: formData.get('defaultName').toString(),
      maxScore: +formData.get('maxScore').toString(),
    };
    updateAssignmentType(at.id, toUpdate);
  }

  return (
    <form action={guestUpdateAssignment} onSubmit={handleSubmit} data-test="EditAssignmentTypeForm">
      <input className="hidden" name="classId" id="new_assignment_type_modal_class" />
      <h3 className="font-bold text-lg">Update Assignment Type</h3>
      <div className="w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            name="name"
            className="input input-bordered w-full"
            placeholder="e.g Quizzes, Homework, Exams"
            defaultValue={at.name}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Max Score</span>
          </div>
          <input
            name="maxScore"
            type="number"
            defaultValue={at.maxScore}
            className="input input-bordered w-full"
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Default Name</span>
          </div>
          <input
            name="defaultName"
            defaultValue={at.defaultName}
            placeholder="e.g Quiz, HW, Exam"
            className="input input-bordered w-full"
            onFocus={(e) => e.target.select()}
          />
        </label>
      </div>
      <div className="mt-4 p-4">
        <button className="btn btn-primary btn-wide" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
