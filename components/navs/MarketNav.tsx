import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import NavbarLink from '../styles/NavbarLink';

const MarketNav: FunctionComponent = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center pt-3">
      <div className="mx-1">
        <Link href="/user/market/offers" passHref>
          <NavbarLink type={router.pathname.startsWith('/user/market/offers') ? 'navSelected' : 'nav'}>
            Offers
          </NavbarLink>
        </Link>
      </div>
      <div className="mx-1">
        <Link href="/user/market/wishlist" passHref>
          <NavbarLink type={router.pathname.startsWith('/user/market/wishlist') ? 'navSelected' : 'nav'}>
            Wishlist
          </NavbarLink>
        </Link>
      </div>
    </div>
  );
};

export default MarketNav;
