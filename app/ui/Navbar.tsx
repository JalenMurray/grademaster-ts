import ThemeToggle from '@/app/ui/ThemeToggle';

function Navbar() {
  return (
    <div className="sticky top-0 z-30 flex h-[10vh] w-full justify-center">
      <nav className="navbar w-full justify-end">
        <div className="flex-0">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
