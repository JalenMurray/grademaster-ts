import Image from 'next/image';
import Link from 'next/link';

export default function Brand() {
  return (
    <>
      <Link href="/" className="btn btn-ghost p-2 m-2 h-14">
        <Image
          src="/logo.png"
          width={40}
          height={40}
          className="rounded-2xl mb-3"
          alt="GradeMaster Logo"
        />
        <div className="font-title inline-flex text-lg md:text-2xl">GradeMaster</div>
      </Link>
    </>
  );
}
