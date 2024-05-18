import type { Schema } from '@/amplify/data/resource';

export type User = {
  email: string;
};

export type Semester = Schema['Semester']['type'];
export type Class = Schema['Class']['type'];
export type AssignmentType = Schema['AssignmentType']['type'];
export type Assignment = Schema['Assignment']['type'];

// Client Side Types
export type csAssignment = {
  id?: string;
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  assignmentTypeId: string;
};

export type csAssignmentType = {
  id: string;
  name: string;
  maxScore: number;
  defaultName: string;
  weight: number;
  lockWeights: boolean;
  totalScore: number;
  maxTotalScore: number;
  assignments: Array<csAssignment>;
};
