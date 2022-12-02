import { useState } from 'react'
import { DropdownValue } from '../../components/styles/Dropdown'
import { InventoryChangeDTO } from '../stores/inventory/inventory.model'
import { inventoryService } from '../stores/inventory/inventory.service'

export const modeValues: DropdownValue[] = [
  { key: 'both', displayName: 'Both' },
  { key: 'new', displayName: 'Only new' },
  { key: 'existing', displayName: 'Only existing' },
]

export const itemRarityValues: DropdownValue[] = [
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

enum RARITY {
  WHIMSICAL = 'whimsical',
  VERYRARE = 'veryrare',
  RARE = 'rare',
  UNCOMMON = 'uncommon',
  COMMON = 'common',
}

export const getRarityStrings = (rarityNumber: number): string[] => {
  const rarityLength = Object.keys(RARITY).length
  const filler = new Array(rarityLength + 1).join('0')
  const negativeRarityLength = -Math.abs(rarityLength)

  const binaryRarityString = (filler + rarityNumber.toString(2)).slice(
    negativeRarityLength
  )

  const rarities: any[] = []

  for (const rarityEntry in RARITY) {
    if (binaryRarityString[Object.keys(RARITY).indexOf(rarityEntry)] === '1') {
      rarities.push(RARITY[rarityEntry])
    }
  }

  return rarities
}

export const getRarityNumber = (rarityStrings: string[]): number => {
  const rarityLength = Object.keys(RARITY).length
  const filler = new Array(rarityLength + 1).join('0')
  const fillerArray = [...filler]
  for (const rarity of rarityStrings) {
    const index = Object.keys(RARITY).indexOf(rarity.toUpperCase())
    fillerArray[index] = '1'
  }

  return parseInt(fillerArray.join(''), 2)
}

const useSyncSettingsHandler = () => {
  const [invLoading, setInvLoading] = useState(false)

  const syncInventory = async () => {
    setInvLoading(true)
    inventoryService.syncInventory().subscribe(() => {
      setInvLoading(false)
    })
  }

  const updateInventorySettings = (data: InventoryChangeDTO) => {
    inventoryService.updateInventory(data).subscribe()
  }

  return {
    invLoading,
    syncInventory,
    updateInventorySettings,
    modeValues,
    itemRarityValues,
  }
}

export default useSyncSettingsHandler
