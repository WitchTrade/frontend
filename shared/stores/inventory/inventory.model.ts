import { Item } from '../items/item.model';

export interface Inventory {
    id: number;
    lastSynced: Date;
    inventoryItems: InventoryItem[];
    showInTrading: boolean;
    automaticSync: boolean;
    invSyncSetting: InvSyncSetting;
}

interface InvSyncSetting {
    syncMarket: boolean;
    mode: string;
    defaultPrice: number;
    defaultRecipePrice: number;
    rarity: string;
    keep: number;
    keepRecipe: number;
    ignoreWishlistItems: boolean;
}

interface InventoryItem {
    id: number;
    amount: number;
    item: Item;
}

export function createInventory(params: Partial<Inventory>) {
    return {
        id: params.id ? params.id : null,
        lastSynced: params.lastSynced ? params.lastSynced : null,
        inventoryItems: params.inventoryItems ? params.inventoryItems : [],
        showInTrading: params.showInTrading ? params.showInTrading : false,
        automaticSync: params.automaticSync ? params.automaticSync : false,
        invSyncSetting: params.invSyncSetting ? params.invSyncSetting : null,
    } as Inventory;
}

export interface InventoryChangeDTO {
    showInTrading: boolean;
    automaticSync: boolean;
}