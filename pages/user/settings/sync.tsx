import { NextPage } from 'next';
import dayjs from 'dayjs';
import { useObservable } from '@ngneat/react-rxjs';
import { inventoryStore } from '../../../shared/stores/inventory/inventory.store';
import CustomHeader from '../../../components/core/CustomHeader';
import LoginWrapper from '../../../components/core/LoginWrapper';
import SettingNav from '../../../components/navs/SettingNav';
import ActionButton from '../../../components/styles/ActionButton';
import CheckboxInput from '../../../components/styles/CheckboxInput';
import Divider from '../../../components/styles/Divider';
import Dropdown from '../../../components/styles/Dropdown';
import Loading from '../../../components/styles/Loading';
import useSyncSettingsHandler from '../../../shared/handlers/sync.handler';
import NumberInput from '../../../components/styles/NumberInput';
import PageHeader from '../../../components/styles/PageHeader';
import MultiDropdown, { updateMultiSelectValue } from '../../../components/styles/MultiDropdown';
import SyncPriceView from '../../../components/market/SyncPriceView';
import { MARKET_TYPE } from '../../../shared/handlers/market.handler';
import { wantsBothValues } from '../../../components/market/CreateNewTrade';
import IgnoreListDialog from '../../../components/market/IgnoreListDialog';

const Sync: NextPage = () => {
  const [inventory] = useObservable(inventoryStore);

  const {
    invLoading,
    prices,
    ignoreListDialogOpen,
    setIgnoreListDialogOpen,
    syncInventory,
    updateInventorySettings,
    localSyncSettings,
    unsavedSettings,
    setLocalSyncSettings,
    updateSyncSettings,
    modeValues,
    itemRarityValues
  } = useSyncSettingsHandler();

  return (
    <LoginWrapper>
      <IgnoreListDialog dialogOpen={ignoreListDialogOpen} setDialogOpen={setIgnoreListDialogOpen} ignoreList={localSyncSettings.ignoreList} setIgnoreList={(ignoreList) => setLocalSyncSettings({ ...localSyncSettings, ignoreList })} />
      <CustomHeader
        title="WitchTrade | Sync Settings"
        description="Sync Settings"
        url="https://witchtrade.org/user/settings/sync"
      />
      <SettingNav />
      <PageHeader title="Sync Settings" description="Sync your steam inventory or enable auto sync." />
      <div className="flex flex-col justify-center max-w-lg mx-auto px-4 sm:px-6">
        <div className="bg-wt-surface-dark rounded-lg my-3 p-1">
          <p className="text-xl font-bold text-center">Steam Inventory Sync</p>
          {!invLoading &&
            <>
              <div className="flex justify-evenly mt-2 items-center">
                <ActionButton onClick={syncInventory} type="info">Sync Inventory</ActionButton>
                {inventory.lastSynced &&
                  <p>Last synced: {dayjs().to(dayjs(inventory.lastSynced))}</p>
                }
                {!inventory.id &&
                  <p>Last synced: Never</p>
                }
              </div>
              <p className="text-center text-sm mt-1">You can sync your inventory every 10 minutes</p>
            </>
          }
          {invLoading &&
            <Loading text="Syncing inventory..." />
          }
          {inventory.id && !invLoading &&
            <div className="m-3 flex justify-center" style={{ minWidth: '220px', height: '40px' }}>
              <CheckboxInput placeholder="Show inventory in search and profiles" value={inventory.showInTrading} setValue={() => updateInventorySettings({ showInTrading: !inventory.showInTrading, automaticSync: localSyncSettings.syncInventory })} />
            </div>
          }
        </div>

        <div className={`bg-wt-surface-dark rounded-lg my-3 p-2 border-4 ${unsavedSettings ? 'border-wt-warning-light' : localSyncSettings.syncInventory ? 'border-wt-success-light' : 'border-wt-error-light'}`}>
          <p className="text-xl font-bold text-center">Auto Sync ({unsavedSettings ? <span className="text-wt-warning-light">unsaved</span> : localSyncSettings.syncInventory ? <span className="text-wt-success-light">enabled</span> : <span className="text-wt-error-light">disabled</span>})</p>
          <p className="mx-2">When enabled, this feature automatically synchronizes your inventory (and offers) every <b>hour</b>!</p>
          <div>
            {!localSyncSettings.syncInventory &&
              <div className="flex justify-center my-2">
                <ActionButton onClick={() => setLocalSyncSettings({ ...localSyncSettings, syncInventory: !localSyncSettings.syncInventory })} type="success">Enable Auto Sync</ActionButton>
              </div>
            }
            {localSyncSettings.syncInventory &&
              <>
                <div className="flex justify-center my-2">
                  <ActionButton onClick={() => setLocalSyncSettings({ ...localSyncSettings, syncInventory: !localSyncSettings.syncInventory })} type="cancel">Disable Auto Sync</ActionButton>
                </div>
                <div className="mt-3 mb-2 mx-6">
                  <Divider />
                </div>
              </>
            }
            {localSyncSettings.syncInventory &&
              <div className="mx-2">
                <CheckboxInput placeholder="Also synchronize your offers" value={localSyncSettings.syncMarket} setValue={() => setLocalSyncSettings({ ...localSyncSettings, syncMarket: !localSyncSettings.syncMarket })} />
              </div>
            }
            {localSyncSettings.syncInventory && localSyncSettings.syncMarket &&
              <>
                <div className="mt-3 mb-2 mx-12">
                  <Divider />
                </div>
                <div className="mx-2">
                  <p className="text-xl font-bold">Offer sync settings</p>
                  <p className="text-sm mt-1">This feature synchronises the offers in your market with the items in your Steam inventory.</p>
                  <p className="text-sm mt-1"><span className="font-bold text-wt-accent-light">Mode:</span> Choose if you only want to create new offers, update already existing ones or both</p>
                  <p className="text-sm"><span className="font-bold text-wt-accent-light">Rarity:</span> Choose which rarities of items you want to sync</p>
                  <p className="text-sm"><span className="font-bold text-wt-accent-light">Default price:</span> Default price for every new offer. (Existing offers won&apos;t be affected)</p>
                  <p className="text-sm mb-2"><span className="font-bold text-wt-accent-light">Amount to keep:</span> Amount of each item that you want to keep in your inventory</p>

                  <div className="flex flex-wrap justify-center">
                    <div className="mb-5 mr-1" style={{ width: '180px' }}>
                      <p className="mb-1">Mode</p>
                      <Dropdown selectedValue={localSyncSettings.mode} setValue={(newMode) => setLocalSyncSettings({ ...localSyncSettings, mode: newMode })} values={modeValues} />
                    </div>
                    <div className="mb-5 mr-1" style={{ width: '180px' }}>
                      <p className="mb-1">Rarity</p>
                      <MultiDropdown
                        selectedValues={localSyncSettings.rarity}
                        updateValue={(newRarity) => setLocalSyncSettings({
                          ...localSyncSettings,
                          rarity: updateMultiSelectValue(localSyncSettings.rarity, newRarity, itemRarityValues, 1)
                        })}
                        values={itemRarityValues}
                      />
                    </div>
                  </div>
                  <SyncPriceView
                    type={MARKET_TYPE.SYNC}
                    prices={prices}
                    price={localSyncSettings.mainPriceItem}
                    setPrice={(mainPriceItem) => setLocalSyncSettings({ ...localSyncSettings, mainPriceItem })}
                    priceAmount={localSyncSettings.mainPriceAmountItem}
                    setPriceAmount={(mainPriceAmountItem) => setLocalSyncSettings({ ...localSyncSettings, mainPriceAmountItem })}
                    text="Price #1 for items"
                    removeButton={false}
                    excludeIds={
                      localSyncSettings.secondaryPriceItem ?
                        [localSyncSettings.secondaryPriceItem.id, ...prices.filter(p => !p.canBeMain).map(p => p.id)] :
                        prices.filter(p => !p.canBeMain).map(p => p.id)
                    }
                  />
                  {localSyncSettings.secondaryPriceItem &&
                    <div className="flex justify-center">
                      <div className="mb-2" style={{ width: '220px' }}>
                        <p className="mb-1">I want</p>
                        <Dropdown selectedValue={localSyncSettings.wantsBothItem} setValue={(wantsBothItem) => setLocalSyncSettings({ ...localSyncSettings, wantsBothItem })} values={wantsBothValues} />
                      </div>
                    </div>
                  }
                  <SyncPriceView
                    type={MARKET_TYPE.SYNC}
                    prices={prices}
                    price={localSyncSettings.secondaryPriceItem}
                    setPrice={(secondaryPriceItem) => setLocalSyncSettings({ ...localSyncSettings, secondaryPriceItem })}
                    priceAmount={localSyncSettings.secondaryPriceAmountItem}
                    setPriceAmount={(secondaryPriceAmountItem) => setLocalSyncSettings({ ...localSyncSettings, secondaryPriceAmountItem })}
                    text="Price #2 for items"
                    removeButton={true}
                    excludeIds={[localSyncSettings.mainPriceItem.id]}
                  />
                  <div className="m-4"></div>
                  <SyncPriceView
                    type={MARKET_TYPE.SYNC}
                    prices={prices}
                    price={localSyncSettings.mainPriceRecipe}
                    setPrice={(mainPriceRecipe) => setLocalSyncSettings({ ...localSyncSettings, mainPriceRecipe })}
                    priceAmount={localSyncSettings.mainPriceAmountRecipe}
                    setPriceAmount={(mainPriceAmountRecipe) => setLocalSyncSettings({ ...localSyncSettings, mainPriceAmountRecipe })}
                    text="Price #1 for recipes"
                    removeButton={false}
                    excludeIds={
                      localSyncSettings.secondaryPriceRecipe ?
                        [localSyncSettings.secondaryPriceRecipe.id, ...prices.filter(p => !p.canBeMain).map(p => p.id)] :
                        prices.filter(p => !p.canBeMain).map(p => p.id)
                    }
                  />
                  {localSyncSettings.secondaryPriceRecipe &&
                    <div className="flex justify-center">
                      <div className="mb-2" style={{ width: '220px' }}>
                        <p className="mb-1">I want</p>
                        <Dropdown selectedValue={localSyncSettings.wantsBothRecipe} setValue={(wantsBothRecipe) => setLocalSyncSettings({ ...localSyncSettings, wantsBothRecipe })} values={wantsBothValues} />
                      </div>
                    </div>
                  }
                  <SyncPriceView
                    type={MARKET_TYPE.SYNC}
                    prices={prices}
                    price={localSyncSettings.secondaryPriceRecipe}
                    setPrice={(secondaryPriceRecipe) => setLocalSyncSettings({ ...localSyncSettings, secondaryPriceRecipe })}
                    priceAmount={localSyncSettings.secondaryPriceAmountRecipe}
                    setPriceAmount={(secondaryPriceAmountRecipe) => setLocalSyncSettings({ ...localSyncSettings, secondaryPriceAmountRecipe })}
                    text="Price #2 for recipes"
                    removeButton={true}
                    excludeIds={[localSyncSettings.mainPriceRecipe.id]}
                  />
                  <div className="flex justify-between my-2 align-middle items-center">
                    <p>Amount of each item to keep</p>
                    <NumberInput value={localSyncSettings.keepItem} setValue={(keepItem) => setLocalSyncSettings({ ...localSyncSettings, keepItem })} min={0} max={99} />
                  </div>
                  <div className="flex justify-between my-2  items-center">
                    <p>Amount of each recipe to keep</p>
                    <NumberInput value={localSyncSettings.keepRecipe} setValue={(keepRecipe) => setLocalSyncSettings({ ...localSyncSettings, keepRecipe })} min={0} max={99} />
                  </div>
                  <div>
                    <CheckboxInput placeholder="Ignore items in your wish list" value={localSyncSettings.ignoreWishlistItems} setValue={() => setLocalSyncSettings({ ...localSyncSettings, ignoreWishlistItems: !localSyncSettings.ignoreWishlistItems })} />
                  </div>
                  <div>
                    <CheckboxInput placeholder="Delete offers that have 0 items on stock" value={localSyncSettings.removeNoneOnStock} setValue={() => setLocalSyncSettings({ ...localSyncSettings, removeNoneOnStock: !localSyncSettings.removeNoneOnStock })} />
                  </div>
                  <div className="flex justify-between">
                    <p>Ignore list (<span className="font-bold"><span className="text-wt-accent">{localSyncSettings.ignoreList.length}</span> items</span>)</p>
                    <ActionButton type="info" onClick={() => setIgnoreListDialogOpen(true)}>
                      Edit
                    </ActionButton>
                  </div>
                </div>
              </>
            }
            {unsavedSettings &&
              <>
                <p className="text-wt-error text-center">You have unsaved changes!</p>
                <div className="flex justify-center my-2">
                  <ActionButton onClick={updateSyncSettings} type="success">Save settings</ActionButton>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Sync;
