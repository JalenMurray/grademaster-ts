'use client';

import { createAssignmentType } from '@/app/lib/actions';
import { useState } from 'react';

export default function NewAssignmentTypeForm() {
  const [locked, setLocked] = useState(true);

  function handleSubmit() {
    const modal = document.getElementById('new_assignment_type_modal') as HTMLDialogElement;
    modal.close();
  }

  return (
    <form action={createAssignmentType} onSubmit={handleSubmit} data-test="newAssignmentTypeForm">
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
