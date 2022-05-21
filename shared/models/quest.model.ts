import { Item } from '../stores/items/item.model'

export interface Quest {
  completed: boolean
  id: number
  maxProgress: number
  progress: number
  quest: { id: number; string: string }
  rewardAmount: number
  rewardItem: Item
  type: 'daily' | 'weekly'
}
