import { Class, csAssignmentType } from '../lib/definitions';

export type AssignmentTypes = {
  [assignmentTypeId: string]: csAssignmentType;
};

export type Warning = {
  header: string;
  message: string;
};

export type ClassContextType = {
  cls: Class;
  setCls: (cls: Class) => void;
  assignmentTypes: AssignmentTypes;
  setAssignmentTypes: (assignmentTypes: AssignmentTypes) => void;
  warnings: {};
};
