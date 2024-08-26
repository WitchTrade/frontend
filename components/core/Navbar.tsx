import { Transition } from '@headlessui/react'
import { selectAllEntities } from '@ngneat/elf-entities'
import { useObservable } from '@ngneat/react-rxjs'
import dayjs from 'dayjs'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick'
import { inventoryStore } from '../../shared/stores/inventory/inventory.store'
import { ServerNotification } from '../../shared/stores/serverNotification/server-notification.model'
import { serverNotificationService } from '../../shared/stores/serverNotification/server-notification.service'
import { serverNotificationStore } from '../../shared/stores/serverNotification/server-notification.store'
import { themeStore } from '../../shared/stores/theme/theme.store'
import { userService } from '../../shared/stores/user/user.service'
import { userStore } from '../../shared/stores/user/user.store'
import NavbarLink from '../styles/NavbarLink'
import NotificationItem from '../styles/NotificationItem'
import Verified from '../styles/VerifiedSvg'

const Navbar: FunctionComponent = () => {
  const router = useRouter()

  const [theme] = useObservable(themeStore)

  const [user] = useObservable(userStore)
  const [inventory] = useObservable(inventoryStore)
  const [notifications] = useObservable(
    serverNotificationStore.pipe(selectAllEntities())
  )

  const [lastSynced, setLastSynced] = useState({
    old: false,
    lastSyncedString: '',
  })
  const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout>()

  const {
    show: showNotificationMenu,
    nodeRef: notificationMenuRef,
    toggleRef: notificationMenuToggleRef,
  } = useDetectOutsideClick(false)
  const {
    show: showUserMenu,
    nodeRef: userMenuRef,
    toggleRef: userMenuToggleRef,
  } = useDetectOutsideClick(false, true)
  const {
    show: showhamburgerMenu,
    nodeRef: hamburgerMenuRef,
    toggleRef: hamburgerMenuToggleRef,
  } = useDetectOutsideClick(false, true)

  useEffect(() => {
    if (inventory.id) {
      if (updateInterval) {
        clearInterval(updateInterval)
      }
      setLastSynced({
        old: dayjs().unix() - dayjs(inventory.lastSynced).unix() > 86400,
        lastSyncedString: dayjs().to(dayjs(inventory.lastSynced)),
      })
      const interval = setInterval(() => {
        setLastSynced({
          old: dayjs().unix() - dayjs(inventory.lastSynced).unix() > 86400,
          lastSyncedString: dayjs().to(dayjs(inventory.lastSynced)),
        })
      }, 60000)
      setUpdateInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventory])

  const logout = (): void => {
    userService.logout()
    router.push('/')
  }

  const deleteNotification = (notification: ServerNotification): void => {
    serverNotificationService.deleteNotification(notification).subscribe()
  }

  const deleteAllNotifications = () => {
    serverNotificationService.deleteAllNotifications().subscribe()
  }

  return (
    <div>
      <nav className='fixed top-0 z-40 w-full text-wt-text bg-wt-surface-dark'>
        <>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <div className='flex items-center'>
                <div className='shrink-0'>
                  <Link href='/'>
                    <a>
                      <p className='text-3xl font-bold'>
                        <span className='text-wt-accent'>Witch</span>Trade
                      </p>
                    </a>
                  </Link>
                </div>
                <div className='hidden md:block'>
                  <div className='flex items-baseline ml-10 space-x-4'>
                    <Link href='/search' passHref>
                      <NavbarLink
                        type={
                          router.pathname.startsWith('/search')
                            ? 'navSelected'
                            : 'nav'
                        }
                      >
                        Search
                      </NavbarLink>
                    </Link>
                    <Link href='/profiles' passHref>
                      <NavbarLink
                        type={
                          router.pathname.startsWith('/profiles')
                            ? 'navSelected'
                            : 'nav'
                        }
                      >
                        Profiles
                      </NavbarLink>
                    </Link>
                    <Link href='/items' passHref>
                      <NavbarLink
                        type={
                          router.pathname.startsWith('/items')
                            ? 'navSelected'
                            : 'nav'
                        }
                      >
                        Items
                      </NavbarLink>
                    </Link>
                    <Link href='/quests' passHref>
                      <NavbarLink
                        type={
                          router.pathname.startsWith('/quests')
                            ? 'navSelected'
                            : 'nav'
                        }
                      >
                        Quests
                      </NavbarLink>
                    </Link>
                    {user.roles?.length > 0 && (
                      <Link href='/admin' passHref>
                        <NavbarLink
                          type={
                            router.pathname.startsWith('/admin')
                              ? 'navSelected'
                              : 'nav'
                          }
                        >
                          Admin
                        </NavbarLink>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex'>
                <div className='flex items-center ml-4 md:ml-6'>
                  <div className='relative ml-3'>
                    <div>
                      {user.loggedIn && (
                        <div className='flex items-center'>
                          {inventory.id && (
                            <p className='hidden mr-2 text-sm lg:block'>
                              Inventory synced:{' '}
                              <span
                                className={
                                  lastSynced.old
                                    ? 'text-wt-warning'
                                    : 'text-wt-success'
                                }
                              >
                                {lastSynced.lastSyncedString}
                              </span>
                            </p>
                          )}
                          <button
                            className='flex items-center p-1 max-w-xs text-sm font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-wt-accent'
                            ref={notificationMenuToggleRef}
                          >
                            <span className='sr-only'>Open Notifications</span>
                            {(notifications.length === 0 && (
                              <div className='flex items-center w-6 h-6'>
                                {(showNotificationMenu && (
                                  <Image
                                    src={`/assets/svgs/bell/filled${
                                      theme?.type === 'light'
                                        ? 'Black'
                                        : 'White'
                                    }.svg`}
                                    height={24}
                                    width={24}
                                    alt='Notification Bell'
                                  />
                                )) || (
                                  <Image
                                    src={`/assets/svgs/bell/outlined${
                                      theme?.type === 'light'
                                        ? 'Black'
                                        : 'White'
                                    }.svg`}
                                    height={24}
                                    width={24}
                                    alt='Notification Bell'
                                  />
                                )}
                              </div>
                            )) || (
                              <div>
                                <div className='relative'>
                                  <p className='absolute top-0 left-0 text-base font-bold text-wt-accent-light'>
                                    {notifications.length < 10
                                      ? notifications.length
                                      : '•'}
                                  </p>
                                </div>
                                <div className='flex items-center ml-2 w-6 h-6'>
                                  {(showNotificationMenu && (
                                    <Image
                                      src={`/assets/svgs/bell/filledActive${
                                        theme?.type === 'light'
                                          ? 'Black'
                                          : 'White'
                                      }.svg`}
                                      height={24}
                                      width={24}
                                      alt='Notification Bell'
                                    />
                                  )) || (
                                    <Image
                                      src={`/assets/svgs/bell/outlinedActive${
                                        theme?.type === 'light'
                                          ? 'Black'
                                          : 'White'
                                      }.svg`}
                                      height={24}
                                      width={24}
                                      alt='Notification Bell'
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    <div ref={notificationMenuRef}>
                      <Transition
                        show={showNotificationMenu}
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <div className='overflow-auto absolute right-0 z-50 py-1 mt-2 w-64 max-h-60 bg-wt-surface rounded-md focus:outline-none ring-1 ring-black/5 shadow-lg origin-top-right'>
                          {notifications.length > 3 && (
                            <div className='flex justify-center mb-1'>
                              <button
                                className='flex items-center p-1 text-sm text-wt-light bg-wt-error-dark hover:bg-wt-error rounded-md focus:outline-none cursor-pointer'
                                onClick={deleteAllNotifications}
                              >
                                Delete all
                              </button>
                            </div>
                          )}
                          {notifications
                            .sort(
                              (a, b) =>
                                new Date(b.created).getTime() -
                                new Date(a.created).getTime()
                            )
                            .map((notification) => (
                              <NotificationItem
                                key={notification.id}
                                notification={notification}
                                deleteNotification={deleteNotification}
                              />
                            ))}
                          {notifications.length === 0 && (
                            <p className='block py-2 px-4 text-sm'>
                              No notifications
                            </p>
                          )}
                        </div>
                      </Transition>
                    </div>
                  </div>
                </div>
                <div className='hidden md:block'>
                  <div className='flex items-center ml-2'>
                    {/* Profile dropdown */}
                    <div className='relative'>
                      <div>
                        {user.loggedIn && (
                          <div className='flex items-center'>
                            <button
                              className='flex items-center p-1 max-w-xs text-sm font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-wt-accent'
                              ref={userMenuToggleRef}
                            >
                              <span className='sr-only'>Open user menu</span>
                              <div className='w-8 h-8'>
                                <Image
                                  className='rounded-full'
                                  src='/assets/images/piggy.png'
                                  height={32}
                                  width={32}
                                  alt='Profile Image'
                                />
                              </div>
                              <p className='ml-1 text-wt-accent-light'>
                                {user.displayName}
                              </p>
                              {user.verified && (
                                <div className='ml-1 w-5 h-5'>
                                  <Verified />
                                </div>
                              )}
                            </button>
                          </div>
                        )}
                        {!user.loggedIn && (
                          <Link href='/login' passHref>
                            <NavbarLink
                              type={
                                router.pathname.startsWith('/login') ||
                                router.pathname.startsWith('/register')
                                  ? 'navSelected'
                                  : 'nav'
                              }
                            >
                              Log in
                            </NavbarLink>
                          </Link>
                        )}
                      </div>
                      <div ref={userMenuRef}>
                        <Transition
                          show={showUserMenu}
                          as='div'
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <div className='absolute right-0 z-50 py-1 mt-2 w-48 bg-wt-surface rounded-md focus:outline-none ring-1 ring-black/5 shadow-lg origin-top-right'>
                            <Link href={`/@/${user.username}`} passHref>
                              <NavbarLink
                                type={
                                  router.pathname.startsWith(`/@/`) &&
                                  router.query.username === user.username
                                    ? 'menuSelected'
                                    : 'menu'
                                }
                              >
                                Profile
                              </NavbarLink>
                            </Link>
                            <Link href='/user/market' passHref>
                              <NavbarLink
                                type={
                                  router.pathname.startsWith('/user/market')
                                    ? 'menuSelected'
                                    : 'menu'
                                }
                              >
                                Manage Market
                              </NavbarLink>
                            </Link>
                            <Link href='/user/settings/customization' passHref>
                              <NavbarLink
                                type={
                                  router.pathname.startsWith('/user/settings')
                                    ? 'menuSelected'
                                    : 'menu'
                                }
                              >
                                Settings
                              </NavbarLink>
                            </Link>
                            <NavbarLink type='menu' onClick={logout}>
                              Log out
                            </NavbarLink>
                          </div>
                        </Transition>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex -mr-2 ml-2 md:hidden'>
                  <button
                    className='inline-flex justify-center items-center p-2 hover:bg-wt-hover rounded-md focus:outline-none focus:ring-2 focus:ring-wt-accent'
                    ref={hamburgerMenuToggleRef}
                  >
                    <span className='sr-only'>Open main menu</span>
                    {showhamburgerMenu ? (
                      <div className='block w-6 h-6'>
                        <Image
                          src={`/assets/svgs/close/${
                            theme?.type === 'light' ? 'black' : 'white'
                          }.svg`}
                          height={24}
                          width={24}
                          alt='Close'
                        />
                      </div>
                    ) : (
                      <div className='block w-6 h-6'>
                        <Image
                          src={`/assets/svgs/menu/${
                            theme?.type === 'light' ? 'black' : 'white'
                          }.svg`}
                          height={24}
                          width={24}
                          alt='Menu'
                        />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='md:hidden' ref={hamburgerMenuRef}>
            <Transition
              show={showhamburgerMenu}
              as='div'
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                <Link href='/search' passHref>
                  <NavbarLink
                    type={
                      router.pathname.startsWith('/search')
                        ? 'hamburgerSelected'
                        : 'hamburger'
                    }
                  >
                    Search
                  </NavbarLink>
                </Link>
                <Link href='/profiles' passHref>
                  <NavbarLink
                    type={
                      router.pathname.startsWith('/profiles')
                        ? 'hamburgerSelected'
                        : 'hamburger'
                    }
                  >
                    Profiles
                  </NavbarLink>
                </Link>
                <Link href='/items' passHref>
                  <NavbarLink
                    type={
                      router.pathname.startsWith('/items')
                        ? 'hamburgerSelected'
                        : 'hamburger'
                    }
                  >
                    Items
                  </NavbarLink>
                </Link>
                <Link href='/quests' passHref>
                  <NavbarLink
                    type={
                      router.pathname.startsWith('/quests')
                        ? 'hamburgerSelected'
                        : 'hamburger'
                    }
                  >
                    Quests
                  </NavbarLink>
                </Link>
                {user.roles?.length > 0 && (
                  <Link href='/admin' passHref>
                    <NavbarLink
                      type={
                        router.pathname.startsWith('/admin')
                          ? 'hamburgerSelected'
                          : 'hamburger'
                      }
                    >
                      Admin
                    </NavbarLink>
                  </Link>
                )}
              </div>
              {user.loggedIn && (
                <div className='pt-4 pb-3 border-t border-gray-700'>
                  <div className='flex items-center px-5'>
                    <div>
                      <Image
                        className='rounded-full'
                        src='/assets/images/piggy.png'
                        height={40}
                        width={40}
                        alt='Profile Image'
                      />
                    </div>
                    <div className='ml-3'>
                      <div className='flex text-base font-medium leading-none text-wt-accent-light'>
                        {user.displayName}
                        {user.verified && (
                          <div className='ml-1 w-5 h-5'>
                            <Verified />
                          </div>
                        )}
                      </div>
                      {inventory.id && (
                        <p className='mr-2 text-sm'>
                          Inventory synced:{' '}
                          <span
                            className={
                              lastSynced.old
                                ? 'text-yellow-500'
                                : 'text-green-500'
                            }
                          >
                            {lastSynced.lastSyncedString}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='px-2 mt-3 space-y-1'>
                    <Link href={`/@/${user.username}`} passHref>
                      <NavbarLink
                        type={
                          router.pathname.startsWith(`/@/`) &&
                          router.query.username === user.username
                            ? 'hamburgerSelected'
                            : 'hamburger'
                        }
                      >
                        Profile
                      </NavbarLink>
                    </Link>
                    <Link href='/user/market' passHref>
                      <NavbarLink
                        type={
                          router.pathname.startsWith('/user/market')
                            ? 'hamburgerSelected'
                            : 'hamburger'
                        }
                      >
                        Manage Market
                      </NavbarLink>
                    </Link>
                    <Link href='/user/settings/customization' passHref>
                      <NavbarLink
                        type={
                          router.pathname.startsWith('/user/settings')
                            ? 'hamburgerSelected'
                            : 'hamburger'
                        }
                      >
                        Settings
                      </NavbarLink>
                    </Link>
                    <NavbarLink type='hamburger' onClick={logout}>
                      Log out
                    </NavbarLink>
                  </div>
                </div>
              )}
              {!user.loggedIn && (
                <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                  <Link href='/login' passHref>
                    <NavbarLink
                      type={
                        router.pathname.startsWith('/login') ||
                        router.pathname.startsWith('/register')
                          ? 'hamburgerSelected'
                          : 'hamburger'
                      }
                    >
                      Log in
                    </NavbarLink>
                  </Link>
                </div>
              )}
            </Transition>
          </div>
        </>
      </nav>
    </div>
  )
}

export default Navbar
