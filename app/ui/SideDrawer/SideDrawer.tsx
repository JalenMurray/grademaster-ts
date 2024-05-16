import Link from 'next/link';
import Image from 'next/image';
import SemesterDropdown from './SemesterDropdown';
import { cookiesClient } from '@/app/utils/amplify-utils';
import { Semester } from '@/app/lib/definitions';
import OpenModalButton from '../OpenModalButton';

async function getData() {
  const semesters = await cookiesClient.models.Semester.list();
  return semesters.data;
}

export default async function SideDrawer() {
  const semesters = await getData();

  const seasonOrder = { WINTER: 1, SPRING: 2, SUMMER: 3, FALL: 4 };

  const sortSemesters = (a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return seasonOrder[b.season] - seasonOrder[a.season];
  };

  return (
    <div className="drawer-side z-40 border-r-2 border-neutral pb-20">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" />
      <aside className="min-h-screen w-80">
        <div className="sticky top-0 z-20 mb-4 pb-4" id="brand">
          <Link href="/" className="btn btn-ghost p-2 m-2 h-14">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              className="rounded-2xl mb-3"
              alt="GradeMaster Logo"
            />
            <div className="font-title inline-flex text-lg md:text-2xl">GradeMaster</div>
          </Link>
        </div>
        <ul className="menu px-4 py-0">
          <li>
            <h2 className="menu-title">Semesters</h2>
            <ul>
              <li>
                <OpenModalButton modalId="new_semester_modal" btnClasses="btn-ghost group">
                  New Semester
                </OpenModalButton>
              </li>
              {semesters.sort(sortSemesters).map((semester) => (
                <li key={semester.id}>
                  <SemesterDropdown semester={semester as Semester} />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
}
