'use client';

import Image from 'next/image';
import Link from 'next/link';

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
          <Link href="/login">
            <button className="btn btn-primary text-lg">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
