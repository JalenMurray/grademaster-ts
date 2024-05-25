'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logout from './ui/Logout';

export default function App() {
  return (
    <div className="hero min-h-[90vh]">
      <div className="hero-content flex-col lg:flex-row-reverse gap-24">
        <Image
          src="/logo.png"
          width={500}
          height={500}
          className="rounded-lg shadow-2xl"
          alt="GradeMaster Hero"
        />
        <div>
          <h1 className="text-5xl font-bold">Welcome to GradeMaster!</h1>
          <p className="py-6">
            Your go-to tool for tracking assignments, calculating grades, and more!
          </p>
          <p className="pb-6">
            GradeMaster is still currently in development, but the guest class feature is currently
            up and operational! With this you have access to the grade calculator feature of
            GradeMaster but the data you add will not persist. Documentation is also in the works.
          </p>
          <div className="flex gap-6">
            <Link href="/guest">
              <button className="btn btn-primary text-lg text-neutral">Guest Class</button>
            </Link>
            <Link href="/documentation">
              <button className="btn btn-primary text-lg text-neutral">Documentation</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
