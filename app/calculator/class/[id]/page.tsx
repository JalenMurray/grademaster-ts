import type {
  csAssignmentType as atType,
  Class,
  csAssignment as aType,
  Semester,
} from '@/app/lib/definitions';
import { cookiesClient } from '@/app/utils/amplify-utils';
import ClassCard from '@/app/ui/SemesterPage/ClassCard';
import { AddCircleOutline, Delete, Edit } from '@mui/icons-material';
import GradeCalculator from '@/app/ui/ClassPage/GradeCalculator';
import { getSemesterStr } from '@/app/utils/format';
import OpenModalButton from '@/app/ui/OpenModalButton';

async function getData(id) {
  const { data: cls } = await cookiesClient.models.Class.get({ id });
  return cls;
}

export default async function Page({ params }: { params: { id: string } }) {
  const cls = await getData(params.id);
  const { data: assignmentTypes } = await cls.assignmentTypes();
  const { data: semester } = await cls.semester();

  /*
    Need to correctly format class and assignmentTypes here so that functions are not passed to the client components
  */
  // Remove assignmentTypes and semester functions from class
  const { assignmentTypes: removedFn1, semester: removedFn2, ...formattedCls } = cls;
  // Remove assignments and class functions from assignmentTypes
  // Add assignments to assignment Types
  const formattedAssignmentTypes = await Promise.all(
    assignmentTypes.map(async (at) => {
      const { data: fetchedAssignments } = await at.assignments();
      const assignments = fetchedAssignments.map((a) => {
        const { assignmentType: removedFn, ...assignment } = a;
        return assignment as aType;
      });
      const { assignments: removedFn2, class: removedFn3, ...assignmentType } = at;
      return { ...assignmentType, assignments } as atType;
    })
  );

  return (
    <div className="w-full max-w-7xl flex-grow pt-10">
      <h1 className="text-5xl" style={{ color: cls.displayColor }}>
        {cls.code}
        {/* <span className="text-xl text-neutral-600 ml-3">
          {getSemesterStr(semester as Semester)}
        </span> */}
      </h1>
      <h1 className="text-3xl mt-2" style={{ color: cls.displayColor }}>
        {cls.name}
      </h1>
      <h2 className="mt-6 text-2xl flex gap-4 align-center">Actions</h2>
      <div className="mt-2 flex gap-3 w-full">
        <button className="btn btn-neutral">
          <Edit />
          Edit Class
        </button>
        <OpenModalButton
          modalId="new_assignment_type_modal"
          btnClasses="btn-success text-white"
          extraVariable={{ name: 'class', value: cls.id }}
        >
          <AddCircleOutline />
          New Assignment Type
        </OpenModalButton>
        <button className="btn btn-error text-white">
          <Delete />
          Delete Class
        </button>
      </div>
      <GradeCalculator
        serverVariables={{
          cls: formattedCls as Class,
          assignmentTypes: formattedAssignmentTypes as Array<atType>,
        }}
      />
    </div>
  );
}
