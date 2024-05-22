'use client';

import { createContext, useEffect, useState, useContext } from 'react';
import {
  Assignment,
  AssignmentType,
  AssignmentTypes,
  Class,
  ClassContextType,
  Warning,
  Warnings,
} from './types';
import { v4 as uuid } from 'uuid';

export const ClassContext = createContext<ClassContextType>({
  cls: null,
  setCls: (cls: Class) => null,
  createGuestClass: () => null,
  isGuest: false,
  assignmentTypes: null,
  setAssignmentTypes: (assignmentTypes: AssignmentTypes) => null,
  warnings: null,
  addAssignment: (atId: string, assignment: Assignment) => null,
  deleteAssignment: (atId: string, assignment: Assignment) => null,
  updateAssignment: (
    atId: string,
    aId: string,
    toUpdate: { name: string; value: string | number }
  ) => null,
  addAssignmentType: (assignmentType: AssignmentType) => null,
  deleteAssignmentType: (atId: string) => null,
  updateAssignmentType: (atId: string, toUpdate: { name: string; value: string | number }) => null,
  exportClass: () => null,
});

const INITIAL_CLASS: Class = {
  id: uuid(),
  code: 'CLASS100',
  name: 'Initial Class',
  score: 0,
  desiredScore: 100,
  displayColor: '#FF0000',
};

export function ClassProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [cls, setCls] = useState<Class>(INITIAL_CLASS);
  const [assignmentTypes, setAssignmentTypes] = useState<AssignmentTypes>({});
  const [warnings, setWarnings] = useState<Warnings>({});
  const [isGuest, setIsGuest] = useState<boolean>(false);

  /* Class Updates */
  useEffect(() => {
    if (Object.values(assignmentTypes).length > 0) {
      const score = Object.values(assignmentTypes).reduce(
        (acc: number, at: AssignmentType) => acc + at.totalScore,
        0
      );
      const toUpdate = { score };
      setCls({ ...cls, ...toUpdate });
    }

    // Check warnings
    const clsWeight = Object.values(assignmentTypes).reduce(
      (acc: number, at: AssignmentType) => acc + at.weight,
      0
    );
    if (clsWeight != 100) {
      setWarnings({
        ...warnings,
        clsWeight: {
          header: 'Total class weight does not equal 100%',
          message: `Class weight currently equals ${clsWeight}%`,
        },
      });
    } else {
      if (warnings.clsWeight) {
        let { clsWeight: removedWarning, ...updatedWarnings } = warnings;
        setWarnings(updatedWarnings);
      }
    }
  }, [assignmentTypes]);

  function balanceAssignments(assignments: Array<Assignment>, atWeight: number): Array<Assignment> {
    const weight = atWeight / assignments.length;
    const balancedAssignments = assignments.map((a) => ({ ...a, weight }));
    return balancedAssignments as Array<Assignment>;
  }

  function getAssignmentTypeScores(assignments: Array<Assignment>): {
    totalScore: number;
    maxTotalScore: number;
  } {
    const totalScore = assignments.reduce(
      (acc: number, a: Assignment) => acc + (a.score / a.maxScore) * a.weight,
      0
    );
    const maxTotalScore = assignments.reduce((acc: number, a: Assignment) => acc + a.weight, 0);
    return { totalScore, maxTotalScore };
  }

  function getUpdatedAssignmentType(
    id: string,
    toUpdate: { name: string; value: boolean | string | number; assignments?: Array<Assignment> }
  ): AssignmentType {
    const assignmentType = assignmentTypes[id];
    const { name, value, assignments } = toUpdate;
    if (
      name === 'name' ||
      name === 'maxScore' ||
      name === 'desiredScore' ||
      name === 'lockWeights'
    ) {
      return { ...assignmentType, [name]: value };
    }
    if (assignmentType.lockWeights) {
      const weight = name === 'weight' ? (value as number) : assignmentType.weight;
      const balancedAssignments = balanceAssignments(
        assignments || assignmentType.assignments,
        weight
      );
      const scores = getAssignmentTypeScores(balancedAssignments);
      return { ...assignmentType, ...scores, assignments: balancedAssignments, weight };
    }

    if (name === 'weight') {
      return { ...assignmentType, weight: value as number };
    }
    if (name === 'assignments') {
      const scores = getAssignmentTypeScores(assignments);
      return { ...assignmentType, ...scores, assignments, weight: scores.maxTotalScore };
    }
    throw new Error('Invalid Name passed');
  }

  function addAssignment(atId: string, assignment: Assignment) {
    const { assignments: currAssignments } = assignmentTypes[atId];
    const newAssignments = [...currAssignments, assignment];
    const updatedAt = getUpdatedAssignmentType(atId, {
      name: 'assignments',
      value: 'add',
      assignments: newAssignments,
    });
    setAssignmentTypes({ ...assignmentTypes, [atId]: updatedAt });
  }

  function deleteAssignment(atId: string, assignment: Assignment) {
    const { assignments: currAssignments } = assignmentTypes[atId];
    const newAssignments = currAssignments.filter((a: Assignment) => a.id !== assignment.id);
    const updatedAt = getUpdatedAssignmentType(atId, {
      name: 'assignments',
      value: 'remove',
      assignments: newAssignments,
    });
    setAssignmentTypes({ ...assignmentTypes, [atId]: updatedAt });
  }

  function updateAssignment(
    atId: string,
    aId: string,
    toUpdate: { name: string; value: string | number }
  ) {
    const { assignments: currAssignments } = assignmentTypes[atId];
    const newAssignments = currAssignments.map((a: Assignment) => {
      if (a.id === aId) {
        return { ...a, [toUpdate.name]: toUpdate.value };
      }
      return a;
    });
    const updatedAt = getUpdatedAssignmentType(atId, {
      name: 'assignments',
      value: 'update',
      assignments: newAssignments,
    });
    setAssignmentTypes({ ...assignmentTypes, [atId]: updatedAt });
  }

  function addAssignmentType(assignmentType: AssignmentType) {
    setAssignmentTypes({ ...assignmentTypes, [assignmentType.id]: assignmentType });
  }

  function deleteAssignmentType(atId: string) {
    const { [atId]: removed, ...newAssignmentTypes } = assignmentTypes;
    setAssignmentTypes(newAssignmentTypes);
  }

  function updateAssignmentType(
    atId: string,
    toUpdate: { name: string; value: string | number | boolean }
  ) {
    const updatedAt = getUpdatedAssignmentType(atId, toUpdate);
    setAssignmentTypes({ ...assignmentTypes, [atId]: updatedAt });
  }

  function createGuestClass() {
    const guestClass: Class = {
      id: uuid(),
      code: 'GUEST100',
      name: 'Guest Class',
      score: 0,
      desiredScore: 100,
      displayColor: '#FF0000',
    };
    setCls(guestClass);
    setIsGuest(true);
  }

  function exportClass() {
    const assignmentTypesArray = Object.values(assignmentTypes);
    return { ...cls, assignmentTypes: assignmentTypesArray };
  }

  const value = {
    cls,
    setCls,
    createGuestClass,
    isGuest,
    assignmentTypes,
    setAssignmentTypes,
    warnings,
    addAssignment,
    addAssignmentType,
    deleteAssignment,
    deleteAssignmentType,
    updateAssignment,
    updateAssignmentType,
    exportClass,
  };

  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
}

export const useClassContext = (): ClassContextType => useContext(ClassContext) as ClassContextType;
