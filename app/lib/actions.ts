'use server';

import { z } from 'zod';
import { cookiesClient } from '../utils/amplify-utils';
import { revalidatePath } from 'next/cache';
import { Assignment, Class } from './definitions';

const SemesterFormSchema = z.object({
  id: z.string(),
  season: z.enum(['Spring', 'Summer', 'Fall', 'Winter']),
  year: z.coerce.number(),
  current: z.coerce.boolean(),
});

const CreateSemester = SemesterFormSchema.omit({ id: true });

export async function createSemester(formData: FormData) {
  const { season, year, current } = CreateSemester.parse({
    season: formData.get('season'),
    year: formData.get('year'),
    current: formData.get('current'),
  });
  await cookiesClient.models.Semester.create({ season, year, current });
  revalidatePath('/calculator');
}

const ClassFormSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  score: z.number(),
  desiredScore: z.coerce.number(),
  units: z.coerce.number(),
  displayColor: z.string(),
  semesterId: z.string(),
});

const CreateClass = ClassFormSchema.omit({ id: true });

export async function createClass(formData: FormData) {
  const newClass = CreateClass.parse({
    code: formData.get('code'),
    name: formData.get('name'),
    score: 0,
    desiredScore: formData.get('desiredScore'),
    units: formData.get('units'),
    displayColor: formData.get('displayColor'),
    semesterId: formData.get('semesterId'),
  }) as Class;
  await cookiesClient.models.Class.create(newClass);
  revalidatePath('/calculator');
}

const AssignmentTypeFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  defaultName: z.string(),
  maxScore: z.coerce.number(),
  weight: z.coerce.number(),
  lockWeights: z.coerce.boolean(),
  totalScore: z.number(),
  maxTotalScore: z.number(),
  classId: z.string(),
});

const CreateAssignmentType = AssignmentTypeFormSchema.omit({ id: true });

export async function createAssignmentType(formData: FormData) {
  const weight = formData.get('lockWeights') === 'on' ? formData.get('weight') : '0';
  const newAssignmentType = CreateAssignmentType.parse({
    name: formData.get('name'),
    defaultName: formData.get('defaultName'),
    maxScore: formData.get('maxScore'),
    lockWeights: formData.get('lockWeights'),
    weight,
    totalScore: 0,
    maxTotalScore: 0,
    classId: formData.get('classId'),
  }) as Class;
  await cookiesClient.models.AssignmentType.create(newAssignmentType);
  revalidatePath('/calculator');
}

export async function createAssignment(newAssignment: {
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  assignmentTypeId: string;
}) {
  await cookiesClient.models.Assignment.create(newAssignment as Assignment);
  revalidatePath('/calculator');
}
