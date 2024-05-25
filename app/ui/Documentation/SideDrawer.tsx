import Image from 'next/image';
import Link from 'next/link';
import Brand from '../Brand';
import { Calculate, RocketLaunch } from '@mui/icons-material';

function SideLink({ href, title }: { href: string; title: string }) {
  return (
    <li>
      <Link href={`/documentation/${href}`}>{title}</Link>
    </li>
  );
}

export default function SideDrawer() {
  return (
    <div className="drawer-side z-40">
      <label htmlFor="documentation-drawer" aria-label="close sidebar" className="drawer-overlay" />
      <aside className="min-h-full w-80 bg-base-100">
        <div className="sticky top-0 z-20 mb-4 pb-4">
          <Brand />
        </div>
        <ul className="menu p-4">
          <li>
            <details>
              <summary className="group">
                <Link href="/documentation/getting-started">
                  <RocketLaunch /> Getting Started
                </Link>
              </summary>
              <ul>
                <li className="group">
                  <Link href="/documentation/guest">Using Guest Page</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary className="group">
                <Link href="/documentation/calculator">
                  <Calculate /> Grade Calculator
                </Link>
              </summary>
              <ul>
                <SideLink href="setup-basic-class" title="Setup Basic Class" />
                <SideLink href="structure" title="Structure" />
                <SideLink href="dynamic-updates" title="Dynamic Updates" />
                <SideLink href="customization" title="Customization" />
                <SideLink href="weight-locking" title="Weight Locking" />
                <SideLink href="default-values" title="Default Values" />
                <SideLink href="import-export" title="Importing and Exporting" />
                <SideLink href="syllabus-scanning" title="Syllabus Scanning" />
                <SideLink href="templates" title="Templates" />
              </ul>
            </details>
          </li>
        </ul>
      </aside>
    </div>
  );
}
