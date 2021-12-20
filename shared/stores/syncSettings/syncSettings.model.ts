export interface SyncSettings {
  syncInventory: boolean;
  syncMarket: boolean;
  ms_mode: string;
  ms_rarity: number;
  ms_defaultPriceItem: number;
  ms_defaultPriceRecipe: number;
  ms_keepItem: number;
  ms_keepRecipe: number;
  ms_ignoreWishlistItems: boolean;
  ms_removeNoneOnStock: boolean;
}

export function createSyncSettings(syncSettings: Partial<SyncSettings>): SyncSettings {
  return {
    syncInventory: syncSettings.syncInventory || syncSettings.syncInventory === false ? syncSettings.syncInventory : false,
    syncMarket: syncSettings.syncMarket || syncSettings.syncMarket === false ? syncSettings.syncMarket : false,
    ms_mode: syncSettings.ms_mode ? syncSettings.ms_mode : 'both',
    ms_rarity: syncSettings.ms_rarity ? syncSettings.ms_rarity : 31,
    ms_defaultPriceItem: syncSettings.ms_defaultPriceItem ? syncSettings.ms_defaultPriceItem : 4,
    ms_defaultPriceRecipe: syncSettings.ms_defaultPriceRecipe ? syncSettings.ms_defaultPriceRecipe : 2,
    ms_keepItem: syncSettings.ms_keepItem ? syncSettings.ms_keepItem : 1,
    ms_keepRecipe: syncSettings.ms_keepRecipe ? syncSettings.ms_keepRecipe : 0,
    ms_ignoreWishlistItems: syncSettings.ms_ignoreWishlistItems || syncSettings.ms_ignoreWishlistItems === false ? syncSettings.ms_ignoreWishlistItems : true,
    ms_removeNoneOnStock: syncSettings.ms_removeNoneOnStock || syncSettings.ms_removeNoneOnStock === false ? syncSettings.ms_removeNoneOnStock : false,
  } as SyncSettings;
}
