export interface Assignment {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  weight: number;
}

export interface Class {
  id: string;
  code: string;
  name: string;
  score: number;
  desiredScore: number;
  displayColor: string;
}

export interface AssignmentType {
  id: string;
  name: string;
  maxScore: number;
  defaultName: string;
  weight: number;
  lockWeights: boolean;
  totalScore: number;
  maxTotalScore: number;
  assignments: Array<Assignment>;
}

export type AssignmentTypes = {
  [assignmentTypeId: string]: AssignmentType;
};

export type Warning = {
  header: string;
  message: string;
};

export type Warnings = {
  [warningName: string]: Warning;
};

export type ClassContextType = {
  cls: Class;
  setCls: (cls: Class) => void;
  createGuestClass: () => void;
  isGuest: boolean;
  assignmentTypes: AssignmentTypes;
  setAssignmentTypes: (assignmentTypes: AssignmentTypes) => void;
  warnings: Warnings;
  addAssignment: (atId: string, assignment: Assignment) => void;
  deleteAssignment: (atId: string, assignment: Assignment) => void;
  updateAssignment: (
    atId: string,
    aId: string,
    toUpdate: { name: string; value: string | number }
  ) => void;
  addAssignmentType: (assignmentType: AssignmentType) => void;
  deleteAssignmentType: (atId: string) => void;
  updateAssignmentType: (
    atId: string,
    toUpdate: { name: string; value: string | number | boolean }
  ) => void;
};
