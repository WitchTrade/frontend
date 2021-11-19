import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import dayjs from 'dayjs';

import { createInventory, Inventory } from '../../shared/stores/inventory/inventory.model';
import { inventoryQuery } from '../../shared/stores/inventory/inventory.query';
import { ServerNotification } from '../../shared/stores/serverNotification/server-notification.model';
import { serverNotificationQuery } from '../../shared/stores/serverNotification/server-notification.query';
import { serverNotificationService } from '../../shared/stores/serverNotification/server-notification.service';
import { userService } from '../../shared/stores/user/user.service';
import NavbarLink from '../styles/NavbarLink';
import Image from 'next/image';
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick';
import useThemeProvider from '../../shared/providers/theme.provider';
import useUserProvider from '../../shared/providers/user.provider';
import NotificationItem from '../styles/NotificationItem';

const Navbar: FunctionComponent = () => {
  const router = useRouter();

  const { theme } = useThemeProvider();

  const { user } = useUserProvider();
  const [inventory, setInventory] = useState<Inventory>(createInventory({}));
  const [lastSynced, setLastSynced] = useState({ old: false, lastSyncedString: '' });
  const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout>();
  const [notifications, setNotifications] = useState<ServerNotification[]>([]);

  const { show: showNotificationMenu, nodeRef: notificationMenuRef, toggleRef: notificationMenuToggleRef } = useDetectOutsideClick(false);
  const { show: showUserMenu, nodeRef: userMenuRef, toggleRef: userMenuToggleRef } = useDetectOutsideClick(false, true);
  const { show: showhamburgerMenu, nodeRef: hamburgerMenuRef, toggleRef: hamburgerMenuToggleRef } = useDetectOutsideClick(false, true);

  useEffect(() => {
    const inventorySub = inventoryQuery.select().subscribe(setInventory);

    const notiSub = serverNotificationQuery.selectAll().subscribe(setNotifications);

    return (() => {
      inventorySub.unsubscribe();
      notiSub.unsubscribe();
    });
  }, []);

  useEffect(() => {
    if (inventory.id) {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
      setLastSynced({ old: dayjs().unix() - dayjs(inventory.lastSynced).unix() > 86400, lastSyncedString: dayjs().to(dayjs(inventory.lastSynced)) });
      const interval = setInterval(() => {
        setLastSynced({ old: dayjs().unix() - dayjs(inventory.lastSynced).unix() > 86400, lastSyncedString: dayjs().to(dayjs(inventory.lastSynced)) });
      }, 60000);
      setUpdateInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventory]);

  const logout = (): void => {
    userService.logout();
    router.push('/');
  };

  const deleteNotification = (notification: ServerNotification): void => {
    serverNotificationService.deleteNotification(notification, user).subscribe();
  };

  return (
    <div>
      <nav className="bg-wt-surface-dark text-wt-text fixed top-0 w-full z-40">
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a>
                      <p className="font-bold text-3xl"><span className="text-wt-accent">Witch</span>Trade</p>
                    </a>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/search" passHref>
                      <NavbarLink type={router.pathname.startsWith('/search') ? 'navSelected' : 'nav'}>Search</NavbarLink>
                    </Link>
                    <Link href="/profiles" passHref>
                      <NavbarLink type={router.pathname.startsWith('/profiles') ? 'navSelected' : 'nav'}>Profiles</NavbarLink>
                    </Link>
                    <Link href="/items" passHref>
                      <NavbarLink type={router.pathname.startsWith('/items') ? 'navSelected' : 'nav'}>Items</NavbarLink>
                    </Link>
                    <Link href="/gameservers" passHref>
                      <NavbarLink type={router.pathname.startsWith('/gameservers') ? 'navSelected' : 'nav'}>Game Servers</NavbarLink>
                    </Link>
                    {user.roles?.length > 0 &&
                      <Link href="/admin" passHref>
                        <NavbarLink type={router.pathname.startsWith('/admin') ? 'navSelected' : 'nav'}>Admin</NavbarLink>
                      </Link>
                    }
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="ml-3 relative">
                    <div>
                      {user.loggedIn &&
                        <div className="flex items-center">
                          {inventory.id &&
                            <p className="text-sm mr-2 hidden lg:block">Inventory synced: <span className={lastSynced.old ? 'text-wt-warning' : 'text-wt-success'}>{lastSynced.lastSyncedString}</span></p>
                          }
                          <button
                            className="max-w-xs rounded-full flex items-center text-sm font-bold focus:outline-none p-1 focus:ring-2 focus:ring-wt-accent"
                            ref={notificationMenuToggleRef}
                          >
                            <span className="sr-only">Open Notifications</span>
                            {(notifications.length === 0 &&
                              <div className="flex items-center h-6 w-6" >
                                {(showNotificationMenu &&
                                  <Image src={`/assets/svgs/bell/filled${theme?.type === 'light' ? 'Black' : 'White'}.svg`} height={24} width={24} alt="Notification Bell" />
                                ) ||
                                  <Image src={`/assets/svgs/bell/outlined${theme?.type === 'light' ? 'Black' : 'White'}.svg`} height={24} width={24} alt="Notification Bell" />
                                }
                              </div>
                            ) ||
                              <div>
                                <div className="relative">
                                  <p className="font-bold absolute top-0 left-0 text-base text-wt-accent-light">{notifications.length < 10 ? notifications.length : '•'}</p>
                                </div>
                                <div className="ml-2 flex items-center h-6 w-6" >
                                  {(showNotificationMenu &&
                                    <Image src={`/assets/svgs/bell/filledActive${theme?.type === 'light' ? 'Black' : 'White'}.svg`} height={24} width={24} alt="Notification Bell" />
                                  ) ||
                                    <Image src={`/assets/svgs/bell/outlinedActive${theme?.type === 'light' ? 'Black' : 'White'}.svg`} height={24} width={24} alt="Notification Bell" />
                                  }
                                </div>
                              </div>
                            }
                          </button>
                        </div>
                      }
                    </div>
                    <div ref={notificationMenuRef}>
                      <Transition
                        show={showNotificationMenu}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <div
                          className="origin-top-right absolute right-0 mt-2 w-64 rounded-md bg-wt-surface shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-auto max-h-60"
                        >
                          {notifications.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()).map(notification => (
                            <NotificationItem key={notification.id} notification={notification} deleteNotification={deleteNotification} />
                          ))}
                          {notifications.length === 0 &&
                            <p className="block px-4 py-2 text-sm">No notifications</p>
                          }
                        </div>
                      </Transition>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center ml-2">
                    {/* Profile dropdown */}
                    <div className="relative">
                      <div>
                        {user.loggedIn &&
                          <div className="flex items-center">
                            <button className="max-w-xs bg-wt-surface-dark rounded-full flex items-center text-sm font-bold p-1 focus:outline-none focus:ring-2 focus:ring-wt-accent" ref={userMenuToggleRef}>
                              <span className="sr-only">Open user menu</span>
                              <div className="h-8 w-8">
                                <Image className="rounded-full" src="/assets/images/piggy.png" height={32} width={32} alt="Profile Image" />
                              </div>
                              <p className="text-wt-accent-light ml-1">{user.displayName}</p>
                              {user.verified &&
                                <div className="ml-1 h-5 w-5">
                                  <Image src="/assets/svgs/verified.svg" height={20} width={20} alt="Verified" />
                                </div>
                              }
                            </button>
                          </div>
                        }
                        {!user.loggedIn &&
                          <Link href="/login" passHref>
                            <NavbarLink type={router.pathname.startsWith('/login') || router.pathname.startsWith('/register') ? 'navSelected' : 'nav'}>Log in</NavbarLink>
                          </Link>
                        }
                      </div>
                      <div ref={userMenuRef}>
                        <Transition
                          show={showUserMenu}
                          as="div"
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <div
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-wt-light ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                          >
                            <Link href={`/@/${user.username}`} passHref>
                              <NavbarLink type={router.pathname.startsWith(`/@/`) && router.query.username === user.username ? 'menuSelected' : 'menu'}>Profile</NavbarLink>
                            </Link>
                            <Link href="/user/market" passHref>
                              <NavbarLink type={router.pathname.startsWith('/user/market') ? 'menuSelected' : 'menu'}>Manage Market</NavbarLink>
                            </Link>
                            <Link href="/user/settings/customization" passHref>
                              <NavbarLink type={router.pathname.startsWith('/user/settings') ? 'menuSelected' : 'menu'}>Settings</NavbarLink>
                            </Link>
                            <NavbarLink type="menu" onClick={logout}>Log out</NavbarLink>
                          </div>
                        </Transition>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="-mr-2 ml-2 flex md:hidden">
                  <button className="bg-wt-surface-dark inline-flex items-center justify-center p-2 rounded-md text-wt-dark hover:bg-wt-hover focus:outline-none focus:ring-2 focus:ring-wt-accent" ref={hamburgerMenuToggleRef}>
                    <span className="sr-only">Open main menu</span>
                    {showhamburgerMenu ? (
                      <div className="block h-6 w-6">
                        <Image src={`/assets/svgs/close/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height={24} width={24} alt="Close" />
                      </div>
                    ) : (
                      <div className="block h-6 w-6">
                        <Image src={`/assets/svgs/menu/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height={24} width={24} alt="Menu" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden" ref={hamburgerMenuRef}>
            <Transition
              show={showhamburgerMenu}
              as="div"
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/search" passHref>
                  <NavbarLink type={router.pathname.startsWith('/search') ? 'hamburgerSelected' : 'hamburger'}>Search</NavbarLink>
                </Link>
                <Link href="/profiles" passHref>
                  <NavbarLink type={router.pathname.startsWith('/profiles') ? 'hamburgerSelected' : 'hamburger'}>Profiles</NavbarLink>
                </Link>
                <Link href="/items" passHref>
                  <NavbarLink type={router.pathname.startsWith('/items') ? 'hamburgerSelected' : 'hamburger'}>Items</NavbarLink>
                </Link>
                <Link href="/gameservers" passHref>
                  <NavbarLink type={router.pathname.startsWith('/gameservers') ? 'hamburgerSelected' : 'hamburger'}>Game Servers</NavbarLink>
                </Link>
                {user.roles?.length > 0 &&
                  <Link href="/admin" passHref>
                    <NavbarLink type={router.pathname.startsWith('/admin') ? 'hamburgerSelected' : 'hamburger'}>Admin</NavbarLink>
                  </Link>
                }
              </div>
              {user.loggedIn &&
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div>
                      <Image className="rounded-full" src="/assets/images/piggy.png" height={40} width={40} alt="Profile Image" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-wt-accent-light flex">
                        {user.displayName}
                        {user.verified &&
                          <div className="ml-1 h-5 w-5">
                            <Image src="/assets/svgs/verified.svg" height={20} width={20} alt="Verified" />
                          </div>
                        }
                      </div>
                      {inventory.id &&
                        <p className="text-sm mr-2">Inventory synced: <span className={lastSynced.old ? 'text-yellow-500' : 'text-green-500'}>{lastSynced.lastSyncedString}</span></p>
                      }
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Link href={`/@/${user.username}`} passHref>
                      <NavbarLink type={router.pathname.startsWith(`/@/`) && router.query.username === user.username ? 'hamburgerSelected' : 'hamburger'}>Profile</NavbarLink>
                    </Link>
                    <Link href="/user/market" passHref>
                      <NavbarLink type={router.pathname.startsWith('/user/market') ? 'hamburgerSelected' : 'hamburger'}>Manage Market</NavbarLink>
                    </Link>
                    <Link href="/user/settings/customization" passHref>
                      <NavbarLink type={router.pathname.startsWith('/user/settings') ? 'hamburgerSelected' : 'hamburger'}>Settings</NavbarLink>
                    </Link>
                    <NavbarLink type="hamburger" onClick={logout}>Log out</NavbarLink>
                  </div>
                </div>
              }
              {!user.loggedIn &&
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link href="/login" passHref>
                    <NavbarLink type={router.pathname.startsWith('/login') || router.pathname.startsWith('/register') ? 'hamburgerSelected' : 'hamburger'}>Log in</NavbarLink>
                  </Link>
                </div>
              }
            </Transition>
          </div>
        </>
      </nav>
    </div >
  );
};

export default Navbar;
