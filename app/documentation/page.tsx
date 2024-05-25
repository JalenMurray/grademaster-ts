import { AccountBox, Class, RocketLaunch } from '@mui/icons-material';
import Link from 'next/link';

function Card({ title, href, body }) {
  return (
    <Link href={href}>
      <div className="card w-96 h-48 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          {body}
        </div>
      </div>
    </Link>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-title text-xl md:text-4xl">GradeMaster Documentation</h1>
      <div className="flex gap-4">
        <Card
          title={
            <>
              <RocketLaunch />
              Getting Started
            </>
          }
          href={'/documentation/getting-started'}
          body={'Get Started'}
        />
        <Card
          title={
            <>
              <Class />
              Setup Basic Class
            </>
          }
          href={'/documentation/setup-basic-class'}
          body={'Follow a tutorial to setup an exmaple class'}
        />
        <Card
          title={
            <>
              <AccountBox />
              Guest Page
            </>
          }
          href={'/documentation/guest'}
          body={'See information about the guest class feature'}
        />
      </div>
    </div>
  );
}
