'use client';

import { SearchIndices, getFilteredResults } from '@/app/utils/documentationSearch';
import { SearchRounded } from '@mui/icons-material';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search() {
  const [results, setResults] = useState<SearchIndices>([]);
  const [selected, setSelected] = useState<number>(0);
  const [hovering, setHovering] = useState<boolean>(false);
  const router = useRouter();

  function handleKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      (document.getElementById('documentation-search') as HTMLInputElement).select();
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      router.push(results[0].link);
      const search = document.getElementById('documentation-search') as HTMLInputElement;
      setResults([]);
      search.value = '';
      search.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selected + 1 < results.length - 1 || selected + 1 < 3) {
        setSelected(selected + 1);
      } else {
        setSelected(0);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selected !== 0) {
        setSelected(selected - 1);
      } else {
        setSelected(results.length > 3 ? 2 : results.length - 1);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleChange(e) {
    if (e.target.value === '') {
      setResults([]);
    } else {
      const filteredResults = getFilteredResults(e.target.value);
      setResults(filteredResults);
    }
  }

  return (
    <label className="relative mx-3 w-full">
      <div className="flex flex-col">
        <form>
          <label className="input input-bordered flex items-center gap-2">
            <SearchRounded />
            <input
              id="documentation-search"
              name="search"
              type="search"
              placeholder="Search…"
              autoComplete="off"
              spellCheck="false"
              aria-autocomplete="list"
              className="grow"
              onChange={handleChange}
              onBlur={() => setResults([])}
            />
            <div>
              <kbd className="kbd">ctrl</kbd>+<kbd className="kbd">k</kbd>
            </div>
          </label>
        </form>
        <ul
          role="listbox"
          className={clsx('absolute w-full menu p-2 z-10 mt-12', {
            hidden: results.length === 0,
          })}
          onMouseLeave={() => setHovering(false)}
        >
          {results.slice(0, 4).map((res, i) => (
            <li
              key={res.title}
              className={clsx('bg-base-200 rounded-box my-1 hover:bg-blue-400 hover:text-white', {
                'bg-blue-400 text-white': !hovering && i === selected,
              })}
              onMouseEnter={() => {
                setHovering(true);
                setSelected(i);
              }}
            >
              <Link href={res.link}>{res.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
}
