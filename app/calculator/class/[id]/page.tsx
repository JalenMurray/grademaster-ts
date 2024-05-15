import type { AssignmentType, Class, Semester } from '@/app/lib/definitions';
import { cookiesClient } from '@/app/utils/amplify-utils';
import ClassCard from '@/app/ui/SemesterPage/ClassCard';
import { AddCircleOutline, Delete, Edit } from '@mui/icons-material';
import GradeCalculator from '@/app/ui/ClassPage/GradeCalculator';

async function getData(id) {
  const { data: cls } = await cookiesClient.models.Class.get({ id });
  return cls;
}

export default async function Page({ params }: { params: { id: string } }) {
  const cls = await getData(params.id);
  const { data: assignmentTypes } = await cls.assignmentTypes();
  const { data: semester } = await cls.semester();

  console.log('CLS ', cls);
  console.log('Class Score', cls.score);

  return (
    <div className="w-full max-w-7xl flex-grow pt-10">
      <h1 className="text-5xl" style={{ color: cls.displayColor }}>
        {cls.code}
        {/* <span className="text-xl text-neutral-600">
          {semester.season} {semester.year}
        </span> */}
      </h1>
      <h1 className="text-3xl mt-2" style={{ color: cls.displayColor }}>
        {cls.title}
      </h1>
      <h2 className="mt-6 text-2xl flex gap-4 align-center">Actions</h2>
      <div className="mt-2 flex gap-3 w-full">
        <button className="btn btn-neutral">
          <Edit />
          Edit Class
        </button>
        <button className="btn btn-success text-white">
          <AddCircleOutline />
          New Assignment Type
        </button>
        <button className="btn btn-error text-white">
          <Delete />
          Delete Class
        </button>
      </div>
      <GradeCalculator
        score={cls.score}
        assignmentTypes={assignmentTypes as Array<AssignmentType>}
      />
    </div>
  );
}
