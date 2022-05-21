import { Item } from '../items/item.model'
import { Price } from '../prices/price.model'

export interface SyncSettings {
  syncInventory: boolean
  syncMarket: boolean
  mode: string
  rarity: number
  mainPriceItem: Price
  mainPriceAmountItem: number
  wantsBothItem: boolean
  secondaryPriceItem: Price
  secondaryPriceAmountItem: number
  mainPriceRecipe: Price
  mainPriceAmountRecipe: number
  wantsBothRecipe: boolean
  secondaryPriceRecipe: Price
  secondaryPriceAmountRecipe: number
  keepItem: number
  keepRecipe: number
  ignoreWishlistItems: boolean
  removeNoneOnStock: boolean
  ignoreList: Item[]
}

export function createSyncSettings(
  syncSettings: Partial<SyncSettings>
): SyncSettings {
  return {
    syncInventory:
      syncSettings.syncInventory || syncSettings.syncInventory === false
        ? syncSettings.syncInventory
        : false,
    syncMarket:
      syncSettings.syncMarket || syncSettings.syncMarket === false
        ? syncSettings.syncMarket
        : false,
    mode: syncSettings.mode ? syncSettings.mode : 'both',
    rarity: syncSettings.rarity ? syncSettings.rarity : 31,
    mainPriceItem: syncSettings.mainPriceItem
      ? syncSettings.mainPriceItem
      : null,
    mainPriceAmountItem: syncSettings.mainPriceAmountItem
      ? syncSettings.mainPriceAmountItem
      : 4,
    wantsBothItem:
      syncSettings.wantsBothItem || syncSettings.wantsBothItem === false
        ? syncSettings.wantsBothItem
        : false,
    secondaryPriceItem: syncSettings.secondaryPriceItem
      ? syncSettings.secondaryPriceItem
      : null,
    secondaryPriceAmountItem: syncSettings.secondaryPriceAmountItem
      ? syncSettings.secondaryPriceAmountItem
      : null,
    mainPriceRecipe: syncSettings.mainPriceRecipe
      ? syncSettings.mainPriceRecipe
      : null,
    mainPriceAmountRecipe: syncSettings.mainPriceAmountRecipe
      ? syncSettings.mainPriceAmountRecipe
      : 2,
    wantsBothRecipe:
      syncSettings.wantsBothRecipe || syncSettings.wantsBothRecipe === false
        ? syncSettings.wantsBothRecipe
        : false,
    secondaryPriceRecipe: syncSettings.secondaryPriceRecipe
      ? syncSettings.secondaryPriceRecipe
      : null,
    secondaryPriceAmountRecipe: syncSettings.secondaryPriceAmountRecipe
      ? syncSettings.secondaryPriceAmountRecipe
      : null,
    keepItem: syncSettings.keepItem ? syncSettings.keepItem : 0,
    keepRecipe: syncSettings.keepRecipe ? syncSettings.keepRecipe : 0,
    ignoreWishlistItems:
      syncSettings.ignoreWishlistItems ||
      syncSettings.ignoreWishlistItems === false
        ? syncSettings.ignoreWishlistItems
        : true,
    removeNoneOnStock:
      syncSettings.removeNoneOnStock || syncSettings.removeNoneOnStock === false
        ? syncSettings.removeNoneOnStock
        : false,
    ignoreList: syncSettings.ignoreList ? syncSettings.ignoreList : [],
  } as SyncSettings
}
