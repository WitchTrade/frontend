import { forwardRef, FunctionComponent, KeyboardEvent } from 'react';

interface Types {
    [key: string]: string;
}

interface Props {
    onClick?: any;
    href?: string;
    type: string;
}

const defaultStyle = "px-3 py-2 focus:outline-none ";

const NavbarLink: FunctionComponent<Props> = forwardRef(({ onClick, href, children, type }, ref?: React.LegacyRef<HTMLAnchorElement>) => {
    const types: Types = {
        action: 'bg-wt-selected-dark hover:bg-wt-hover rounded-md text-sm font-medium cursor-pointer focus:ring-2 focus:ring-wt-accent',
        nav: 'hover:bg-wt-hover rounded-md text-sm font-medium cursor-pointer focus:ring-2 focus:ring-wt-accent',
        navSelected: 'bg-wt-selected-dark rounded-md text-sm font-medium focus:ring-2 focus:ring-wt-accent',
        hamburger: 'hover:bg-wt-hover block rounded-md text-base font-medium cursor-pointer focus:ring-2 focus:ring-wt-accent',
        hamburgerSelected: 'bg-wt-selected-dark block rounded-md text-base font-medium focus:ring-2 focus:ring-wt-accent',
        menu: 'block px-4 text-sm text-wt-dark hover:bg-wt-hover-light cursor-pointer',
        menuSelected: 'block px-4 text-sm text-wt-dark bg-wt-selected-light hover:bg-wt-hover-light'
    };

    const checkKeyPress = (e: KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === 'Enter') {
            onClick();
        }
    };

    return (
        <a className={defaultStyle + types[type]} href={href} onClick={onClick} ref={ref} tabIndex={0} onKeyPress={checkKeyPress}>
            {children}
        </a>
    );
});

NavbarLink.displayName = 'NavbarLink';

export default NavbarLink;