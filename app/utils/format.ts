import { Semester } from '../lib/definitions';

export function getSemesterStr(semester: Semester) {
  return `${semester.season} ${semester.year}`;
}

export function formatFloat(num, n) {
  if (num) {
    if (typeof num === 'string') {
      return parseFloat(parseFloat(num).toFixed(n));
    }
    return parseFloat(num.toFixed(n));
  }
  return '';
}

export const linkClasses = 'text-blue-300 hover:text-blue-500';
