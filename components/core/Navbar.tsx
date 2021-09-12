import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import dayjs from 'dayjs';

import { createInventory, Inventory } from '../../shared/stores/inventory/inventory.model';
import { inventoryQuery } from '../../shared/stores/inventory/inventory.query';
import { ServerNotification } from '../../shared/stores/serverNotification/server-notification.model';
import { serverNotificationQuery } from '../../shared/stores/serverNotification/server-notification.query';
import { serverNotificationService } from '../../shared/stores/serverNotification/server-notification.service';
import { createUser, User } from '../../shared/stores/user/user.model';
import { userQuery } from '../../shared/stores/user/user.query';
import { userService } from '../../shared/stores/user/user.service';
import NavbarLink from '../styles/NavbarLink';
import Image from 'next/image';
import { Theme } from '../../shared/models/theme.model';
import themeService from '../../shared/services/theme.service';

const Navbar: FunctionComponent = () => {
    const router = useRouter();

    const [theme, setTheme] = useState<Theme>();

    const [userState, setUserState] = useState<User>(createUser({}));
    const [userInventory, setUserInventory] = useState<Inventory>(createInventory({}));
    const [lastSynced, setLastSynced] = useState({ old: false, lastSyncedString: '' });
    const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout>();
    const [notifications, setNotifications] = useState<ServerNotification[]>([]);

    const [customOpen, setCustomOpen] = useState(false);

    useEffect(() => {
        const themeSub = themeService.currentTheme$.subscribe(setTheme);

        const userSub = userQuery.select().subscribe(setUserState);

        const inventorySub = inventoryQuery.select().subscribe(setUserInventory);

        const notiSub = serverNotificationQuery.selectAll().subscribe(setNotifications);

        return (() => {
            themeSub.unsubscribe();
            userSub.unsubscribe();
            inventorySub.unsubscribe();
            notiSub.unsubscribe();
        });
    }, []);

    useEffect(() => {
        if (userInventory.id) {
            if (updateInterval) {
                clearInterval(updateInterval);
            }
            setLastSynced({ old: dayjs().unix() - dayjs(userInventory.lastSynced).unix() > 86400, lastSyncedString: dayjs().to(dayjs(userInventory.lastSynced)) });
            const interval = setInterval(() => {
                setLastSynced({ old: dayjs().unix() - dayjs(userInventory.lastSynced).unix() > 86400, lastSyncedString: dayjs().to(dayjs(userInventory.lastSynced)) });
            }, 60000);
            setUpdateInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInventory]);

    const logout = (): void => {
        userService.logout();
        router.push('/');
    };

    const deleteNotification = (notification: ServerNotification): void => {
        serverNotificationService.deleteNotification(notification, userState).subscribe();
    };

    return (
        <div>
            <Disclosure as="nav" className="bg-wt-surface-dark text-wt-text fixed top-0 w-full z-40">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <p className="font-bold text-3xl"><span className="text-wt-accent">Witch</span>Trade<span className="text-xl text-center text-wt-accent-light"> [Beta]</span></p>
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
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                {userState.loggedIn &&
                                                    <div className="flex items-center">
                                                        {userInventory.id &&
                                                            <p className="text-sm mr-2 hidden lg:block">Inventory synced: <span className={lastSynced.old ? 'text-wt-warning' : 'text-wt-success'}>{lastSynced.lastSyncedString}</span></p>
                                                        }
                                                        <Menu.Button onClickCapture={() => setCustomOpen(!customOpen)}
                                                            className="max-w-xs rounded-full flex items-center text-sm font-bold focus:outline-none">
                                                            <span className="sr-only">Open Notifications</span>
                                                            {(notifications.length === 0 &&
                                                                <>
                                                                    {(customOpen &&
                                                                        <Image src={`/assets/svgs/bell/filled${theme?.type === 'light' ? 'Black' : 'White'}.svg`} height={24} width={24} alt="Notification Bell" />
                                                                    ) ||
                                                                        <Image src={`/assets/svgs/bell/outlined${theme?.type === 'light' ? 'Black' : 'White'}.svg`} height={24} width={24} alt="Notification Bell" />
                                                                    }
                                                                </>
                                                            ) ||
                                                                <div>
                                                                    <div className="relative">
                                                                        <p className="font-bold absolute top-0 left-0 text-base text-wt-accent-light">{notifications.length < 10 ? notifications.length : '•'}</p>
                                                                    </div>
                                                                    <div className="ml-2 flex items-center" >
                                                                        {(customOpen &&
                                                                            <Image src={`/assets/svgs/bell/filledActive${theme?.type === 'light' ? 'Black' : 'White'}.svg`} height={24} width={24} alt="Notification Bell" />
                                                                        ) ||
                                                                            <Image src={`/assets/svgs/bell/outlinedActive${theme?.type === 'light' ? 'Black' : 'White'}.svg`} height={24} width={24} alt="Notification Bell" />
                                                                        }
                                                                    </div>
                                                                </div>
                                                            }
                                                        </Menu.Button>
                                                    </div>
                                                }
                                            </div>
                                            <Transition
                                                show={customOpen}
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    static
                                                    className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg py-1 bg-wt-light ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-auto max-h-60"
                                                >
                                                    {notifications.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()).map(notification => (
                                                        <Menu.Item key={notification.id}>
                                                            {(notification.link &&
                                                                <div className="flex justify-between items-center my-1">
                                                                    <a className="flex justify-between items-center hover:bg-wt-hover-light" href={notification.link} target="">
                                                                        {notification.iconLink &&
                                                                            <img className="rounded-md ml-1" width="40" src={notification.iconLink} alt={notification.text} />
                                                                        }
                                                                        <p className="block px-4 py-2 text-sm text-wt-dark">{notification.text}</p>
                                                                    </a>
                                                                    <button className="text-wt-dark bg-red-600 hover:bg-red-500 p-1 mr-1 rounded-md text-bg font-medium flex items-center" onClick={() => deleteNotification(notification)}>
                                                                        <Image src="/assets/svgs/bin/white.svg" height={24} width={24} alt="Bin" />
                                                                    </button>
                                                                </div>
                                                            ) ||
                                                                <div className="flex justify-between items-center">
                                                                    {notification.iconLink &&
                                                                        <img className="rounded-md m-1" width="40" src={notification.iconLink} alt={notification.text} />
                                                                    }
                                                                    <p className="block px-4 py-2 text-sm text-wt-dark">{notification.text}</p>
                                                                    <button className="text-wt-dark bg-red-600 hover:bg-red-500 p-1 mr-1 rounded-md text-bg font-medium flex items-center" onClick={() => deleteNotification(notification)}>
                                                                        <Image src="/assets/svgs/bin/white.svg" height={24} width={24} alt="Bin" />
                                                                    </button>
                                                                </div>
                                                            }
                                                        </Menu.Item>
                                                    ))}
                                                    {notifications.length === 0 &&
                                                        <Menu.Item>
                                                            <p className="block px-4 py-2 text-sm text-wt-dark">No notifications</p>
                                                        </Menu.Item>
                                                    }
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="flex items-center ml-2">
                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative">
                                                {({ open }) => (
                                                    <>
                                                        <div>
                                                            {userState.loggedIn &&
                                                                <div className="flex items-center">
                                                                    <Menu.Button className="max-w-xs bg-wt-surface-dark rounded-full flex items-center text-sm font-bold p-1 focus:outline-none focus:ring-2 focus:ring-wt-accent">
                                                                        <span className="sr-only">Open user menu</span>
                                                                        <Image className="rounded-full" src="/assets/images/piggy.png" height={32} width={32} alt="Profile Image" />
                                                                        <p className="text-wt-accent-light ml-1">{userState.displayName}</p>
                                                                    </Menu.Button>
                                                                </div>
                                                            }
                                                            {!userState.loggedIn &&
                                                                <Link href="/login" passHref>
                                                                    <NavbarLink type={router.pathname.startsWith('/login') || router.pathname.startsWith('/register') ? 'navSelected' : 'nav'}>Log in</NavbarLink>
                                                                </Link>
                                                            }
                                                        </div>
                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items
                                                                static
                                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-wt-light ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                                                            >
                                                                <Menu.Item>
                                                                    <Link href={`/profile/${userState.username}`} passHref>
                                                                        <NavbarLink type={router.pathname.startsWith(`/profile/${userState.username}`) ? 'menuSelected' : 'menu'}>Profile</NavbarLink>
                                                                    </Link>
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    <Link href="/user/market" passHref>
                                                                        <NavbarLink type={router.pathname.startsWith('/user/market') ? 'menuSelected' : 'menu'}>Manage Market</NavbarLink>
                                                                    </Link>
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    <Link href="/user/settings/customization" passHref>
                                                                        <NavbarLink type={router.pathname.startsWith('/user/settings/customization') ? 'menuSelected' : 'menu'}>Settings</NavbarLink>
                                                                    </Link>
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    <NavbarLink type="menu" onClick={logout}>Log out</NavbarLink>
                                                                </Menu.Item>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 ml-2 flex md:hidden">
                                        <Disclosure.Button className="bg-wt-surface-dark inline-flex items-center justify-center p-2 rounded-md text-wt-dark hover:bg-wt-hover focus:outline-none focus:ring-2 focus:ring-wt-accent">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <div className="block h-6 w-6">
                                                    <Image src={`/assets/svgs/close/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height={24} width={24} alt="Close" />
                                                </div>
                                            ) : (
                                                <div className="block h-6 w-6">
                                                    <Image src={`/assets/svgs/menu/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height={24} width={24} alt="Menu" />
                                                </div>
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Disclosure.Button as={Fragment}>
                                    <>
                                        <Link href="/search" passHref>
                                            <NavbarLink type={router.pathname.startsWith('/search') ? 'hamburgerSelected' : 'hamburger'}>Search</NavbarLink>
                                        </Link>
                                    </>
                                </Disclosure.Button>
                                <Disclosure.Button as={Fragment}>
                                    <>
                                        <Link href="/profiles" passHref>
                                            <NavbarLink type={router.pathname.startsWith('/profiles') ? 'hamburgerSelected' : 'hamburger'}>Profiles</NavbarLink>
                                        </Link>
                                    </>
                                </Disclosure.Button>
                                <Disclosure.Button as={Fragment}>
                                    <>
                                        <Link href="/items" passHref>
                                            <NavbarLink type={router.pathname.startsWith('/items') ? 'hamburgerSelected' : 'hamburger'}>Items</NavbarLink>
                                        </Link>
                                    </>
                                </Disclosure.Button>
                                <Disclosure.Button as={Fragment}>
                                    <>
                                        <Link href="/gameservers" passHref>
                                            <NavbarLink type={router.pathname.startsWith('/gameservers') ? 'hamburgerSelected' : 'hamburger'}>Game Servers</NavbarLink>
                                        </Link>
                                    </>
                                </Disclosure.Button>
                            </div>
                            {userState.loggedIn &&
                                <div className="pt-4 pb-3 border-t border-gray-700">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <Image className="rounded-full" src="/assets/images/piggy.png" height={40} width={40} alt="Profile Image" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-wt-accent-light">{userState.displayName}</div>
                                            {userInventory.id &&
                                                <p className="text-sm mr-2">Inventory synced: <span className={lastSynced.old ? 'text-yellow-500' : 'text-green-500'}>{lastSynced.lastSyncedString}</span></p>
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-3 px-2 space-y-1">
                                        <Disclosure.Button as={Fragment}>
                                            <>
                                                <Link href={`/profile/${userState.username}`} passHref>
                                                    <NavbarLink type={router.pathname.startsWith(`/profile/${userState.username}`) ? 'hamburgerSelected' : 'hamburger'}>Profile</NavbarLink>
                                                </Link>
                                            </>
                                        </Disclosure.Button>
                                        <Disclosure.Button as={Fragment}>
                                            <>
                                                <Link href="/user/market" passHref>
                                                    <NavbarLink type={router.pathname.startsWith('/user/market') ? 'hamburgerSelected' : 'hamburger'}>Manage Market</NavbarLink>
                                                </Link>
                                            </>
                                        </Disclosure.Button>
                                        <Disclosure.Button as={Fragment}>
                                            <>
                                                <Link href="/user/settings/customization" passHref>
                                                    <NavbarLink type={router.pathname.startsWith('/user/settings/customization') ? 'hamburgerSelected' : 'hamburger'}>Settings</NavbarLink>
                                                </Link>
                                            </>
                                        </Disclosure.Button>
                                        <Disclosure.Button as={Fragment}>
                                            <>
                                                <NavbarLink type="hamburger" onClick={logout}>Log out</NavbarLink>
                                            </>
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            }
                            {!userState.loggedIn &&
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    <Disclosure.Button as={Fragment}>
                                        <>
                                            <Link href="/login" passHref>
                                                <NavbarLink type={router.pathname.startsWith('/login') || router.pathname.startsWith('/register') ? 'hamburgerSelected' : 'hamburger'}>Log in</NavbarLink>
                                            </Link>
                                        </>
                                    </Disclosure.Button>
                                </div>
                            }
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div >
    );
};

export default Navbar;