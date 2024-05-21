'use client';

import { useClassContext } from '@/app/context/class';
import { AssignmentType } from '@/app/context/types';
import { CreateAssignmentType, createAssignmentType } from '@/app/lib/actions';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function NewAssignmentTypeForm({ guest }: { guest?: boolean }) {
  const { addAssignmentType } = useClassContext();
  const [locked, setLocked] = useState(true);

  function handleSubmit() {
    const modal = document.getElementById('new_assignment_type_modal') as HTMLDialogElement;
    modal.close();
  }

  function guestCreateAssignment(formData: FormData) {
    const weight = formData.get('lockWeights') === 'on' ? +formData.get('weight').toString() : 0;
    const newAssignmentType: AssignmentType = {
      id: uuid(),
      name: formData.get('name').toString(),
      defaultName: formData.get('defaultName').toString(),
      maxScore: +formData.get('maxScore').toString(),
      lockWeights: formData.get('lockWeights')?.toString() === 'on' || false,
      weight,
      totalScore: 0,
      maxTotalScore: 0,
      assignments: [],
    };
    addAssignmentType(newAssignmentType);
  }

  return (
    <form
      action={guest ? guestCreateAssignment : createAssignmentType}
      onSubmit={handleSubmit}
      data-test="newAssignmentTypeForm"
    >
      <input className="hidden" name="classId" id="new_assignment_type_modal_class" />
      <h3 className="font-bold text-lg">New Assignment Type</h3>
      <div className="w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            name="name"
            className="input input-bordered w-full"
            placeholder="e.g Quizzes, Homework, Exams"
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
            defaultValue={100}
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
            placeholder="e.g Quiz, HW, Exam"
            className="input input-bordered w-full"
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="cursor-pointer label">
          <span className="label-text">Lock Weights</span>
          <input
            name="lockWeights"
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-success"
            onChange={() => setLocked(!locked)}
          />
        </label>
        {locked && (
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Weight</span>
            </div>
            <input
              name="weight"
              type="number"
              defaultValue={0}
              className="input input-bordered w-full"
              onFocus={(e) => e.target.select()}
            />
          </label>
        )}
      </div>
      <div className="mt-4 p-4">
        <button className="btn btn-primary btn-wide" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
