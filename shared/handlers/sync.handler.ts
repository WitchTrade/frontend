import { useEffect, useState } from 'react';
import { DropdownValue } from '../../components/styles/Dropdown';
import useInventoryProvider from '../providers/inventory.provider';
import useUserProvider from '../providers/user.provider';
import { InventoryChangeDTO } from '../stores/inventory/inventory.model';
import { inventoryService } from '../stores/inventory/inventory.service';

const modeValues: DropdownValue[] = [
    { key: 'both', displayName: 'Both' },
    { key: 'new', displayName: 'Only new' },
    { key: 'existing', displayName: 'Only existing' }
];

const itemRarityValues: DropdownValue[] = [
    { key: 'all', displayName: 'All' },
    { key: 'common', displayName: 'Common', imagePath: '/assets/svgs/rarity_circles/common.svg' },
    { key: 'uncommon', displayName: 'Uncommon', imagePath: '/assets/svgs/rarity_circles/uncommon.svg' },
    { key: 'rare', displayName: 'Rare', imagePath: '/assets/svgs/rarity_circles/rare.svg' },
    { key: 'veryrare', displayName: 'Veryrare', imagePath: '/assets/svgs/rarity_circles/veryrare.svg' },
    { key: 'whimsical', displayName: 'Whimsical', imagePath: '/assets/svgs/rarity_circles/whimsical.svg' }
];

const useSyncSettingsHandler = () => {
    const { user } = useUserProvider();
    const { inventory } = useInventoryProvider();

    const [invLoading, setInvLoading] = useState(false);

    const [syncSettings, setSyncSettings] = useState({
        syncMarket: false,
        mode: modeValues[0],
        rarity: itemRarityValues[0],
        defaultPrice: 4,
        defaultRecipePrice: 1,
        keep: 1,
        keepRecipe: 0,
        ignoreWishlistItems: true
    });

    const [unsavedSettings, setUnsavedSettings] = useState(false);

    // set syncsettings when user inventory changes
    useEffect(() => {
        if (!inventory.invSyncSetting) {
            return;
        }
        let mode = modeValues.find(mo => mo.key === inventory.invSyncSetting.mode);
        if (!mode) {
            mode = modeValues[0];
        }
        let rarity = itemRarityValues.find(ir => ir.key === inventory.invSyncSetting.rarity);
        if (!rarity) {
            rarity = itemRarityValues[0];
        }
        setSyncSettings({
            syncMarket: inventory.invSyncSetting.syncMarket,
            mode,
            rarity,
            defaultPrice: inventory.invSyncSetting.defaultPrice,
            defaultRecipePrice: inventory.invSyncSetting.defaultRecipePrice,
            keep: inventory.invSyncSetting.keep,
            keepRecipe: inventory.invSyncSetting.keepRecipe,
            ignoreWishlistItems: inventory.invSyncSetting.ignoreWishlistItems,
        });
    }, [inventory]);

    useEffect(() => {
        if (!inventory.invSyncSetting) {
            return;
        }
        if (
            syncSettings.syncMarket !== inventory.invSyncSetting.syncMarket ||
            syncSettings.mode.key !== inventory.invSyncSetting.mode ||
            syncSettings.rarity.key !== inventory.invSyncSetting.rarity ||
            syncSettings.defaultPrice !== inventory.invSyncSetting.defaultPrice ||
            syncSettings.defaultRecipePrice !== inventory.invSyncSetting.defaultRecipePrice ||
            syncSettings.keep !== inventory.invSyncSetting.keep ||
            syncSettings.keepRecipe !== inventory.invSyncSetting.keepRecipe ||
            syncSettings.ignoreWishlistItems !== inventory.invSyncSetting.ignoreWishlistItems
        ) {
            setUnsavedSettings(true);
        } else {
            setUnsavedSettings(false);
        }

    }, [syncSettings]);

    const syncInventory = async () => {
        setInvLoading(true);
        inventoryService.syncInventory(user).subscribe((res) => {
            setInvLoading(false);
        });
    };

    const updateInventorySettings = (data: InventoryChangeDTO) => {
        inventoryService.updateInventory(data).subscribe();
    };

    const updateSyncSettings = () => {
        inventoryService.updateSyncSettings({ ...syncSettings, mode: syncSettings.mode.key, rarity: syncSettings.rarity.key }).subscribe((res) => {
            if (res.ok) {
                setUnsavedSettings(false);
            }
        });
    };

    return {
        invLoading,
        syncInventory,
        updateInventorySettings,
        syncSettings,
        unsavedSettings,
        setSyncSettings,
        updateSyncSettings,
        modeValues,
        itemRarityValues
    };
};

export default useSyncSettingsHandler;