'use client';

import { createSemester } from '@/app/lib/actions';

const currentDate = new Date();
const currYear = currentDate.getFullYear();
const currMonth = currentDate.getMonth();

function getDefaultSemester(): string {
  if (currMonth < 1 || currMonth == 11) {
    return 'Winter';
  } else if (currMonth < 5) {
    return 'Spring';
  } else if (currMonth < 8) {
    return 'Summer';
  } else {
    return 'Fall';
  }
}

export default function NewSemesterForm() {
  function handleSubmit() {
    const modal = document.getElementById('new_semester_modal') as HTMLDialogElement;
    modal.close();
  }

  return (
    <form action={createSemester} onSubmit={handleSubmit}>
      <h3 className="font-bold text-lg">New Semester</h3>
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Select the Semester&apos;s Season</span>
          </div>
          <select
            name="season"
            className="select select-bordered w-full max-w-xs"
            defaultValue={getDefaultSemester()}
          >
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Year</span>
          </div>
          <input
            type="number"
            name="year"
            className="input input-bordered w-full max-w-xs"
            defaultValue={currYear}
          />
        </label>
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Current Semester</span>
            <input
              name="current"
              defaultChecked
              type="checkbox"
              className="checkbox checkbox-success"
            />
          </label>
        </div>
      </div>
      <div className="mt-4 p-4">
        <button className="btn btn-primary btn-wide" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
