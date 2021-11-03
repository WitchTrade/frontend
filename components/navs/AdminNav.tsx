import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import NavbarLink from '../styles/NavbarLink';

const AdminNav: FunctionComponent = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center pt-3">
      <div className="mx-1">
        <Link href="/admin" passHref>
          <NavbarLink type={router.pathname === '/admin' ? 'navSelected' : 'nav'}>Users</NavbarLink>
        </Link>
      </div>
      <div className="mx-1">
        <Link href="/admin/logs" passHref>
          <NavbarLink type={router.pathname === '/admin/logs' ? 'navSelected' : 'nav'}>Logs</NavbarLink>
        </Link>
      </div>
    </div>
  );
};

export default AdminNav;
