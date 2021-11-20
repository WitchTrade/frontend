import { useEffect, useState } from 'react';
import { DropdownValue } from '../../components/styles/Dropdown';
import useSyncSettingsProvider from '../providers/syncSettings.provider';
import useUserProvider from '../providers/user.provider';
import { InventoryChangeDTO } from '../stores/inventory/inventory.model';
import { inventoryService } from '../stores/inventory/inventory.service';
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

export const updateSyncSettingsRarity = (localSyncSettings: any, setLocalSyncSettings: any, rarity: DropdownValue) => {
  if (localSyncSettings.ms_rarity.some(r => r.key === rarity.key)) {
    if (localSyncSettings.ms_rarity.length === 1) {
      return;
    }
    const newRarities = [...localSyncSettings.ms_rarity];
    const index = newRarities.indexOf(rarity);
    newRarities[index] = newRarities[newRarities.length - 1];
    newRarities.pop();
    newRarities.sort(function (a, b) {
      return Object.keys(RARITY).indexOf(b.key.toUpperCase()) - Object.keys(RARITY).indexOf(a.key.toUpperCase());
    });
    setLocalSyncSettings({ ...localSyncSettings, ms_rarity: newRarities });
  } else {
    const newRarities = [...localSyncSettings.ms_rarity];
    newRarities.push(rarity);
    newRarities.sort(function (a, b) {
      return Object.keys(RARITY).indexOf(b.key.toUpperCase()) - Object.keys(RARITY).indexOf(a.key.toUpperCase());
    });
    setLocalSyncSettings({ ...localSyncSettings, ms_rarity: newRarities });
  }
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
  const { user } = useUserProvider();
  const { syncSettings } = useSyncSettingsProvider();

  const [invLoading, setInvLoading] = useState(false);

  const [localSyncSettings, setLocalSyncSettings] = useState({
    syncInventory: false,
    syncMarket: false,
    ms_mode: modeValues[0],
    ms_rarity: itemRarityValues,
    ms_defaultPriceItem: 4,
    ms_defaultPriceRecipe: 1,
    ms_keepItem: 1,
    ms_keepRecipe: 0,
    ms_ignoreWishlistItems: true,
    ms_removeNoneOnStock: false
  });

  const [unsavedSettings, setUnsavedSettings] = useState(false);

  // set syncsettings when user inventory changes
  useEffect(() => {
    if (Object.keys(syncSettings).length === 0) {
      return;
    }
    let ms_mode = modeValues.find(mo => mo.key === syncSettings.ms_mode);
    if (!ms_mode) {
      ms_mode = modeValues[0];
    }
    const rarityStrings = getRarityStrings(syncSettings.ms_rarity);
    let ms_rarity = itemRarityValues.filter(ir => rarityStrings.includes(ir.key));
    if (!ms_rarity) {
      ms_rarity = itemRarityValues;
    }
    setLocalSyncSettings({
      syncInventory: syncSettings.syncInventory,
      syncMarket: syncSettings.syncMarket,
      ms_mode,
      ms_rarity,
      ms_defaultPriceItem: syncSettings.ms_defaultPriceItem,
      ms_defaultPriceRecipe: syncSettings.ms_defaultPriceRecipe,
      ms_keepItem: syncSettings.ms_keepItem,
      ms_keepRecipe: syncSettings.ms_keepRecipe,
      ms_ignoreWishlistItems: syncSettings.ms_ignoreWishlistItems,
      ms_removeNoneOnStock: syncSettings.ms_removeNoneOnStock
    });
  }, [syncSettings]);

  useEffect(() => {
    if (
      localSyncSettings.syncInventory !== syncSettings.syncInventory ||
      localSyncSettings.syncMarket !== syncSettings.syncMarket ||
      localSyncSettings.ms_mode.key !== syncSettings.ms_mode ||
      getRarityNumber(localSyncSettings.ms_rarity.map(r => r.key)) !== syncSettings.ms_rarity ||
      localSyncSettings.ms_defaultPriceItem !== syncSettings.ms_defaultPriceItem ||
      localSyncSettings.ms_defaultPriceRecipe !== syncSettings.ms_defaultPriceRecipe ||
      localSyncSettings.ms_keepItem !== syncSettings.ms_keepItem ||
      localSyncSettings.ms_keepRecipe !== syncSettings.ms_keepRecipe ||
      localSyncSettings.ms_ignoreWishlistItems !== syncSettings.ms_ignoreWishlistItems ||
      localSyncSettings.ms_removeNoneOnStock !== syncSettings.ms_removeNoneOnStock
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
    userService.updateSyncSettings({ ...localSyncSettings, ms_mode: localSyncSettings.ms_mode.key, ms_rarity: getRarityNumber(localSyncSettings.ms_rarity.map(r => r.key)) }).subscribe((res) => {
      if (res.ok) {
        setUnsavedSettings(false);
      }
    });
  };

  return {
    invLoading,
    syncInventory,
    updateInventorySettings,
    unsavedSettings,
    localSyncSettings,
    setLocalSyncSettings,
    updateSyncSettings,
    modeValues,
    itemRarityValues,
    updateSyncSettingsRarity
  };
};

export default useSyncSettingsHandler;
