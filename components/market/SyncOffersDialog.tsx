import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import WTDialog from '../styles/WTDialog';
import ActionButton from '../styles/ActionButton';
import Dropdown from '../styles/Dropdown';
import MultiDropdown from '../styles/MultiDropdown';
import NumberInput from '../styles/NumberInput';
import CheckboxInput from '../styles/CheckboxInput';
import { itemRarityValues, modeValues, updateSyncSettingsRarity } from '../../shared/handlers/sync.handler';
import Loading from '../styles/Loading';

interface Props {
  localSyncSettings: any;
  setLocalSyncSettings: (syncSettings: any) => void;
  syncOffers: (finished: () => void) => void;
};

const SyncOffersDialog: FunctionComponent<Props> = ({ localSyncSettings, setLocalSyncSettings, syncOffers }) => {

  const [dialogOpen, setDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const finished = () => {
    setLoading(false);
    setDialogOpen(false);
  };

  return (
    <>
      <WTDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-lg p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-accent">
          <div className="mx-2">
            <p className="text-xl font-bold text-center">Sync Offers</p>
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
