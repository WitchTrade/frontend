import { DropdownValue } from '../../components/styles/Dropdown'
import { orderDirectionValues } from './filterValues'

export interface AdminFilterValues {
  searchString: string
  verified: DropdownValue
  badge: DropdownValue
  orderBy: DropdownValue
  orderDirection: DropdownValue
}

export function createDefaultAdminFilter(): AdminFilterValues {
  return {
    searchString: '',
    verified: verifiedValues[0],
    badge: badgeValues[0],
    orderBy: adminOrderByValues[0],
    orderDirection: orderDirectionValues[0],
  }
}

export const adminOrderByValues: DropdownValue[] = [
  { key: 'username', displayName: 'Name' },
  { key: 'created', displayName: 'Created' },
  { key: 'lastOnline', displayName: 'Last Online' },
]

export const verifiedValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'verified', displayName: 'Verified' },
  { key: 'notverified', displayName: 'Not verified' },
]

export const badgeValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  {
    key: 'artist',
    displayName: 'Artist',
    imagePath: '/assets/svgs/badges/artist.svg',
  },
  {
    key: 'beta',
    displayName: 'Beta User',
    imagePath: '/assets/svgs/badges/beta.svg',
  },
  {
    key: 'completionist25',
    displayName: 'Occult Completionist (25%)',
    imagePath: '/assets/svgs/badges/completionist25.svg',
  },
  {
    key: 'completionist50',
    displayName: 'Fabled Completionist (50%)',
    imagePath: '/assets/svgs/badges/completionist50.svg',
  },
  {
    key: 'completionist75',
    displayName: 'Divine Completionist (75%)',
    imagePath: '/assets/svgs/badges/completionist75.svg',
  },
  {
    key: 'completionist100',
    displayName: 'Boundless Completionist (100%)',
    imagePath: '/assets/svgs/badges/completionist100.svg',
  },
  {
    key: 'developer',
    displayName: 'Developer',
    imagePath: '/assets/svgs/badges/developer.svg',
  },
  {
    key: 'earlybird',
    displayName: 'Early Bird',
    imagePath: '/assets/svgs/badges/earlybird.svg',
  },
  {
    key: 'moderator',
    displayName: 'Moderator',
    imagePath: '/assets/svgs/badges/moderator.svg',
  },
  {
    key: 'inspirational_witch',
    displayName: 'Inspirational Witch',
    imagePath: '/assets/svgs/badges/inspirational_witch.svg',
  },
]
