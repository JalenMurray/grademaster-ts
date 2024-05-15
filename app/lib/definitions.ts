import type { Schema } from '@/amplify/data/resource';

export type User = {
  email: string;
};

export type Semester = Schema['Semester']['type'];
export type Class = Schema['Class']['type'];
export type AssignmentType = Schema['AssignmentType']['type'];
export type Assignment = Schema['Assignment']['type'];
