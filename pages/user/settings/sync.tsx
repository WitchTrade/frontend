import { NextPage } from 'next';
import Image from 'next/image';
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
import { itemsQuery } from '../../../shared/stores/items/items.query';
import NumberInput from '../../../components/styles/NumberInput';
import PageHeader from '../../../components/styles/PageHeader';

const Sync: NextPage = () => {
  const { inventory } = useInventoryProvider();

  const {
    invLoading,
    syncInventory,
    updateInventorySettings,
    syncSettings,
    unsavedSettings,
    setSyncSettings,
    updateSyncSettings,
    modeValues,
    itemRarityValues
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
            <div className="flex justify-evenly my-2 items-center">
              <ActionButton onClick={syncInventory} type="info" disabled={inventory.automaticSync}>Sync Inventory</ActionButton>
              {inventory.lastSynced &&
                <p>Last synced: {dayjs().to(dayjs(inventory.lastSynced))}</p>
              }
              {!inventory.id &&
                <p>Last synced: Never</p>
              }
            </div>
          }
          {invLoading &&
            <Loading text="Syncing inventory..." />
          }
          {inventory.id && !invLoading &&
            <div className="m-3 flex justify-center" style={{ minWidth: '220px', height: '40px' }}>
              <CheckboxInput placeholder="Show inventory in search and profiles" value={inventory.showInTrading} setValue={() => updateInventorySettings({ showInTrading: !inventory.showInTrading, automaticSync: inventory.automaticSync })} />
            </div>
          }
        </div>

        <div className={`bg-wt-surface-dark rounded-lg my-3 p-2 border-4 ${unsavedSettings ? 'border-wt-warning-light' : inventory.automaticSync ? 'border-wt-success-light' : 'border-wt-error-light'}`}>
          <p className="text-xl font-bold text-center">Auto Sync ({unsavedSettings ? <span className="text-wt-warning-light">unsaved</span> : inventory.automaticSync ? <span className="text-wt-success-light">enabled</span> : <span className="text-wt-error-light">disabled</span>})</p>
          <p className="mx-2">When enabled, this feature automatically synchronizes your inventory (and offers) every <b>hour</b>!</p>
          <div>
            {!inventory.automaticSync &&
              <div className="flex justify-center my-2">
                <ActionButton onClick={() => updateInventorySettings({ showInTrading: inventory.showInTrading, automaticSync: !inventory.automaticSync })} type="proceed">Enable Auto Sync</ActionButton>
              </div>
            }
            {inventory.automaticSync &&
              <>
                <div className="flex justify-center my-2">
                  <ActionButton onClick={() => updateInventorySettings({ showInTrading: inventory.showInTrading, automaticSync: !inventory.automaticSync })} type="cancel">Disable Auto Sync</ActionButton>
                </div>
                <div className="mt-3 mb-2 mx-6">
                  <Divider />
                </div>
              </>
            }
            {inventory.automaticSync &&
              <div className="mx-2">
                <CheckboxInput placeholder="Also synchronize your offers" value={syncSettings.syncMarket} setValue={() => setSyncSettings({ ...syncSettings, syncMarket: !syncSettings.syncMarket })} />
              </div>
            }
            {inventory.automaticSync && syncSettings.syncMarket &&
              <>
                <div className="mt-3 mb-2 mx-12">
                  <Divider />
                </div>
                <div className="mx-2">
                  <p className="text-xl font-bold">Offer sync settings</p>
                  <p className="text-sm mt-1">This feature synchronises the offers in your market with the items in your Steam inventory.</p>
                  <p className="text-sm mt-1"><span className="font-bold text-wt-accent-light">Mode:</span> Choose if you only want to create new offers, update already existing ones or both</p>
                  <p className="text-sm"><span className="font-bold text-wt-accent-light">Rarity:</span> Choose which rarities of items you want to sync</p>
                  <p className="text-sm"><span className="font-bold text-wt-accent-light">Default price:</span> Default price for every new offer. (Existing offers won&aposl;t be affected)</p>
                  <p className="text-sm mb-2"><span className="font-bold text-wt-accent-light">Amount to keep:</span> Amount of each item that you want to keep in your inventory</p>

                  <div className="flex flex-wrap justify-center">
                    <div className="mb-5 mr-1" style={{ width: '180px' }}>
                      <p className="mb-1">Mode</p>
                      <Dropdown selectedValue={syncSettings.mode} setValue={(newMode) => setSyncSettings({ ...syncSettings, mode: newMode })} values={modeValues} />
                    </div>
                    <div className="mb-5 mr-1" style={{ width: '180px' }}>
                      <p className="mb-1">Rarity</p>
                      <Dropdown selectedValue={syncSettings.rarity} setValue={(newRarity) => setSyncSettings({ ...syncSettings, rarity: newRarity })} values={itemRarityValues} />
                    </div>
                  </div>
                  <div className="flex justify-between my-2">
                    <div className="flex flex-col justify-start">
                      <p>Default price (Only for new offers)</p>
                      {syncSettings.rarity.key === 'all' &&
                        <div className="flex flex-row justify-start">
                          <Image className="rounded-md mr-1" src={itemsQuery.getIconUrlOf(900)} alt={itemsQuery.getEntity(900)?.name} height="24px" width="24px" />
                          <Image className="rounded-md mr-1" src={itemsQuery.getIconUrlOf(901)} alt={itemsQuery.getEntity(901)?.name} height="24px" width="24px" />
                          <Image className="rounded-md mr-1" src={itemsQuery.getIconUrlOf(902)} alt={itemsQuery.getEntity(902)?.name} height="24px" width="24px" />
                          <Image className="rounded-md mr-1" src={itemsQuery.getIconUrlOf(903)} alt={itemsQuery.getEntity(903)?.name} height="24px" width="24px" />
                          <Image className="rounded-md mr-1" src={itemsQuery.getIconUrlOf(904)} alt={itemsQuery.getEntity(904)?.name} height="24px" width="24px" />
                        </div>
                      }
                      {syncSettings.rarity.key !== 'all' &&
                        <div className="flex flex-row justify-start">
                          <Image className="rounded-md mr-1" src={itemsQuery.getIconUrlOf(itemsQuery.rarityToIngredientId(syncSettings.rarity.key))} alt={itemsQuery.getEntity(itemsQuery.rarityToIngredientId(syncSettings.rarity.key))?.name} height="24px" width="24px" />
                        </div>
                      }
                    </div>
                    <NumberInput value={syncSettings.defaultPrice} setValue={(defaultPrice) => setSyncSettings({ ...syncSettings, defaultPrice })} min={0} max={99} />
                  </div>
                  <div className="flex justify-between my-2 align-middle items-center">
                    <p>Amount of each item to keep</p>
                    <NumberInput value={syncSettings.keep} setValue={(keep) => setSyncSettings({ ...syncSettings, keep })} min={0} max={99} />
                  </div>
                  <div className="flex justify-between my-2  items-center">
                    <p>Amount of each recipe to keep</p>
                    <NumberInput value={syncSettings.keepRecipe} setValue={(keepRecipe) => setSyncSettings({ ...syncSettings, keepRecipe })} min={0} max={99} />
                  </div>
                  <div>
                    <CheckboxInput placeholder="Ignore items in your wish list" value={syncSettings.ignoreWishlistItems} setValue={() => setSyncSettings({ ...syncSettings, ignoreWishlistItems: !syncSettings.ignoreWishlistItems })} />
                  </div>
                </div>
              </>
            }
            {unsavedSettings &&
              <>
                <p className="text-wt-error text-center">You have unsaved changes!</p>
                <div className="flex justify-center my-2">
                  <ActionButton onClick={updateSyncSettings} type="proceed">Save settings</ActionButton>
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
