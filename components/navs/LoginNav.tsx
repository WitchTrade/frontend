import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import NavbarLink from '../styles/NavbarLink';


const LoginNav: FunctionComponent = () => {
    const router = useRouter();

    return (
        <>
            <div className="flex justify-center pt-3">
                <div className="mx-1">
                    <Link href="/login" passHref>
                        <NavbarLink type={router.pathname.startsWith('/login') ? 'navSelected' : 'nav'}>Login</NavbarLink>
                    </Link>
                </div>
                <div className="mx-1">
                    <Link href="/register" passHref>
                        <NavbarLink type={router.pathname.startsWith('/register') ? 'navSelected' : 'nav'}>Register</NavbarLink>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default LoginNav;