'use client';

import { AssignmentType, Class } from '@/app/lib/definitions';
import ProgressBar from './ProgressBar';

export default function GradeCalculator({
  score,
  assignmentTypes,
}: {
  score: number;
  assignmentTypes: Array<AssignmentType>;
}) {
  console.log(score, assignmentTypes);

  return (
    <div>
      <ProgressBar score={score} />
    </div>
  );
}
