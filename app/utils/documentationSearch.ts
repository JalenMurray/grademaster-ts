type SearchIndex = { title: string; link: string; tags: Array<string> };

export type SearchIndices = Array<SearchIndex>;

const BASE_URL = '/documentation';

export const searchIndices: SearchIndices = [
  {
    title: 'Getting Started',
    link: `${BASE_URL}/getting-started`,
    tags: ['Intro', 'Getting Started', 'Example', 'Tutorial'],
  },
  {
    title: 'Grade Calculator',
    link: `${BASE_URL}/calculator`,
    tags: ['Assignment Types', 'Assignments', 'Class', 'Progress Bar', 'Warnings', 'Desired Score'],
  },
  {
    title: 'Set up Basic Class',
    link: `${BASE_URL}/setup-basic-class`,
    tags: [
      'Tutorial',
      'Classes',
      'Assignment Types',
      'Assignment',
      'Basics',
      'Set up',
      'Setting up',
    ],
  },
];

export function getFilteredResults(query: string) {
  const titleResults = searchIndices.filter((index) =>
    index.title.toLowerCase().includes(query.toLowerCase())
  );
  const tagResults = searchIndices.filter((index) =>
    index.tags.reduce((acc, tag) => acc || tag.toLowerCase().includes(query.toLowerCase()), false)
  );
  return [...titleResults, ...tagResults.filter((index) => !titleResults.includes(index))];
}
