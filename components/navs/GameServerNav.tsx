import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import NavbarLink from '../styles/NavbarLink';

const GameServerNav: FunctionComponent = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center pt-3">
            <div className="mx-1">
                <Link href="/gameservers" passHref>
                    <NavbarLink type={router.pathname === '/gameservers' ? 'navSelected' : 'nav'}>Servers</NavbarLink>
                </Link>
            </div>
            <div className="mx-1">
                <Link href="/gameservers/stats" passHref>
                    <NavbarLink type={router.pathname === '/gameservers/stats' ? 'navSelected' : 'nav'}>Stats</NavbarLink>
                </Link>
            </div>
        </div>
    );
};

export default GameServerNav;