import { DropdownValue } from '../../components/styles/Dropdown'

export enum FILTER_TYPE {
  ITEM,
  MARKET,
  NEWTRADE,
  IGNORELIST,
}

export interface ItemFilterValues {
  searchString: string
  tradeableOnly: boolean
  newOnly: boolean
  orderBy: DropdownValue
  orderDirection: DropdownValue
  itemCharacter: DropdownValue[]
  itemSlot: DropdownValue[]
  itemEvent: DropdownValue[]
  itemRarity: DropdownValue[]
  inventory: DropdownValue
}

export function createDefaultItemFilter(type: FILTER_TYPE): ItemFilterValues {
  return {
    searchString: '',
    tradeableOnly: false,
    newOnly: false,
    orderBy: orderByValues[0],
    orderDirection:
      type === FILTER_TYPE.MARKET
        ? orderDirectionValues[1]
        : orderDirectionValues[0],
    itemCharacter: [],
    itemSlot: [],
    itemEvent: [],
    itemRarity: [],
    inventory: inventoryValues[0],
  }
}

export const orderByValues: DropdownValue[] = [
  { key: 'tagRarity', displayName: 'Rarity' },
  { key: 'name', displayName: 'Name' },
  { key: 'tradeable', displayName: 'Tradeable' },
]

export const tradeableOrderByValues: DropdownValue[] = [
  { key: 'tagRarity', displayName: 'Rarity' },
  { key: 'name', displayName: 'Name' },
]

export const orderDirectionValues: DropdownValue[] = [
  { key: 'asc', displayName: 'Ascending Order' },
  { key: 'desc', displayName: 'Descending Order' },
]

export const itemCharacterValues: DropdownValue[] = [
  { id: 1, key: 'none', displayName: 'No Character' },
  { id: 2, key: 'hunter', displayName: 'Hunter' },
  { id: 3, key: 'witch', displayName: 'Witch' },
]

export const itemSlotValues: DropdownValue[] = [
  {
    id: 1,
    key: 'ingredient',
    displayName: 'Ingredient',
    imagePath: '/assets/images/slotIcons/ingredient.png',
  },
  {
    id: 12,
    key: 'recipe',
    displayName: 'Recipe',
    imagePath: '/assets/images/slotIcons/recipe.png',
  },
  {
    id: 2,
    key: 'body',
    displayName: 'Body',
    imagePath: '/assets/images/slotIcons/body.png',
  },
  {
    id: 11,
    key: 'broom',
    displayName: 'Broom',
    imagePath: '/assets/images/slotIcons/broom.png',
  },
  {
    id: 3,
    key: 'hat',
    displayName: 'Hat',
    imagePath: '/assets/images/slotIcons/hat.png',
  },
  {
    id: 4,
    key: 'head',
    displayName: 'Head',
    imagePath: '/assets/images/slotIcons/head.png',
  },
  {
    id: 8,
    key: 'lower body',
    displayName: 'Lower Body',
    imagePath: '/assets/images/slotIcons/lowerbody.png',
  },
  {
    id: 9,
    key: 'melee weapon',
    displayName: 'Melee Weapon',
    imagePath: '/assets/images/slotIcons/melee.png',
  },
  {
    id: 6,
    key: 'player icon',
    displayName: 'Player Icon',
    imagePath: '/assets/images/slotIcons/playericon.png',
  },
  {
    id: 10,
    key: 'projectile',
    displayName: 'Projectile',
    imagePath: '/assets/images/slotIcons/projectile.png',
  },
  {
    id: 5,
    key: 'skin color',
    displayName: 'Skin Color',
    imagePath: '/assets/images/slotIcons/skincolor.png',
  },
  {
    id: 7,
    key: 'upper body',
    displayName: 'Upper Body',
    imagePath: '/assets/images/slotIcons/upperbody.png',
  },
]

export const ignoreListItemSlotValues: DropdownValue[] = [
  {
    id: 12,
    key: 'recipe',
    displayName: 'Recipe',
    imagePath: '/assets/images/slotIcons/recipe.png',
  },
  {
    id: 2,
    key: 'body',
    displayName: 'Body',
    imagePath: '/assets/images/slotIcons/body.png',
  },
  {
    id: 11,
    key: 'broom',
    displayName: 'Broom',
    imagePath: '/assets/images/slotIcons/broom.png',
  },
  {
    id: 3,
    key: 'hat',
    displayName: 'Hat',
    imagePath: '/assets/images/slotIcons/hat.png',
  },
  {
    id: 4,
    key: 'head',
    displayName: 'Head',
    imagePath: '/assets/images/slotIcons/head.png',
  },
  {
    id: 8,
    key: 'lower body',
    displayName: 'Lower Body',
    imagePath: '/assets/images/slotIcons/lowerbody.png',
  },
  {
    id: 9,
    key: 'melee weapon',
    displayName: 'Melee Weapon',
    imagePath: '/assets/images/slotIcons/melee.png',
  },
  {
    id: 6,
    key: 'player icon',
    displayName: 'Player Icon',
    imagePath: '/assets/images/slotIcons/playericon.png',
  },
  {
    id: 10,
    key: 'projectile',
    displayName: 'Projectile',
    imagePath: '/assets/images/slotIcons/projectile.png',
  },
  {
    id: 5,
    key: 'skin color',
    displayName: 'Skin Color',
    imagePath: '/assets/images/slotIcons/skincolor.png',
  },
  {
    id: 7,
    key: 'upper body',
    displayName: 'Upper Body',
    imagePath: '/assets/images/slotIcons/upperbody.png',
  },
]

export const itemEventValues: DropdownValue[] = [
  { id: 1, key: 'none', displayName: 'No Event' },
  {
    id: 2,
    key: 'chinese newyear',
    displayName: 'Chinese New Year',
    imagePath: '/assets/images/eventIcons/chineseNewYear.png',
  },
  {
    id: 3,
    key: 'halloween',
    displayName: 'Halloween 2017',
    imagePath: '/assets/images/eventIcons/halloween.png',
  },
  {
    id: 4,
    key: 'halloween2018',
    displayName: 'Halloween 2018',
    imagePath: '/assets/images/eventIcons/halloween2018.png',
  },
  {
    id: 5,
    key: 'halloween2019',
    displayName: 'Halloween 2019',
    imagePath: '/assets/images/eventIcons/halloween2019.png',
  },
  {
    id: 6,
    key: 'halloween2020',
    displayName: 'Halloween 2020',
    imagePath: '/assets/images/eventIcons/halloween2020.png',
  },
  {
    id: 7,
    key: 'mystic sands',
    displayName: 'Mystic Sands',
    imagePath: '/assets/images/eventIcons/mysticSands.png',
  },
  {
    id: 8,
    key: 'plunderparty',
    displayName: 'Plunder Party',
    imagePath: '/assets/images/eventIcons/plunderparty.png',
  },
  {
    id: 9,
    key: 'springfever',
    displayName: 'Spring Fever',
    imagePath: '/assets/images/eventIcons/springfever.png',
  },
  {
    id: 10,
    key: 'summerevent',
    displayName: 'Summer',
    imagePath: '/assets/images/eventIcons/summer.png',
  },
  {
    id: 11,
    key: 'theater',
    displayName: 'Theater',
    imagePath: '/assets/images/eventIcons/theater.png',
  },
  {
    id: 12,
    key: 'winterdream',
    displayName: 'Winterdream 2017',
    imagePath: '/assets/images/eventIcons/winterdream.png',
  },
  {
    id: 13,
    key: 'winterdream2018',
    displayName: 'Winterdream 2018',
    imagePath: '/assets/images/eventIcons/winterdream2018.png',
  },
  {
    id: 14,
    key: 'winterdream2019',
    displayName: 'Winterdream 2019',
    imagePath: '/assets/images/eventIcons/winterdream2019.png',
  },
  {
    id: 15,
    key: 'winterdream2020',
    displayName: 'Winterdream 2020',
    imagePath: '/assets/images/eventIcons/winterdream2020.png',
  },
  {
    id: 16,
    key: 'winterdream2021',
    displayName: 'Winterdream 2021',
    imagePath: '/assets/images/eventIcons/winterdream2021.png',
  },
  {
    id: 17,
    key: 'winterdream witch',
    displayName: 'Winterdream Witch',
    imagePath: '/assets/images/eventIcons/winterdreamwitch.png',
  },
  {
    id: 18,
    key: 'witchforest',
    displayName: 'Witch Forest',
    imagePath: '/assets/images/eventIcons/witchforest.png',
  },
]

export const itemRarityValues: DropdownValue[] = [
  {
    id: 1,
    key: 'common',
    displayName: 'Common',
    imagePath: '/assets/svgs/rarity_circles/common.svg',
  },
  {
    id: 2,
    key: 'uncommon',
    displayName: 'Uncommon',
    imagePath: '/assets/svgs/rarity_circles/uncommon.svg',
  },
  {
    id: 3,
    key: 'unlock',
    displayName: 'Unlock',
    imagePath: '/assets/svgs/rarity_circles/unlock.svg',
  },
  {
    id: 4,
    key: 'eventrarity',
    displayName: 'Eventrarity',
    imagePath: '/assets/svgs/rarity_circles/eventrarity.svg',
  },
  {
    id: 5,
    key: 'rare',
    displayName: 'Rare',
    imagePath: '/assets/svgs/rarity_circles/rare.svg',
  },
  {
    id: 6,
    key: 'veryrare',
    displayName: 'Veryrare',
    imagePath: '/assets/svgs/rarity_circles/veryrare.svg',
  },
  {
    id: 7,
    key: 'whimsical',
    displayName: 'Whimsical',
    imagePath: '/assets/svgs/rarity_circles/whimsical.svg',
  },
  {
    id: 8,
    key: 'promo',
    displayName: 'Promo',
    imagePath: '/assets/svgs/rarity_circles/promo.svg',
  },
]

export const tradeableItemRarityValues: DropdownValue[] = [
  {
    id: 1,
    key: 'common',
    displayName: 'Common',
    imagePath: '/assets/svgs/rarity_circles/common.svg',
  },
  {
    id: 2,
    key: 'uncommon',
    displayName: 'Uncommon',
    imagePath: '/assets/svgs/rarity_circles/uncommon.svg',
  },
  {
    id: 5,
    key: 'rare',
    displayName: 'Rare',
    imagePath: '/assets/svgs/rarity_circles/rare.svg',
  },
  {
    id: 6,
    key: 'veryrare',
    displayName: 'Veryrare',
    imagePath: '/assets/svgs/rarity_circles/veryrare.svg',
  },
  {
    id: 7,
    key: 'whimsical',
    displayName: 'Whimsical',
    imagePath: '/assets/svgs/rarity_circles/whimsical.svg',
  },
]

export const inventoryValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'owned', displayName: 'Owned' },
  { key: 'duplicateown', displayName: 'Duplicates only' },
  { key: 'notowned', displayName: 'Not owned' },
]
