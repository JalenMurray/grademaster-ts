'use client';

import { useState, useEffect } from 'react';
import { useClassContext } from '@/app/context/class';
import { Assignment as aType, AssignmentType as atType } from '@/app/context/types';
import { formatFloat } from '@/app/utils/format';
import { AddCircleOutline, LockOpenRounded, Lock, Delete } from '@mui/icons-material';
import Assignment from './Assignment';
import { validateAssignmentType } from '@/app/utils/validate';
import { v4 as uuid } from 'uuid';

export default function AssignmentType({ at }: { at: atType }) {
  const { addAssignment, updateAssignmentType, deleteAssignmentType } = useClassContext();
  const [lostPoints, setLostPoints] = useState<number>(at.maxTotalScore - at.totalScore);

  useEffect(() => {
    console.log('LOST POINTS', lostPoints);
    setLostPoints(at.maxTotalScore - at.totalScore);
  }, [at, setLostPoints]);

  /*
    Button Handlers
  */

  async function handleToggleLockWeights() {
    updateAssignmentType(at.id, { name: 'lockWeights', value: !at.lockWeights });
  }

  async function handleAddAssignment(e) {
    e.preventDefault();
    function getWeight(): number {
      return at.lockWeights ? at.weight / (at.assignments.length + 1) : 0;
    }

    const newAssignment = {
      id: uuid(),
      name: at.defaultName,
      score: at.maxScore,
      maxScore: at.maxScore,
      weight: getWeight(),
      assignmentTypeId: at.id,
    };
    addAssignment(at.id, newAssignment);
  }
  async function handleDeleteAssignmentType() {
    deleteAssignmentType(at.id);
  }

  /*
    OnChange Handlers
  */
  function handleChange(e) {
    const { name, value } = e.target;
    const { valid, message } = validateAssignmentType(name, value);
    if (valid) {
      updateAssignmentType(at.id, { name, value });
    } else {
      console.error(message);
    }
  }

  return (
    <details className="collapse collapse-arrow bg-base-200">
      <summary className="collapse-title text-4xl font-medium">{at.name}</summary>
      <div className="collapse-content">
        <div className="flex flex-col py-6">
          <div className="flex gap-2" id={`${at.id}-buttons`}>
            <form onSubmit={handleAddAssignment}>
              <button className="btn-success class-button" type="submit">
                <AddCircleOutline />
                <p>New Assignment</p>
              </button>
            </form>
            <button className="btn-secondary class-button" onClick={handleToggleLockWeights}>
              {at.lockWeights ? <LockOpenRounded /> : <Lock />}
              <p>{at.lockWeights ? 'Unlock Weights' : 'Lock Weights'}</p>
            </button>
            <button className="btn-error class-button" onClick={handleDeleteAssignmentType}>
              <Delete />
              <p>Delete Assignment Type</p>
            </button>
          </div>
          <div className="flex gap-4 pt-4 text-2xl">
            <h1>
              Total Weight:
              {at.lockWeights ? (
                <input
                  onFocus={(e) => e.target.select()}
                  onChange={handleChange}
                  name="weight"
                  value={formatFloat(at.weight, 2)}
                  className="input input-ghost w-[4.5rem] mx-2 text-xl"
                  type="number"
                />
              ) : (
                <span className="input input-ghost w-[4.5rem] mx-2 text-xl">{at.weight}</span>
              )}
            </h1>
            <div className="divider divider-horizontal" />
            <h1>
              Weighted Score: {formatFloat(at.totalScore, 2) || 0}/
              {formatFloat(at.maxTotalScore, 2) || 0}
            </h1>
            <div className="divider divider-horizontal" />
            <h1>Lost Points: {formatFloat(lostPoints, 2) || 0}</h1>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table text-xl">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Weight</th>
                <th>Weighted Score</th>
                <th>Lost Points</th>
              </tr>
            </thead>
            <tbody>
              {at.assignments.map((assignment, i) => (
                <tr key={assignment.id}>
                  <Assignment assignment={assignment} atId={at.id} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}
