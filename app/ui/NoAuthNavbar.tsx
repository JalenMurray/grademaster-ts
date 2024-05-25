import { Edit } from '@mui/icons-material';
import { Menu } from '@mui/material';
import Brand from './Brand';
import Search from './Documentation/Search';

export default function NoAuthNavBar() {
  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur duration-100 [transform:translate3d(0,0,0)] mb-16">
      <nav className="navbar w-full">
        <div className="flex flex-1 md:gap-1 lg:gap-2">
          <span
            className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
            data-tip="Menu"
          >
            <label
              aria-label="Open menu"
              htmlFor="documentation-drawer"
              className="btn btn-square btn-ghost drawer-button lg:hidden text-base-content"
            >
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </span>
          <div className="lg:hidden">
            <Brand />
          </div>
          <div className="hidden w-full max-w-sm lg:flex h-full">
            <Search />
          </div>
        </div>
      </nav>
    </div>
  );
}
