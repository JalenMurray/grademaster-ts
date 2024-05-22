'use client';

import { csAssignmentType as atType, Class, csAssignment as aType } from '@/app/lib/definitions';
import ProgressBar from './ProgressBar';
import { useClassContext } from '@/app/context/class';
import { useEffect } from 'react';
import AssignmentType from './AssignmentType';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '@/amplify/data/resource';
import Warnings from './Warnings';
import { GradeCalculatorSkeleton } from './Skeletons';

const client = generateClient<Schema>();

export default function GradeCalculator({
  serverVariables,
}: {
  serverVariables?: {
    cls: Class;
    assignmentTypes: Array<atType>;
  };
}) {
  const { cls, setCls, assignmentTypes, setAssignmentTypes } = useClassContext();

  useEffect(() => {
    // if (serverVariables) {
    //   setCls(serverVariables.cls);
    //   console.log(serverVariables);
    //   let atsObject = {};
    //   serverVariables.assignmentTypes.forEach((at, i) => {
    //     atsObject[at.id] = at;
    //   });
    //   setAssignmentTypes(atsObject);
    // }
  }, []);

  return cls.code === 'CLASS100' ? (
    <GradeCalculatorSkeleton />
  ) : (
    <div data-test="gradeCalculator">
      <Warnings />
      <ProgressBar score={cls?.score || 0} />
      <div
        className="mt-4 mb-[8rem] flex flex-col gap-6"
        id="assignment-types"
        data-test="assignmentTypes"
      >
        {Object.values(assignmentTypes).map((at) => (
          <AssignmentType key={at.id} at={at} />
        ))}
      </div>
    </div>
  );
}
