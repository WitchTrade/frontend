import { NextPage } from 'next';
import dayjs from 'dayjs';
import CustomHeader from '../../../components/core/CustomHeader';
import LoginWrapper from '../../../components/core/LoginWrapper';
import SettingNav from '../../../components/navs/SettingNav';
import ActionButton from '../../../components/styles/ActionButton';
import CheckboxInput from '../../../components/styles/CheckboxInput';
import Divider from '../../../components/styles/Divider';
import Dropdown from '../../../components/styles/Dropdown';
import Loading from '../../../components/styles/Loading';
import useSyncSettingsHandler from '../../../shared/handlers/sync.handler';
import useInventoryProvider from '../../../shared/providers/inventory.provider';
import NumberInput from '../../../components/styles/NumberInput';
import PageHeader from '../../../components/styles/PageHeader';
import MultiDropdown from '../../../components/styles/MultiDropdown';

const Sync: NextPage = () => {
  const { inventory } = useInventoryProvider();

  const {
    invLoading,
    syncInventory,
    updateInventorySettings,
    localSyncSettings,
    unsavedSettings,
    setLocalSyncSettings,
    updateSyncSettings,
    modeValues,
    itemRarityValues,
    updateSyncSettingsRarity
  } = useSyncSettingsHandler();

  return (
    <LoginWrapper>
      <CustomHeader
        title="WitchTrade | Sync Settings"
        description="Sync Settings"
        url="https://witchtrade.org/user/settings/sync"
      />
      <SettingNav />
      <PageHeader title="Sync Settings" description="Sync your steam inventory or enable auto sync." />
      <div className="flex flex-col justify-center max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
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
                      <Dropdown selectedValue={localSyncSettings.ms_mode} setValue={(newMode) => setLocalSyncSettings({ ...localSyncSettings, ms_mode: newMode })} values={modeValues} />
                    </div>
                    <div className="mb-5 mr-1" style={{ width: '180px' }}>
                      <p className="mb-1">Rarity</p>
                      <MultiDropdown selectedValues={localSyncSettings.ms_rarity} updateValue={(newRarity) => updateSyncSettingsRarity(localSyncSettings, setLocalSyncSettings, newRarity)} values={itemRarityValues} />
                    </div>
                  </div>
                  <div className="flex justify-between my-2">
                    <div className="flex flex-col justify-start">
                      <p>Default price</p>
                      <p className="text-xs sm:text-sm italic">(Only for new offers,</p>
                      <p className="text-xs sm:text-sm italic">will be ingredients of the matching rarity)</p>
                    </div>
                    <NumberInput value={localSyncSettings.ms_defaultPriceItem} setValue={(ms_defaultPriceItem) => setLocalSyncSettings({ ...localSyncSettings, ms_defaultPriceItem })} min={1} max={99} />
                  </div>
                  <div className="flex justify-between my-2">
                    <div className="flex flex-col justify-start">
                      <p>Default price for recipes</p>
                      <p className="text-xs sm:text-sm italic">(Only for new offers,</p>
                      <p className="text-xs sm:text-sm italic">will be ingredients of the matching rarity)</p>
                    </div>
                    <NumberInput value={localSyncSettings.ms_defaultPriceRecipe} setValue={(ms_defaultPriceRecipe) => setLocalSyncSettings({ ...localSyncSettings, ms_defaultPriceRecipe })} min={1} max={99} />
                  </div>
                  <div className="flex justify-between my-2 align-middle items-center">
                    <p>Amount of each item to keep</p>
                    <NumberInput value={localSyncSettings.ms_keepItem} setValue={(ms_keepItem) => setLocalSyncSettings({ ...localSyncSettings, ms_keepItem })} min={0} max={99} />
                  </div>
                  <div className="flex justify-between my-2  items-center">
                    <p>Amount of each recipe to keep</p>
                    <NumberInput value={localSyncSettings.ms_keepRecipe} setValue={(ms_keepRecipe) => setLocalSyncSettings({ ...localSyncSettings, ms_keepRecipe })} min={0} max={99} />
                  </div>
                  <div>
                    <CheckboxInput placeholder="Ignore items in your wish list" value={localSyncSettings.ms_ignoreWishlistItems} setValue={() => setLocalSyncSettings({ ...localSyncSettings, ms_ignoreWishlistItems: !localSyncSettings.ms_ignoreWishlistItems })} />
                  </div>
                  <div>
                    <CheckboxInput placeholder="Delete offers that have 0 items on stock" value={localSyncSettings.ms_removeNoneOnStock} setValue={() => setLocalSyncSettings({ ...localSyncSettings, ms_removeNoneOnStock: !localSyncSettings.ms_removeNoneOnStock })} />
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
