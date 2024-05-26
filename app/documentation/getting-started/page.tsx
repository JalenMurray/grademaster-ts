import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-title text-xl md:text-4xl">Getting Started</h1>
      <p>
        To get started with GradeMaster you can either{' '}
        <Link href={'/documentation/guest'}>Use a Guest Class</Link> or sign in. Currently there is
        no sign in functionality so you must use the guest class.
      </p>
    </div>
  );
}
