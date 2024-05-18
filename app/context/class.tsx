'use client';

import { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import { ClassContextType, AssignmentTypes, Warning } from './types';
import { Class, csAssignmentType } from '../lib/definitions';

const ClassContext = createContext<ClassContextType>({
  cls: null,
  setCls: () => null,
  assignmentTypes: null,
  setAssignmentTypes: () => null,
  warnings: null,
});

export function ClassProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [cls, setCls] = useState<Class>(null);
  const [assignmentTypes, setAssignmentTypes] = useState<AssignmentTypes>({});
  const [warnings, setWarnings] = useState([]);

  // useEffect(() => {
  // const newScore = assignmentTypes
  //   ? Object.values(assignmentTypes).reduce(
  //       (acc: number, at: csAssignmentType) => acc + at.totalScore,
  //       0
  //     )
  //   : 0;
  //   const toUpdate = { score: newScore };
  // }, [assignmentTypes]);

  return (
    <ClassContext.Provider value={{ cls, setCls, assignmentTypes, setAssignmentTypes, warnings }}>
      {children}
    </ClassContext.Provider>
  );
}

export const useClassContext = (): ClassContextType => useContext(ClassContext) as ClassContextType;
