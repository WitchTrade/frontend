import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import NavbarLink from '../styles/NavbarLink'

const WitchItNav: FunctionComponent = () => {
  const router = useRouter()

  return (
    <div className='flex justify-center pt-3'>
      <div className='mx-1'>
        <Link href='/witchit/gameservers' passHref>
          <NavbarLink
            type={
              router.pathname === '/witchit/gameservers' ? 'navSelected' : 'nav'
            }
          >
            Gameservers
          </NavbarLink>
        </Link>
      </div>
      <div className='mx-1'>
        <Link href='/witchit/stats' passHref>
          <NavbarLink
            type={router.pathname === '/witchit/stats' ? 'navSelected' : 'nav'}
          >
            Stats
          </NavbarLink>
        </Link>
      </div>
      <div className='mx-1'>
        <Link href='/witchit/quests' passHref>
          <NavbarLink
            type={router.pathname === '/witchit/quests' ? 'navSelected' : 'nav'}
          >
            Quests
          </NavbarLink>
        </Link>
      </div>
    </div>
  )
}

export default WitchItNav
