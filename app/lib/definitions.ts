import type { Schema } from '@/amplify/data/resource';

export type User = {
  email: string;
};

export type Semester = Schema['Semester']['type'];
export type Class = Schema['Class']['type'];
export type AssignmentType = Schema['AssignmentType']['type'];
export type Assignment = Schema['Assignment']['type'];

// Interfaces
export interface csAssignment {
  id?: string;
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  assignmentTypeId: string;
}

export interface csAssignmentType {
  id: string;
  name: string;
  maxScore: number;
  defaultName: string;
  weight: number;
  lockWeights: boolean;
  totalScore: number;
  maxTotalScore: number;
  assignments: Array<csAssignment>;
}

// Assignment Callback Fn
export type AssignmentCallback = {
  onChange: (id: string, toUpdate: { [name: string]: string }) => void;
  onBlur: () => void;
  onDelete: (id: string) => void;
};
