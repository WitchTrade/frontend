import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import WTDialog from '../styles/WTDialog';
import ActionButton from '../styles/ActionButton';
import Dropdown from '../styles/Dropdown';
import MultiDropdown, { updateMultiSelectValue } from '../styles/MultiDropdown';
import NumberInput from '../styles/NumberInput';
import CheckboxInput from '../styles/CheckboxInput';
import { itemRarityValues, modeValues } from '../../shared/handlers/sync.handler';
import Loading from '../styles/Loading';
import { MARKET_TYPE } from '../../shared/handlers/market.handler';
import { Price } from '../../shared/stores/prices/price.model';
import SyncPriceView from './SyncPriceView';
import { wantsBothValues } from './CreateNewTrade';

interface Props {
  localSyncSettings: any;
  setLocalSyncSettings: (syncSettings: any) => void;
  syncOffers: (finished: () => void) => void;
  prices: Price[];
};

const SyncOffersDialog: FunctionComponent<Props> = ({ localSyncSettings, setLocalSyncSettings, syncOffers, prices }) => {

  const [dialogOpen, setDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const finished = () => {
    setLoading(false);
    setDialogOpen(false);
  };

  return (
    <>
      <WTDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-lg p-6 my-8 overflow-x-hidden text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-accent">
          <div className="mx-2">
            <p className="text-xl font-bold text-center">Sync Offers</p>
            <p className="text-sm mt-1">This feature synchronises the offers in your market with the items in your Steam inventory.</p>
            <p className="text-sm mt-1"><span className="font-bold text-wt-accent-light">Mode:</span> Choose if you only want to create new offers, update already existing ones or both</p>
            <p className="text-sm"><span className="font-bold text-wt-accent-light">Rarity:</span> Choose which rarities of items you want to sync</p>
            <p className="text-sm"><span className="font-bold text-wt-accent-light">Prices:</span> Default prices for every new offer. (Existing offers won&apos;t be affected)</p>
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
              excludeIds={[localSyncSettings.mainPriceItem?.id]}
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
              excludeIds={[localSyncSettings.mainPriceRecipe?.id]}
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
            <div className="mt-4 flex justify-evenly pb-2">
              {!loading &&
                <>
                  <ActionButton type="success" onClick={() => {
                    setLoading(true);
                    syncOffers(finished);
                  }}>
                    Sync
                  </ActionButton>
                  <ActionButton type="cancel" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </ActionButton>
                </>
                ||
                <Loading />
              }
            </div>
          </div>
        </div>
      </WTDialog>
      <ActionButton type="info" onClick={() => setDialogOpen(true)}>
        <Image src="/assets/svgs/sync.svg" height="24px" width="24px" alt="Sync Steam Friends" />
        Sync offers
      </ActionButton>
    </>
  );
};

export default SyncOffersDialog;
