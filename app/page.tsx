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
            GradeMaster but the data you add will not persist.
          </p>
          <Link href="/guest">
            <button className="btn btn-primary text-lg text-neutral">Open Guest Class</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
