import { forwardRef, FunctionComponent } from 'react';

interface Types {
    [key: string]: string;
}

type Props = {
    href?: string;
    type: string;
    click?: () => void;
};

const NavbarLink: FunctionComponent<Props> = forwardRef(({ href, children, type, click }, ref) => {
    const types: Types = {
        nav: 'text-wt-200-o hover:bg-wt-600 hover:text-wt-default px-3 py-2 rounded-md text-sm font-medium cursor-pointer',
        navSelected: 'bg-wt-800 text-wt-default px-3 py-2 rounded-md text-sm font-medium',
        hamburger: 'text-wt-200-o hover:bg-wt-600 hover:text-wt-default block px-3 py-2 rounded-md text-base font-medium cursor-pointer',
        hamburgerSelected: 'bg-wt-800 text-wt-default block px-3 py-2 rounded-md text-base font-medium',
        menu: 'block px-4 py-2 text-sm text-wt-600 hover:bg-wt-200 cursor-pointer',
        menuSelected: 'block px-4 py-2 text-sm text-wt-600 bg-wt-300 hover:bg-wt-400'
    };

    return (
        <>
            {/*
        // @ts-ignore */}
            < a className={types[type]} href={href} ref={ref} onClick={() => {
                if (click) {
                    click();
                }
            }}>
                {children}
            </a >
        </>
    );
});

NavbarLink.displayName = 'NavbarLink';

export default NavbarLink;