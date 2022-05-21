import { forwardRef, FunctionComponent, KeyboardEvent, ReactNode } from 'react'

interface Types {
  [key: string]: string
}

interface Props {
  children: ReactNode
  onClick?: any
  href?: string
  type: string
}

const defaultStyle = 'px-3 py-2 focus:outline-none flex items-center '

const NavbarLink: FunctionComponent<Props> = forwardRef(
  (
    { onClick, href, children, type },
    ref?: React.LegacyRef<HTMLAnchorElement>
  ) => {
    const types: Types = {
      info: 'rounded-md text-sm font-medium cursor-pointer focus:ring-2 focus:ring-wt-accent text-wt-light bg-wt-info-dark hover:bg-wt-info',
      nav: 'hover:bg-wt-hover rounded-md text-sm font-medium cursor-pointer focus:ring-2 focus:ring-wt-accent',
      navSelected:
        'bg-wt-selected rounded-md text-sm font-medium focus:ring-2 focus:ring-wt-accent',
      hamburger:
        'hover:bg-wt-hover block rounded-md text-base font-medium cursor-pointer focus:ring-2 focus:ring-wt-accent',
      hamburgerSelected:
        'bg-wt-selected block rounded-md text-base font-medium focus:ring-2 focus:ring-wt-accent',
      menu: 'block px-4 text-sm hover:bg-wt-hover cursor-pointer',
      menuSelected: 'block px-4 text-sm bg-wt-selected hover:bg-wt-hover',
    }

    const checkKeyPress = (e: KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === 'Enter') {
        onClick()
      }
    }

    return (
      <a
        className={defaultStyle + types[type]}
        href={href}
        onClick={onClick}
        ref={ref}
        tabIndex={0}
        onKeyPress={checkKeyPress}
      >
        {children}
      </a>
    )
  }
)

NavbarLink.displayName = 'NavbarLink'

export default NavbarLink
