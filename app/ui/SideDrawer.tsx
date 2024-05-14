import Link from 'next/link';
import Image from 'next/image';

function SideDrawer() {
  return (
    <div className="drawer-side z-40 border-r-2 border-neutral">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" />
      <aside className="min-h-screen w-80">
        <div className="sticky top-0 z-20 mb-4" id="brand">
          <Link href="/" className="btn btn-ghost p-2">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              className="rounded-2xl mb-3"
              alt="GradeMaster Logo"
            />
            <div className="font-title inline-flex text-lg md:text-2xl">GradeMaster</div>
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default SideDrawer;
