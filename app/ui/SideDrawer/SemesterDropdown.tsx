import type { Class, Semester } from '@/app/lib/definitions';
import { cookiesClient } from '@/app/utils/amplify-utils';
import Link from 'next/link';

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
          <button className="btn btn-ghost group">New Class</button>
        </li>
        {classes.length > 0 ? (
          classes.map((cls) => (
            <li key={cls.id} className="group">
              <Link href={`/calculator/class/${cls.id}`}>
                <span>{cls.code}</span>
              </Link>
            </li>
          ))
        ) : (
          <li className="group">No Classes</li>
        )}
      </ul>
    </details>
  );
}
