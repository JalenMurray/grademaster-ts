'use client';

import { useState, useEffect } from 'react';
import { useClassContext } from '@/app/context/class';
import { csAssignment as aType, csAssignmentType as atType } from '@/app/lib/definitions';
import { formatFloat } from '@/app/utils/format';
import { AddCircleOutline, LockOpenRounded, Lock, Delete } from '@mui/icons-material';
import { createAssignment } from '@/app/lib/actions';
import Assignment from './Assignment';
import { validateAssignmentType } from '@/app/utils/validate';

export default function AssignmentType({ at }: { at: atType }) {
  const { assignmentTypes, setAssignmentTypes } = useClassContext();
  const [lostPoints, setLostPoints] = useState<number>(at.maxTotalScore - at.totalScore);

  useEffect(() => {
    setLostPoints(at.maxTotalScore - at.totalScore);
  }, [at, setLostPoints]);

  /*
    Assignment Type State Manager Fns
  */
  function balanceAssignments(assignments: Array<aType>, newWeight?: number): Array<aType> {
    // If lockWeights is false, return the passed assignments
    if (!at.lockWeights) {
      return assignments;
    }

    // If lockWeights is true, balance the assignments based on # of assignments and at.weight
    const startWeight = newWeight || at.weight;
    const weight = startWeight / assignments.length;
    const balancedAssignments = assignments.map((a) => ({ ...a, weight }));
    return balancedAssignments as Array<aType>;
  }

  function getAssignmentTypeScores(
    assignments: Array<aType>,
    newWeight?: number
  ): {
    totalScore: number;
    maxTotalScore: number;
    weight: number;
  } {
    const totalScore = assignments.reduce(
      (acc: number, a: aType) => acc + (a.score / a.maxScore) * a.weight,
      0
    );
    const maxTotalScore = assignments.reduce((acc: number, a: aType) => acc + a.weight, 0);
    // let weight = newWeight
    if (at.lockWeights) {
    }
    const weight = at.lockWeights ? newWeight || at.weight : maxTotalScore;
    console.log('NEW WEIGHT', weight);
    return { totalScore, maxTotalScore, weight };
  }

  function getUpdatedAssignmentType(assignments: Array<aType>, newWeight?: number): atType {
    // Balance Assignments (balanceAssignments checks if at is locked and just returns assignments if it is)
    console.log(newWeight);
    const balancedAssignments = balanceAssignments(assignments, newWeight);

    // Get updated scores for Assignment Type
    const { totalScore, maxTotalScore, weight } = getAssignmentTypeScores(
      balancedAssignments,
      newWeight
    );

    return { ...at, assignments: balancedAssignments, totalScore, maxTotalScore, weight };
  }

  function addAssignment(assignment: aType): void {
    const assignments = at.assignments as Array<aType>;
    const newAssignments = [...assignments, assignment];
    const updatedAt = getUpdatedAssignmentType(newAssignments);
    setAssignmentTypes({ ...assignmentTypes, [at.id]: updatedAt });
  }

  /*
    Button Handlers
  */
  function handleToggleWeights() {
    setAssignmentTypes({
      ...assignmentTypes,
      [at.id]: { ...at, lockWeights: !at.lockWeights },
    });
  }
  async function handleAddAssignment(e) {
    e.preventDefault();
    function getWeight(): number {
      return at.lockWeights ? at.weight / (at.assignments.length + 1) : 0;
    }

    const newAssignment = {
      name: at.defaultName,
      score: at.maxScore,
      maxScore: at.maxScore,
      weight: getWeight(),
      assignmentTypeId: at.id,
    };

    // Add assignment Client Side
    addAssignment(newAssignment);
    // Add assignment Server Side
    await createAssignment(newAssignment);
  }
  async function handleDeleteAssignmentType() {
    return;
  }

  /*
    OnChange Handlers
  */
  function handleChange(e) {
    const { name, value } = e.target;
    const { valid, message } = validateAssignmentType(name, value);
    console.log('ON_CHANGE', valid, message);
    if (valid) {
      if (name === 'weight') {
        const newWeight = value === '' ? 0 : (value as number);
        const updatedAt = getUpdatedAssignmentType(at.assignments, newWeight);
        setAssignmentTypes({ ...assignmentTypes, [at.id]: updatedAt });
      }
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
            <button className="btn-secondary class-button" onClick={handleToggleWeights}>
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
              {at.assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <Assignment assignment={assignment} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}
