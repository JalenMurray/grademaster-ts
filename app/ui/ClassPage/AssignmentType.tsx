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
        <div className="flex flex-col py-6 text-xs">
          <div className="flex gap-2" data-test={`${at.name}-buttons`}>
            <button className="class-button btn-success" onClick={handleAddAssignment}>
              <AddCircleOutline fontSize="small" />
              <div className="flex flex-col">
                <p>New</p>
                <p>Assignment</p>
              </div>
            </button>
            <button className="btn-secondary class-button" onClick={handleToggleLockWeights}>
              {at.lockWeights ? <LockOpenRounded fontSize="small" /> : <Lock fontSize="small" />}
              {at.lockWeights ? (
                <div className="flex flex-col">
                  <p>Unlock</p>
                  <p>Weights</p>
                </div>
              ) : (
                'Lock Weights'
              )}
            </button>
            <button className="btn-error class-button" onClick={handleDeleteAssignmentType}>
              <Delete fontSize="small" />
              <div className="flex flex-col">
                <p>Delete</p>
                <p>Assignment Type</p>
              </div>
            </button>
          </div>
          <div
            className="flex gap-1 md:gap-4 pt-4 text-xs md:text-2xl"
            data-test={`${at.name}-info`}
          >
            <h3>
              Total
              <br /> Weight:
              {at.lockWeights ? (
                <input
                  onFocus={(e) => e.target.select()}
                  onChange={handleChange}
                  name="weight"
                  value={formatFloat(at.weight, 2)}
                  className="input input-ghost w-12 md:w-[4.5rem] px-2 md:text-xl"
                  type="number"
                />
              ) : (
                <span className="input input-ghost w-[4.5rem] mx-2 md:text-xl">{at.weight}</span>
              )}
            </h3>
            <div className="divider divider-horizontal" />
            <h3>
              Weighted
              <br /> Score: {formatFloat(at.totalScore, 2) || 0}/
              {formatFloat(at.maxTotalScore, 2) || 0}
            </h3>
            <div className="divider divider-horizontal" />
            <h3>Lost Points: {formatFloat(lostPoints, 2) || 0}</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table
            className="table table-xs md:table-md text-xl"
            data-test={`${at.name}-assignmentsTable`}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Weight</th>
                <th>Weighted Score</th>
                <th>Lost Points</th>
              </tr>
            </thead>
            <tbody data-test={`${at.name}-assignments`}>
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
