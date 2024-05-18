'use client';

import { useState, useEffect } from 'react';
import { useClassContext } from '@/app/context/class';
import { AssignmentType as atType } from '@/app/lib/definitions';
import { formatFloat } from '@/app/utils/format';
import { AddCircleOutline, LockOpenRounded, Lock, Delete } from '@mui/icons-material';

export default function AssignmentType({ at }: { at: atType }) {
  const { assignmentTypes, setAssignmentTypes } = useClassContext();
  const [lostPoints, setLostPoints] = useState<number>(at.maxTotalScore - at.totalScore);

  useEffect(() => {
    setLostPoints(at.maxTotalScore - at.totalScore);
  }, [at, setLostPoints]);

  /*
    Button Handlers
  */
  function handleToggleWeights() {
    setAssignmentTypes({
      ...assignmentTypes,
      [at.id]: { ...at, lockWeights: !at.lockWeights } as atType,
    });
  }

  return (
    <details className="collapse collapse-arrow bg-base-200">
      <summary className="collapse-title text-4xl font-medium">{at.name}</summary>
      <div className="collapse-content">
        <div className="flex flex-col py-6">
          <div className="flex gap-2" id={`${at.id}-buttons`}>
            <button className="btn-success class-button">
              <AddCircleOutline />
              <p>New Assignment</p>
            </button>
            <button className="btn-secondary class-button" onClick={handleToggleWeights}>
              {at.lockWeights ? <LockOpenRounded /> : <Lock />}
              <p>{at.lockWeights ? 'Unlock Weights' : 'Lock Weights'}</p>
            </button>
            <button className="btn-error class-button">
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
                  name="weight"
                  value={at.weight}
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
            <h1>Lost Points: {formatFloat(lostPoints, 2)}</h1>
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
              {/* {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <Assignment
                    assignment={assignment}
                    weightLocked={locked}
                    assignmentsQueryKey={queryKey}
                    callback={assignmentCallback}
                  />
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}
