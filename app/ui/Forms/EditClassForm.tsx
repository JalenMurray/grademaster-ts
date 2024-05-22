'use client';

import { useClassContext } from '@/app/context/class';
import { Class } from '@/app/context/types';
import clsx from 'clsx';
import { TwitterPicker } from 'react-color';

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

export default function EditClassForm() {
  const { cls, setCls, isGuest } = useClassContext();
  function handleSubmit() {
    const modal = document.getElementById('edit_class_modal') as HTMLDialogElement;
    modal.close();
  }

  function handleColorChange(color) {
    const value = color.hex;
    const colorInput = document.getElementById('display-color-string') as HTMLInputElement;
    colorInput.value = value;
  }

  function guestUpdateClass(formData: FormData) {
    const toUpdate = {
      code: formData.get('code').toString(),
      name: formData.get('name').toString(),
      desiredScore: +formData.get('desiredScore').toString(),
      displayColor: formData.get('displayColor').toString(),
    };
    setCls({ ...cls, ...toUpdate });
  }

  return (
    <form action={guestUpdateClass} onSubmit={handleSubmit} data-test="editClassForm">
      <h3 className="font-bold text-lg">Update Class</h3>
      <div className="w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Code</span>
          </div>
          <input
            name="code"
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g CMSC420, MATH140, HIST100"
            defaultValue={cls.code}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Class Name</span>
          </div>
          <input
            name="name"
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g Intro to Calculus, Data Structures, Algorithms"
            defaultValue={cls.name}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Desired Score</span>
          </div>
          <input
            name="desiredScore"
            defaultValue={cls.desiredScore}
            type="number"
            className="input input-bordered w-full"
          />
        </label>
        {!isGuest && (
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Units</span>
            </div>
            <input
              name="units"
              defaultValue={3}
              type="number"
              className="input input-bordered w-full"
              onFocus={(e) => e.target.select()}
            />
          </label>
        )}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Display Color</span>
          </div>
          <input
            hidden
            name="displayColor"
            id="display-color-string"
            defaultValue={cls.displayColor}
          />
          <TwitterPicker
            color={cls.displayColor}
            onChangeComplete={handleColorChange}
            width="100%"
            triangle="hide"
            colors={[
              '#0000FF', // Blue
              '#FF0000', // Red
              '#008000', // Green
              '#800080', // Purple
              '#FFFF00', // Yellow
              '#FFA500', // Orange
              '#FFC0CB', // Pink
              '#40E0D0', // Turquoise
              '#A52A2A', // Brown
              '#808080', // Gray
              '#FF1493', // Deep Pink
              '#00FFFF', // Cyan
              '#FF6347', // Tomato
              '#7FFF00', // Chartreuse
              '#800000', // Maroon
              '#4682B4', // Steel Blue
              '#FFD700', // Gold
              '#7FFFD4', // Aquamarine
              '#9932CC', // Dark Orchid
              '#FF4500', // Orange Red
              '#00FF00', // Lime Green
              '#8A2BE2', // Blue Violet
              '#008080', // Teal
              '#FF00FF', // Magenta
            ]}
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
