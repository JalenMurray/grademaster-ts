'use client';

import { AssignmentType as atType, Class } from '@/app/lib/definitions';
import ProgressBar from './ProgressBar';
import { useClassContext } from '@/app/context/class';
import { useEffect } from 'react';
import AssignmentType from './AssignmentType';

export default function GradeCalculator({
  serverVariables,
}: {
  serverVariables: {
    cls: Class;
    assignmentTypes: Array<atType>;
  };
}) {
  const { cls, setCls, assignmentTypes, setAssignmentTypes } = useClassContext();

  useEffect(() => {
    setCls(serverVariables.cls);
    let atsObject = {};
    serverVariables.assignmentTypes.forEach((at) => {
      atsObject[at.id] = at;
    });
    setAssignmentTypes(atsObject);
  }, []);

  return (
    <div data-type="gradeCalculator">
      <ProgressBar score={cls.score} />
      <div
        className="mt-4 mb-[8rem] flex flex-col gap-6"
        id="assignment-types"
        data-test="assignmentTypes"
      >
        {Object.values(assignmentTypes).map((at) => (
          <AssignmentType at={at} />
        ))}
      </div>
    </div>
  );
}
