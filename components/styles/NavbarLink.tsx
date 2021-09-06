import { forwardRef, FunctionComponent } from 'react';

interface Types {
    [key: string]: string;
}

interface Props {
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    href?: string;
    type: string;
}

const NavbarLink: FunctionComponent<Props> = forwardRef(({ onClick, href, children, type }, ref?: React.LegacyRef<HTMLAnchorElement>) => {
    const types: Types = {
        nav: 'text-wt-text hover:bg-wt-hover px-3 py-2 rounded-md text-sm font-medium cursor-pointer',
        navSelected: 'bg-wt-selected-dark text-wt-text px-3 py-2 rounded-md text-sm font-medium',
        hamburger: 'text-wt-text hover:bg-wt-hover block px-3 py-2 rounded-md text-base font-medium cursor-pointer',
        hamburgerSelected: 'bg-wt-selected-dark text-wt-text block px-3 py-2 rounded-md text-base font-medium',
        menu: 'block px-4 py-2 text-sm text-wt-dark hover:bg-wt-hover-light cursor-pointer',
        menuSelected: 'block px-4 py-2 text-sm text-wt-dark bg-wt-selected-light hover:bg-wt-hover-light'
    };

    return (
        <a className={types[type]} href={href} onClick={onClick} ref={ref}>
            {children}
        </a>
    );
});

NavbarLink.displayName = 'NavbarLink';

export default NavbarLink;