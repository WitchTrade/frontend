import { createState, Store } from '@ngneat/elf'
import { withEntities } from '@ngneat/elf-entities'
import { Item } from './item.model'

const { state, config } = createState(withEntities<Item>())

export const itemsStore = new Store({ name: 'items', state, config })

export function itemRarityToIngredientId(rarity: string): number {
  const rarityToIngredientId: { [key: string]: number } = {
    common: 900,
    uncommon: 901,
    rare: 902,
    veryrare: 903,
    whimsical: 904,
  }

  return rarityToIngredientId[rarity]
}

export function itemRarityToColor(rarity: string) {
  switch (rarity) {
    case 'common':
      return '#7C7C7C'
    case 'uncommon':
      return '#ECECEC'
    case 'unlock':
      return '#C08051'
    case 'eventrarity':
      return '#FFE400'
    case 'rare':
      return '#45E53D'
    case 'veryrare':
      return '#1472FF'
    case 'whimsical':
      return '#FF00EA'
    case 'promo':
      return '#00E4FF'
    default:
      return ''
  }
}

export function getItemRarities(): string[] {
  return [
    'common',
    'uncommon',
    'unlock',
    'eventrarity',
    'rare',
    'veryrare',
    'whimsical',
    'promo',
  ]
}
