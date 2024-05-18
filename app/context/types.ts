import { AssignmentType, Class } from '../lib/definitions';

export type AssignmentTypes = {
  [assignmentTypeId: string]: AssignmentType;
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
