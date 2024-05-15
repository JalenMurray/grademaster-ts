'use server';

import { z } from 'zod';
import { cookiesClient } from '../utils/amplify-utils';
import { revalidatePath } from 'next/cache';

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
  });
  await cookiesClient.models.Class.create(newClass);
  revalidatePath('/calculator');
}
