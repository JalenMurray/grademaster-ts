'use client';

import { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import {
  ClassContextType,
  Class,
  AssignmentTypes,
  AssignmentType,
  Assignment,
  Warning,
} from './types';

const INITIAL_CLASS: Class = {
  code: '',
  title: '',
  desiredScore: 100.0,
  units: 3,
  displayColor: '#FF0000',
  score: 100,
  semester: {
    season: '',
    year: 2000,
  },
};

const ClassContext = createContext<ClassContextType>({
  cls: INITIAL_CLASS,
  setCls: () => null,
  assignmentTypes: null,
  setAssignmentTypes: () => null,
  warnings: null,
});

export function ClassProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [cls, setCls] = useState<Class>(INITIAL_CLASS);
  const [assignmentTypes, setAssignmentTypes] = useState<AssignmentTypes>({});
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    console.log('Updating Class Score');
    const newScore = assignmentTypes
      ? Object.values(assignmentTypes).reduce(
          (acc: number, at: AssignmentType) => acc + at.totalScore,
          0
        )
      : 0;
    const toUpdate = { score: newScore };
    setCls((prevCls) => ({ ...prevCls, ...toUpdate }));
  }, [assignmentTypes]);

  return (
    <ClassContext.Provider value={{ cls, setCls, assignmentTypes, setAssignmentTypes, warnings }}>
      {children}
    </ClassContext.Provider>
  );
}

export const useClassContext = (): ClassContextType => useContext(ClassContext) as ClassContextType;
