import { useEffect, useState } from 'react';
import { tap } from 'rxjs';
import { selectAll } from '@ngneat/elf-entities';
import { useObservable } from '@ngneat/react-rxjs';
import { DropdownValue } from '../../components/styles/Dropdown';
import { Item } from '../stores/items/item.model';
import { AdminUser } from '../stores/admin/admin.model';
import { adminStore } from '../stores/admin/admin.store';

export interface AdminFilterValues {
  searchString: string;
  verified: DropdownValue;
  badge: DropdownValue;
  orderBy: DropdownValue;
  orderDirection: DropdownValue;
}

export function createDefaultAdminFilter(): AdminFilterValues {
  return {
    searchString: '',
    verified: verifiedValues[0],
    badge: badgeValues[0],
    orderBy: orderByValues[0],
    orderDirection: orderDirectionValues[0]
  };
}

export const orderByValues: DropdownValue[] = [
  { key: 'username', displayName: 'Name' },
  { key: 'created', displayName: 'Created' },
  { key: 'lastOnline', displayName: 'Last Online' }
];

export const orderDirectionValues: DropdownValue[] = [
  { key: 'asc', displayName: 'Ascending Order' },
  { key: 'desc', displayName: 'Descending Order' }
];

export const verifiedValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'verified', displayName: 'Verified' },
  { key: 'notverified', displayName: 'Not verified' }
];

export const badgeValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'artist', displayName: 'Artist', imagePath: '/assets/svgs/badges/artist.svg' },
  { key: 'beta', displayName: 'Beta User', imagePath: '/assets/svgs/badges/beta.svg' },
  { key: 'developer', displayName: 'Developer', imagePath: '/assets/svgs/badges/developer.svg' },
  { key: 'earlybird', displayName: 'Early Bird', imagePath: '/assets/svgs/badges/earlybird.svg' },
  { key: 'inspirational_witch', displayName: 'Inspirational Witch', imagePath: '/assets/svgs/badges/inspirational_witch.svg' }
];

const AdminFilterHandler = (itemsToLoad: number) => {

  const [adminUsers] = useObservable(adminStore.pipe(selectAll(), tap(users => users.sort((a, b) => a.username.localeCompare(b.username)))));

  const [filteredAdminUsers, setFilteredAdminUsers] = useState<AdminUser[]>([]);
  const [loadedAdminUsers, setLoadedAdminUsers] = useState<AdminUser[]>([]);

  const [adminFilterValues, setAdminFilterValues] = useState<AdminFilterValues>(createDefaultAdminFilter());

  useEffect(() => {
    filterAdminUsers();
  }, [adminUsers, adminFilterValues]);

  useEffect(() => {
    setLoadedAdminUsers(filteredAdminUsers.slice(0, itemsToLoad));
  }, [filteredAdminUsers]);

  const filterAdminUsers = () => {
    let filteredItems = adminUsers.filter((adminUser) => {
      const searchString = adminUser.username.toLowerCase().includes(adminFilterValues.searchString.toLowerCase());

      const verified = adminFilterValues.verified.key !== 'any' ? (adminUser.verified && adminFilterValues.verified.key === 'verified') || (!adminUser.verified && adminFilterValues.verified.key === 'notverified') : true;
      const badge = adminFilterValues.badge.key !== 'any' ? adminUser.badges.some(b => b.id === adminFilterValues.badge.key) : true;

      return searchString &&
        verified &&
        badge;
    });

    filteredItems.sort((a, b) => {
      const key = adminFilterValues.orderBy.key as keyof Item;
      let one = a[key];
      let two = b[key];
      if (one === undefined || two === undefined) {
        return 0;
      }
      let returnValue = 0;
      if (one > two) {
        returnValue = 1;
      }
      if (two > one) {
        returnValue = -1;
      }
      if (adminFilterValues.orderDirection.key === 'desc') {
        returnValue *= -1;
      }
      return returnValue;
    });

    setFilteredAdminUsers(filteredItems);
  };

  const loadMoreAdminUsers = () => {
    setLoadedAdminUsers(filteredAdminUsers.slice(0, loadedAdminUsers.length + 25));
  };

  const hasMoreAdminUsers = () => {
    return adminUsers.length > loadedAdminUsers.length;
  };

  return {
    totalAdminUserCount: adminUsers.length,
    filteredAdminUsers,
    loadedAdminUsers,
    loadMoreAdminUsers,
    hasMoreAdminUsers,
    adminFilterValues,
    setAdminFilterValues
  };
};

export default AdminFilterHandler;
