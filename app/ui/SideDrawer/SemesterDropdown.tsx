import type { Class, Semester } from '@/app/lib/definitions';
import { cookiesClient } from '@/app/utils/amplify-utils';
import Link from 'next/link';
import OpenModalButton from '../OpenModalButton';

export default async function SemesterDropdown({ semester }: { semester: Semester }) {
  const { data: classes } = await semester.classes();

  return (
    <details id={semester.id}>
      <summary className="group">
        {semester.season} {semester.year}
      </summary>
      <ul>
        <li>
          <Link href={`/calculator/semester/${semester.id}`}>Semester Details</Link>
        </li>
        <li>
          <OpenModalButton
            buttonText="New Class"
            modalId="new_class_modal"
            extraVariable={{ name: 'semester', value: semester.id }}
          />
        </li>
        {classes.map((cls) => (
          <li key={cls.id} className="group">
            <Link href={`/calculator/class/${cls.id}`}>
              <span>{cls.code}</span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
