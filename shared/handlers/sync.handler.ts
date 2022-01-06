import { selectAll } from '@ngneat/elf-entities';
import { useObservable } from '@ngneat/react-rxjs';
import { useEffect, useState } from 'react';
import { wantsBothValues } from '../../components/market/CreateNewTrade';
import { DropdownValue } from '../../components/styles/Dropdown';
import { InventoryChangeDTO } from '../stores/inventory/inventory.model';
import { inventoryService } from '../stores/inventory/inventory.service';
import { createNotification } from '../stores/notification/notification.model';
import { notificationService } from '../stores/notification/notification.service';
import { pricesStore } from '../stores/prices/prices.store';
import { syncSettingsStore } from '../stores/syncSettings/syncSettings.store';
import { userService } from '../stores/user/user.service';

export const modeValues: DropdownValue[] = [
  { key: 'both', displayName: 'Both' },
  { key: 'new', displayName: 'Only new' },
  { key: 'existing', displayName: 'Only existing' }
];

export const itemRarityValues: DropdownValue[] = [
  { key: 'common', displayName: 'Common', imagePath: '/assets/svgs/rarity_circles/common.svg' },
  { key: 'uncommon', displayName: 'Uncommon', imagePath: '/assets/svgs/rarity_circles/uncommon.svg' },
  { key: 'rare', displayName: 'Rare', imagePath: '/assets/svgs/rarity_circles/rare.svg' },
  { key: 'veryrare', displayName: 'Veryrare', imagePath: '/assets/svgs/rarity_circles/veryrare.svg' },
  { key: 'whimsical', displayName: 'Whimsical', imagePath: '/assets/svgs/rarity_circles/whimsical.svg' }
];

enum RARITY {
  WHIMSICAL = 'whimsical',
  VERYRARE = 'veryrare',
  RARE = 'rare',
  UNCOMMON = 'uncommon',
  COMMON = 'common'
}

export const getRarityStrings = (rarityNumber: number): string[] => {
  const rarityLength = Object.keys(RARITY).length;
  const filler = new Array(rarityLength + 1).join('0');
  const negativeRarityLength = -Math.abs(rarityLength);

  const binaryRarityString = (filler + rarityNumber.toString(2)).slice(negativeRarityLength);

  const rarities: any[] = [];

  for (const rarityEntry in RARITY) {
    if (binaryRarityString[Object.keys(RARITY).indexOf(rarityEntry)] === '1') {
      rarities.push(RARITY[rarityEntry]);
    }
  }

  return rarities;
};

export const getRarityNumber = (rarityStrings: string[]): number => {
  const rarityLength = Object.keys(RARITY).length;
  let filler = new Array(rarityLength + 1).join('0');
  const fillerArray = [...filler];
  for (const rarity of rarityStrings) {
    const index = Object.keys(RARITY).indexOf(rarity.toUpperCase());
    fillerArray[index] = '1';
  }

  return parseInt(fillerArray.join(''), 2);
};

const useSyncSettingsHandler = () => {
  const [syncSettings] = useObservable(syncSettingsStore);
  const [prices] = useObservable(pricesStore.pipe(selectAll()));

  const [invLoading, setInvLoading] = useState(false);
  const [ignoreListDialogOpen, setIgnoreListDialogOpen] = useState(false);

  const [localSyncSettings, setLocalSyncSettings] = useState<any>({
    syncInventory: false,
    syncMarket: false,
    mode: modeValues[0],
    rarity: itemRarityValues,
    mainPriceItem: prices.find(p => p.priceKey === 'dynamicRarity'),
    mainPriceAmountItem: 4,
    wantsBothItem: wantsBothValues.find(wbv => wbv.key === false),
    secondaryPriceItem: undefined,
    secondaryPriceAmountItem: 1,
    mainPriceRecipe: prices.find(p => p.priceKey === 'dynamicRarity'),
    mainPriceAmountRecipe: 2,
    wantsBothRecipe: wantsBothValues.find(wbv => wbv.key === false),
    secondaryPriceRecipe: undefined,
    secondaryPriceAmountRecipe: 1,
    keepItem: 1,
    keepRecipe: 0,
    ignoreWishlistItems: true,
    removeNoneOnStock: false,
    ignoreList: []
  });

  const [unsavedSettings, setUnsavedSettings] = useState(false);

  // set syncsettings when user inventory changes
  useEffect(() => {
    if (Object.keys(syncSettings).length === 0) {
      return;
    }
    let mode = modeValues.find(mo => mo.key === syncSettings.mode);
    if (!mode) {
      mode = modeValues[0];
    }
    const rarityStrings = getRarityStrings(syncSettings.rarity);
    let rarity = itemRarityValues.filter(ir => rarityStrings.includes(ir.key));
    if (!rarity) {
      rarity = itemRarityValues;
    }
    setLocalSyncSettings({
      syncInventory: syncSettings.syncInventory,
      syncMarket: syncSettings.syncMarket,
      mode,
      rarity,
      mainPriceItem: syncSettings.mainPriceItem,
      mainPriceAmountItem: syncSettings.mainPriceAmountItem,
      wantsBothItem: wantsBothValues.find(wbv => wbv.key === syncSettings.wantsBothItem),
      secondaryPriceItem: syncSettings.secondaryPriceItem,
      secondaryPriceAmountItem: syncSettings.secondaryPriceAmountItem,
      mainPriceRecipe: syncSettings.mainPriceRecipe,
      mainPriceAmountRecipe: syncSettings.mainPriceAmountRecipe,
      wantsBothRecipe: wantsBothValues.find(wbv => wbv.key === syncSettings.wantsBothRecipe),
      secondaryPriceRecipe: syncSettings.secondaryPriceRecipe,
      secondaryPriceAmountRecipe: syncSettings.secondaryPriceAmountRecipe,
      keepItem: syncSettings.keepItem,
      keepRecipe: syncSettings.keepRecipe,
      ignoreWishlistItems: syncSettings.ignoreWishlistItems,
      removeNoneOnStock: syncSettings.removeNoneOnStock,
      ignoreList: syncSettings.ignoreList,
    });
  }, [syncSettings]);

  useEffect(() => {
    if (
      localSyncSettings.syncInventory !== syncSettings.syncInventory ||
      localSyncSettings.syncMarket !== syncSettings.syncMarket ||
      localSyncSettings.mode.key !== syncSettings.mode ||
      getRarityNumber(localSyncSettings.rarity.map(r => r.key)) !== syncSettings.rarity ||
      !localSyncSettings.mainPriceItem && syncSettings.mainPriceItem ||
      localSyncSettings.mainPriceItem && !syncSettings.mainPriceItem ||
      localSyncSettings.mainPriceItem && syncSettings.mainPriceAmountItem && localSyncSettings.mainPriceItem.id !== syncSettings.mainPriceItem.id ||
      localSyncSettings.mainPriceAmountItem !== syncSettings.mainPriceAmountItem ||
      localSyncSettings.wantsBothItem.key !== syncSettings.wantsBothItem ||
      !localSyncSettings.secondaryPriceItem && syncSettings.secondaryPriceItem ||
      localSyncSettings.secondaryPriceItem && !syncSettings.secondaryPriceItem ||
      localSyncSettings.secondaryPriceItem && syncSettings.secondaryPriceItem && localSyncSettings.secondaryPriceItem.id !== syncSettings.secondaryPriceItem.id ||
      localSyncSettings.secondaryPriceAmountItem !== syncSettings.secondaryPriceAmountItem ||
      !localSyncSettings.mainPriceRecipe && syncSettings.mainPriceRecipe ||
      localSyncSettings.mainPriceRecipe && !syncSettings.mainPriceRecipe ||
      localSyncSettings.mainPriceRecipe && syncSettings.mainPriceRecipe && localSyncSettings.mainPriceRecipe.id !== syncSettings.mainPriceRecipe.id ||
      localSyncSettings.wantsBothRecipe.key !== syncSettings.wantsBothRecipe ||
      localSyncSettings.mainPriceAmountRecipe !== syncSettings.mainPriceAmountRecipe ||
      !localSyncSettings.secondaryPriceRecipe && syncSettings.secondaryPriceRecipe ||
      localSyncSettings.secondaryPriceRecipe && !syncSettings.secondaryPriceRecipe ||
      localSyncSettings.secondaryPriceRecipe && syncSettings.secondaryPriceRecipe && localSyncSettings.secondaryPriceRecipe.id !== syncSettings.secondaryPriceRecipe.id ||
      localSyncSettings.secondaryPriceAmountRecipe !== syncSettings.secondaryPriceAmountRecipe ||
      localSyncSettings.keepItem !== syncSettings.keepItem ||
      localSyncSettings.keepRecipe !== syncSettings.keepRecipe ||
      localSyncSettings.ignoreWishlistItems !== syncSettings.ignoreWishlistItems ||
      localSyncSettings.removeNoneOnStock !== syncSettings.removeNoneOnStock ||
      localSyncSettings.ignoreList !== syncSettings.ignoreList
    ) {
      setUnsavedSettings(true);
    } else {
      setUnsavedSettings(false);
    }

  }, [localSyncSettings]);

  const syncInventory = async () => {
    setInvLoading(true);
    inventoryService.syncInventory().subscribe(() => {
      setInvLoading(false);
    });
  };

  const updateInventorySettings = (data: InventoryChangeDTO) => {
    inventoryService.updateInventory(data).subscribe();
  };

  const updateSyncSettings = () => {
    if (
      isNaN(localSyncSettings.keepItem) ||
      isNaN(localSyncSettings.keepRecipe) ||
      localSyncSettings.mainPriceItem.withAmount && isNaN(localSyncSettings.mainPriceAmountItem) ||
      localSyncSettings.secondaryPriceItem?.withAmount && isNaN(localSyncSettings.secondaryPriceAmountItem) ||
      localSyncSettings.mainPriceRecipe.withAmount && isNaN(localSyncSettings.mainPriceAmountRecipe) ||
      localSyncSettings.secondaryPriceRecipe?.withAmount && isNaN(localSyncSettings.secondaryPriceAmountRecipe)
    ) {
      const notification = createNotification({
        content: 'Please fill out every field',
        duration: 5000,
        type: 'warning'
      });
      notificationService.addNotification(notification);
      return;
    }
    if (
      localSyncSettings.mainPriceItem.withAmount && localSyncSettings.mainPriceAmountItem === 0 ||
      localSyncSettings.secondaryPriceItem?.withAmount && localSyncSettings.secondaryPriceAmountItem === 0 ||
      localSyncSettings.mainPriceRecipe.withAmount && localSyncSettings.mainPriceAmountRecipe === 0 ||
      localSyncSettings.secondaryPriceRecipe?.withAmount && localSyncSettings.secondaryPriceAmountRecipe === 0
    ) {
      const notification = createNotification({
        content: 'Prices have to be 1 or higher',
        duration: 5000,
        type: 'warning'
      });
      notificationService.addNotification(notification);
      return;
    }
    if (!localSyncSettings.mainPriceAmountItem) {
      localSyncSettings.mainPriceAmountItem = 4;
    }
    if (!localSyncSettings.secondaryPriceAmountItem) {
      localSyncSettings.secondaryPriceAmountItem = 1;
    }
    if (!localSyncSettings.mainPriceAmountRecipe) {
      localSyncSettings.mainPriceAmountRecipe = 2;
    }
    if (!localSyncSettings.secondaryPriceAmountRecipe) {
      localSyncSettings.secondaryPriceAmountRecipe = 1;
    }
    userService.updateSyncSettings({
      ...localSyncSettings,
      mode: localSyncSettings.mode.key,
      rarity: getRarityNumber(localSyncSettings.rarity.map(r => r.key)),
      wantsBothItem: localSyncSettings.wantsBothItem.key,
      wantsBothRecipe: localSyncSettings.wantsBothRecipe.key,
    }).subscribe((res) => {
      if (res.ok) {
        setUnsavedSettings(false);
      }
    });
  };

  return {
    invLoading,
    ignoreListDialogOpen,
    setIgnoreListDialogOpen,
    prices,
    syncInventory,
    updateInventorySettings,
    unsavedSettings,
    localSyncSettings,
    setLocalSyncSettings,
    updateSyncSettings,
    modeValues,
    itemRarityValues
  };
};

export default useSyncSettingsHandler;
