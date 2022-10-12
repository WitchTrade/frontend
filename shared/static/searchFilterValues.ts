import { DropdownValue } from '../../components/styles/Dropdown'
import { Item } from '../stores/items/item.model'
import { inventoryValues } from './filterValues'

export interface SearchFilterValues {
  item?: Item
  itemCharacter: DropdownValue
  itemSlot: DropdownValue
  itemEvent: DropdownValue
  itemRarity: DropdownValue
  inventory: DropdownValue
  wishlistOnly: boolean
}

export function createDefaultSearchFilter(): SearchFilterValues {
  return {
    itemCharacter: itemCharacterValues[0],
    itemSlot: itemSlotValues[0],
    itemEvent: itemEventValues[0],
    itemRarity: tradeableItemRarityValues[0],
    inventory: inventoryValues[0],
    wishlistOnly: false,
  }
}

export const itemCharacterValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'none', displayName: 'No Character' },
  { key: 'hunter', displayName: 'Hunter' },
  { key: 'witch', displayName: 'Witch' },
]

export const itemSlotValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  {
    key: 'ingredient',
    displayName: 'Ingredient',
    imagePath: '/assets/images/slotIcons/ingredient.png',
  },
  {
    key: 'recipe',
    displayName: 'Recipe',
    imagePath: '/assets/images/slotIcons/recipe.png',
  },
  {
    key: 'body',
    displayName: 'Body',
    imagePath: '/assets/images/slotIcons/body.png',
  },
  {
    key: 'broom',
    displayName: 'Broom',
    imagePath: '/assets/images/slotIcons/broom.png',
  },
  {
    key: 'hat',
    displayName: 'Hat',
    imagePath: '/assets/images/slotIcons/hat.png',
  },
  {
    key: 'head',
    displayName: 'Head',
    imagePath: '/assets/images/slotIcons/head.png',
  },
  {
    key: 'lower body',
    displayName: 'Lower Body',
    imagePath: '/assets/images/slotIcons/lowerbody.png',
  },
  {
    key: 'melee weapon',
    displayName: 'Melee Weapon',
    imagePath: '/assets/images/slotIcons/melee.png',
  },
  {
    key: 'player icon',
    displayName: 'Player Icon',
    imagePath: '/assets/images/slotIcons/playericon.png',
  },
  {
    key: 'projectile',
    displayName: 'Projectile',
    imagePath: '/assets/images/slotIcons/projectile.png',
  },
  {
    key: 'skin color',
    displayName: 'Skin Color',
    imagePath: '/assets/images/slotIcons/skincolor.png',
  },
  {
    key: 'upper body',
    displayName: 'Upper Body',
    imagePath: '/assets/images/slotIcons/upperbody.png',
  },
]

export const itemEventValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'none', displayName: 'No Event' },
  {
    key: 'chinese newyear',
    displayName: 'Chinese New Year',
    imagePath: '/assets/images/eventIcons/chineseNewYear.png',
  },
  {
    key: 'halloween',
    displayName: 'Halloween 2017',
    imagePath: '/assets/images/eventIcons/halloween.png',
  },
  {
    key: 'halloween2018',
    displayName: 'Halloween 2018',
    imagePath: '/assets/images/eventIcons/halloween2018.png',
  },
  {
    key: 'halloween2019',
    displayName: 'Halloween 2019',
    imagePath: '/assets/images/eventIcons/halloween2019.png',
  },
  {
    key: 'halloween2020',
    displayName: 'Halloween 2020',
    imagePath: '/assets/images/eventIcons/halloween2020.png',
  },
  {
    key: 'halloween2022',
    displayName: 'Halloween 2022',
    imagePath: '/assets/images/eventIcons/halloween2022.png',
  },
  {
    key: 'mystic sands',
    displayName: 'Mystic Sands',
    imagePath: '/assets/images/eventIcons/mysticSands.png',
  },
  {
    key: 'plunderparty',
    displayName: 'Plunder Party',
    imagePath: '/assets/images/eventIcons/plunderparty.png',
  },
  {
    key: 'springfever',
    displayName: 'Spring Fever',
    imagePath: '/assets/images/eventIcons/springfever.png',
  },
  {
    key: 'summerevent',
    displayName: 'Summer',
    imagePath: '/assets/images/eventIcons/summer.png',
  },
  {
    key: 'theater',
    displayName: 'Theater',
    imagePath: '/assets/images/eventIcons/theater.png',
  },
  {
    key: 'winterdream',
    displayName: 'Winterdream 2017',
    imagePath: '/assets/images/eventIcons/winterdream.png',
  },
  {
    key: 'winterdream2018',
    displayName: 'Winterdream 2018',
    imagePath: '/assets/images/eventIcons/winterdream2018.png',
  },
  {
    key: 'winterdream2019',
    displayName: 'Winterdream 2019',
    imagePath: '/assets/images/eventIcons/winterdream2019.png',
  },
  {
    key: 'winterdream2020',
    displayName: 'Winterdream 2020',
    imagePath: '/assets/images/eventIcons/winterdream2020.png',
  },
  {
    key: 'winterdream2021',
    displayName: 'Winterdream 2021',
    imagePath: '/assets/images/eventIcons/winterdream2021.png',
  },
  {
    key: 'winterdream witch',
    displayName: 'Winterdream Witch',
    imagePath: '/assets/images/eventIcons/winterdreamwitch.png',
  },
  {
    key: 'witchforest',
    displayName: 'Witch Forest',
    imagePath: '/assets/images/eventIcons/witchforest.png',
  },
]

export const itemRarityValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  {
    key: 'common',
    displayName: 'Common',
    imagePath: '/assets/svgs/rarity_circles/common.svg',
  },
  {
    key: 'uncommon',
    displayName: 'Uncommon',
    imagePath: '/assets/svgs/rarity_circles/uncommon.svg',
  },
  {
    key: 'unlock',
    displayName: 'Unlock',
    imagePath: '/assets/svgs/rarity_circles/unlock.svg',
  },
  {
    key: 'eventrarity',
    displayName: 'Eventrarity',
    imagePath: '/assets/svgs/rarity_circles/eventrarity.svg',
  },
  {
    key: 'rare',
    displayName: 'Rare',
    imagePath: '/assets/svgs/rarity_circles/rare.svg',
  },
  {
    key: 'veryrare',
    displayName: 'Veryrare',
    imagePath: '/assets/svgs/rarity_circles/veryrare.svg',
  },
  {
    key: 'whimsical',
    displayName: 'Whimsical',
    imagePath: '/assets/svgs/rarity_circles/whimsical.svg',
  },
  {
    key: 'promo',
    displayName: 'Promo',
    imagePath: '/assets/svgs/rarity_circles/promo.svg',
  },
]

export const tradeableItemRarityValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  {
    key: 'common',
    displayName: 'Common',
    imagePath: '/assets/svgs/rarity_circles/common.svg',
  },
  {
    key: 'uncommon',
    displayName: 'Uncommon',
    imagePath: '/assets/svgs/rarity_circles/uncommon.svg',
  },
  {
    key: 'rare',
    displayName: 'Rare',
    imagePath: '/assets/svgs/rarity_circles/rare.svg',
  },
  {
    key: 'veryrare',
    displayName: 'Veryrare',
    imagePath: '/assets/svgs/rarity_circles/veryrare.svg',
  },
  {
    key: 'whimsical',
    displayName: 'Whimsical',
    imagePath: '/assets/svgs/rarity_circles/whimsical.svg',
  },
]
