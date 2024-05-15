import ThemeToggle from '@/app/ui/ThemeToggle';
import { AccountBox } from '@mui/icons-material';
import { fetchUserAttributes } from 'aws-amplify/auth';
import Link from 'next/link';
import { User } from '../lib/definitions';

async function getData() {
  const userInfo: User = (await fetchUserAttributes()) as User;
  return userInfo;
}

export default async function Navbar() {
  const userInfo = await getData();

  return (
    <div className="sticky top-0 z-30 flex h-[10vh] w-full justify-center">
      <nav className="navbar w-full justify-end">
        <div className="flex-0">
          <ThemeToggle />
          <Link
            id="account-button"
            href="/account"
            className="mx-3 btn btn-ghost drawer-button font-normal"
          >
            <AccountBox /> {userInfo.email}
          </Link>
        </div>
      </nav>
    </div>
  );
}
