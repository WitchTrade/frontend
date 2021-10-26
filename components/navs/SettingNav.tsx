import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import NavbarLink from '../styles/NavbarLink';

const SettingNav: FunctionComponent = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center pt-3">
      <div className="mx-1">
        <Link href="/user/settings/customization" passHref>
          <NavbarLink type={router.pathname.startsWith('/user/settings/customization') ? 'navSelected' : 'nav'}>Customization</NavbarLink>
        </Link>
      </div>
      <div className="mx-1">
        <Link href="/user/settings/account" passHref>
          <NavbarLink type={router.pathname.startsWith('/user/settings/account') ? 'navSelected' : 'nav'}>Account</NavbarLink>
        </Link>
      </div>
      <div className="mx-1">
        <Link href="/user/settings/sync" passHref>
          <NavbarLink type={router.pathname.startsWith('/user/settings/sync') ? 'navSelected' : 'nav'}>Sync</NavbarLink>
        </Link>
      </div>
    </div>
  );
};

export default SettingNav;
