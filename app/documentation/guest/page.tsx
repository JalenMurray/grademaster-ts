import Link from 'next/link';

export default function Page() {
  const linkClasses = 'text-blue-300 hover:text-blue-500';

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-title text-xl md:text-4xl">Using Guest Page</h1>
      <p>
        The{' '}
        <Link className={linkClasses} href="/guest">
          guest page
        </Link>{' '}
        in grademaster allows you to use the functionality of the{' '}
        <Link className={linkClasses} href="/documentation/calculator">
          grade calculator
        </Link>{' '}
        without being logged in. This however, means that your data will not save between sessions.
        If you leave the page your data will be lost.
      </p>
      <p>
        The guest page does, however, include{' '}
        <Link className={linkClasses} href="/documentation/import-export">
          import and export
        </Link>{' '}
        functionality which can allow you to save your created classes and then import them again
        when you come back. But this must be done manually by the user.
      </p>
    </div>
  );
}
