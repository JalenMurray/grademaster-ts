import type { Class, Semester } from '@/app/lib/definitions';
import { cookiesClient } from '@/app/utils/amplify-utils';
import ClassCard from '@/app/ui/SemesterPage/ClassCard';
import { AddCircleOutline, Delete, Edit } from '@mui/icons-material';
import OpenModalButton from '@/app/ui/OpenModalButton';

async function getData(id) {
  const { data: semesters } = await cookiesClient.models.Semester.get(
    { id },
    {
      selectionSet: ['id', 'season', 'year', 'classes.*'],
    }
  );
  return semesters;
}

export default async function Page({ params }: { params: { id: string } }) {
  const semester = await getData(params.id);
  const classes = semester.classes;

  return (
    <div className="w-full max-w-7xl flex-grow pt-10">
      <h1 className="text-5xl">
        {semester.season} {semester.year}
      </h1>
      <h2 className="mt-4 text-2xl flex gap-4 align-center">Actions</h2>
      <div className="mt-2 flex gap-3 w-full" data-test="actionButtons">
        <button className="btn btn-neutral">
          <Edit />
          Edit Semester
        </button>
        <OpenModalButton
          modalId="new_class_modal"
          btnClasses="btn btn-success text-white"
          extraVariable={{ name: 'semester', value: semester.id }}
        >
          <AddCircleOutline />
          New Class
        </OpenModalButton>
        <button className="btn btn-error text-white">
          <Delete />
          Delete Semester
        </button>
      </div>
      <h2 className="mt-8 text-2xl flex gap-4 align-center">Classes</h2>
      <div className="flex gap-4 mt-2 flex-wrap">
        {classes && classes.length > 0
          ? classes.map((cls) => <ClassCard key={cls.id} cls={cls as Class} />)
          : 'No Classes'}
      </div>
    </div>
  );
}
