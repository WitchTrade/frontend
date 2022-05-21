import Image from 'next/image'
import { FunctionComponent, useState } from 'react'
import { MARKET_TYPE } from '../../shared/handlers/market.handler'
import {
  itemRarityValues,
  modeValues,
} from '../../shared/handlers/sync.handler'
import { createNotification } from '../../shared/stores/notification/notification.model'
import { notificationService } from '../../shared/stores/notification/notification.service'
import { Price } from '../../shared/stores/prices/price.model'
import ActionButton from '../styles/ActionButton'
import CheckboxInput from '../styles/CheckboxInput'
import Dropdown from '../styles/Dropdown'
import Loading from '../styles/Loading'
import MultiDropdown, { updateMultiSelectValue } from '../styles/MultiDropdown'
import NumberInput from '../styles/NumberInput'
import WTDialog from '../styles/WTDialog'
import { wantsBothValues } from './CreateNewTrade'
import IgnoreListDialog from './IgnoreListDialog'
import SyncPriceView from './SyncPriceView'

interface Props {
  localSyncSettings: any
  setLocalSyncSettings: (syncSettings: any) => void
  syncOffers: (finished: () => void) => void
  prices: Price[]
}

const SyncOffersDialog: FunctionComponent<Props> = ({
  localSyncSettings,
  setLocalSyncSettings,
  syncOffers,
  prices,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const [ignoreListDialogOpen, setIgnoreListDialogOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  const finished = () => {
    setLoading(false)
    setDialogOpen(false)
  }

  return (
    <>
      <WTDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        closeOnOutsideClick={true}
      >
        <div className='inline-block overflow-x-hidden p-6 my-8 max-w-lg text-left align-middle bg-wt-surface-dark rounded-2xl border-4 border-wt-accent shadow-xl transition-all'>
          <IgnoreListDialog
            dialogOpen={ignoreListDialogOpen}
            setDialogOpen={setIgnoreListDialogOpen}
            ignoreList={localSyncSettings.ignoreList}
            setIgnoreList={(ignoreList) =>
              setLocalSyncSettings({ ...localSyncSettings, ignoreList })
            }
          />
          <div className='mx-2'>
            <p className='text-xl font-bold text-center'>Sync Offers</p>
            <p className='mt-1 text-sm'>
              This feature synchronises the offers in your market with the items
              in your Steam inventory.
            </p>
            <p className='mt-1 text-sm'>
              <span className='font-bold text-wt-accent-light'>Mode:</span>{' '}
              Choose if you only want to create new offers, update already
              existing ones or both
            </p>
            <p className='text-sm'>
              <span className='font-bold text-wt-accent-light'>Rarity:</span>{' '}
              Choose which rarities of items you want to sync
            </p>
            <p className='text-sm'>
              <span className='font-bold text-wt-accent-light'>Prices:</span>{' '}
              Default prices for every new offer. (Existing offers won&apos;t be
              affected)
            </p>
            <p className='mb-2 text-sm'>
              <span className='font-bold text-wt-accent-light'>
                Amount to keep:
              </span>{' '}
              Amount of each item that you want to keep in your inventory
            </p>
            <p className='mb-2 text-sm'>
              <span className='font-bold text-wt-accent-light'>
                Ignore list:
              </span>{' '}
              Select items which should be ignored while syncing
            </p>

            <div className='flex flex-wrap justify-center'>
              <div className='mr-1 mb-5' style={{ width: '180px' }}>
                <p className='mb-1'>Mode</p>
                <Dropdown
                  selectedValue={localSyncSettings.mode}
                  setValue={(newMode) =>
                    setLocalSyncSettings({
                      ...localSyncSettings,
                      mode: newMode,
                    })
                  }
                  values={modeValues}
                />
              </div>
              <div className='mr-1 mb-5' style={{ width: '180px' }}>
                <p className='mb-1'>Rarity</p>
                <MultiDropdown
                  selectedValues={localSyncSettings.rarity}
                  updateValue={(newRarity) =>
                    setLocalSyncSettings({
                      ...localSyncSettings,
                      rarity: updateMultiSelectValue(
                        localSyncSettings.rarity,
                        newRarity,
                        itemRarityValues,
                        1
                      ),
                    })
                  }
                  values={itemRarityValues}
                />
              </div>
            </div>
            <SyncPriceView
              type={MARKET_TYPE.SYNC}
              prices={prices}
              price={localSyncSettings.mainPriceItem}
              setPrice={(mainPriceItem) =>
                setLocalSyncSettings({ ...localSyncSettings, mainPriceItem })
              }
              priceAmount={localSyncSettings.mainPriceAmountItem}
              setPriceAmount={(mainPriceAmountItem) =>
                setLocalSyncSettings({
                  ...localSyncSettings,
                  mainPriceAmountItem,
                })
              }
              text='Price #1 for items'
              removeButton={false}
              excludeIds={
                localSyncSettings.secondaryPriceItem
                  ? [
                      localSyncSettings.secondaryPriceItem.id,
                      ...prices.filter((p) => !p.canBeMain).map((p) => p.id),
                    ]
                  : prices.filter((p) => !p.canBeMain).map((p) => p.id)
              }
            />
            {localSyncSettings.secondaryPriceItem && (
              <div className='flex justify-center'>
                <div className='mb-2' style={{ width: '220px' }}>
                  <p className='mb-1'>I want</p>
                  <Dropdown
                    selectedValue={localSyncSettings.wantsBothItem}
                    setValue={(wantsBothItem) =>
                      setLocalSyncSettings({
                        ...localSyncSettings,
                        wantsBothItem,
                      })
                    }
                    values={wantsBothValues}
                  />
                </div>
              </div>
            )}
            <SyncPriceView
              type={MARKET_TYPE.SYNC}
              prices={prices}
              price={localSyncSettings.secondaryPriceItem}
              setPrice={(secondaryPriceItem) =>
                setLocalSyncSettings({
                  ...localSyncSettings,
                  secondaryPriceItem,
                })
              }
              priceAmount={localSyncSettings.secondaryPriceAmountItem}
              setPriceAmount={(secondaryPriceAmountItem) =>
                setLocalSyncSettings({
                  ...localSyncSettings,
                  secondaryPriceAmountItem,
                })
              }
              text='Price #2 for items'
              removeButton={true}
              excludeIds={[localSyncSettings.mainPriceItem?.id]}
            />
            <div className='m-4'></div>
            <SyncPriceView
              type={MARKET_TYPE.SYNC}
              prices={prices}
              price={localSyncSettings.mainPriceRecipe}
              setPrice={(mainPriceRecipe) =>
                setLocalSyncSettings({ ...localSyncSettings, mainPriceRecipe })
              }
              priceAmount={localSyncSettings.mainPriceAmountRecipe}
              setPriceAmount={(mainPriceAmountRecipe) =>
                setLocalSyncSettings({
                  ...localSyncSettings,
                  mainPriceAmountRecipe,
                })
              }
              text='Price #1 for recipes'
              removeButton={false}
              excludeIds={
                localSyncSettings.secondaryPriceRecipe
                  ? [
                      localSyncSettings.secondaryPriceRecipe.id,
                      ...prices.filter((p) => !p.canBeMain).map((p) => p.id),
                    ]
                  : prices.filter((p) => !p.canBeMain).map((p) => p.id)
              }
            />
            {localSyncSettings.secondaryPriceRecipe && (
              <div className='flex justify-center'>
                <div className='mb-2' style={{ width: '220px' }}>
                  <p className='mb-1'>I want</p>
                  <Dropdown
                    selectedValue={localSyncSettings.wantsBothRecipe}
                    setValue={(wantsBothRecipe) =>
                      setLocalSyncSettings({
                        ...localSyncSettings,
                        wantsBothRecipe,
                      })
                    }
                    values={wantsBothValues}
                  />
                </div>
              </div>
            )}
            <SyncPriceView
              type={MARKET_TYPE.SYNC}
              prices={prices}
              price={localSyncSettings.secondaryPriceRecipe}
              setPrice={(secondaryPriceRecipe) =>
                setLocalSyncSettings({
                  ...localSyncSettings,
                  secondaryPriceRecipe,
                })
              }
              priceAmount={localSyncSettings.secondaryPriceAmountRecipe}
              setPriceAmount={(secondaryPriceAmountRecipe) =>
                setLocalSyncSettings({
                  ...localSyncSettings,
                  secondaryPriceAmountRecipe,
                })
              }
              text='Price #2 for recipes'
              removeButton={true}
              excludeIds={[localSyncSettings.mainPriceRecipe?.id]}
            />
            <div className='flex justify-between items-center my-2 align-middle'>
              <p>Amount of each item to keep</p>
              <NumberInput
                value={localSyncSettings.keepItem}
                setValue={(keepItem) =>
                  setLocalSyncSettings({ ...localSyncSettings, keepItem })
                }
                min={0}
                max={99}
              />
            </div>
            <div className='flex justify-between items-center  my-2'>
              <p>Amount of each recipe to keep</p>
              <NumberInput
                value={localSyncSettings.keepRecipe}
                setValue={(keepRecipe) =>
                  setLocalSyncSettings({ ...localSyncSettings, keepRecipe })
                }
                min={0}
                max={99}
              />
            </div>
            <div>
              <CheckboxInput
                placeholder='Ignore items in your wish list'
                value={localSyncSettings.ignoreWishlistItems}
                setValue={() =>
                  setLocalSyncSettings({
                    ...localSyncSettings,
                    ignoreWishlistItems: !localSyncSettings.ignoreWishlistItems,
                  })
                }
              />
            </div>
            <div>
              <CheckboxInput
                placeholder='Delete offers that have 0 items on stock'
                value={localSyncSettings.removeNoneOnStock}
                setValue={() =>
                  setLocalSyncSettings({
                    ...localSyncSettings,
                    removeNoneOnStock: !localSyncSettings.removeNoneOnStock,
                  })
                }
              />
            </div>
            <div className='flex justify-between'>
              <p>
                Ignore list (
                <span className='font-bold'>
                  <span className='text-wt-accent'>
                    {localSyncSettings.ignoreList.length}
                  </span>{' '}
                  items
                </span>
                )
              </p>
              <ActionButton
                type='info'
                onClick={() => setIgnoreListDialogOpen(true)}
              >
                Edit
              </ActionButton>
            </div>
            <div className='flex justify-evenly pb-2 mt-4'>
              {(!loading && (
                <>
                  <ActionButton
                    type='success'
                    onClick={() => {
                      if (
                        isNaN(localSyncSettings.keepItem) ||
                        isNaN(localSyncSettings.keepRecipe) ||
                        (localSyncSettings.mainPriceItem.withAmount &&
                          isNaN(localSyncSettings.mainPriceAmountItem)) ||
                        (localSyncSettings.secondaryPriceItem?.withAmount &&
                          isNaN(localSyncSettings.secondaryPriceAmountItem)) ||
                        (localSyncSettings.mainPriceRecipe.withAmount &&
                          isNaN(localSyncSettings.mainPriceAmountRecipe)) ||
                        (localSyncSettings.secondaryPriceRecipe?.withAmount &&
                          isNaN(localSyncSettings.secondaryPriceAmountRecipe))
                      ) {
                        const notification = createNotification({
                          content: 'Please fill out every field',
                          duration: 5000,
                          type: 'warning',
                        })
                        notificationService.addNotification(notification)
                        return
                      }
                      if (
                        (localSyncSettings.mainPriceItem.withAmount &&
                          localSyncSettings.mainPriceAmountItem === 0) ||
                        (localSyncSettings.secondaryPriceItem?.withAmount &&
                          localSyncSettings.secondaryPriceAmountItem === 0) ||
                        (localSyncSettings.mainPriceRecipe.withAmount &&
                          localSyncSettings.mainPriceAmountRecipe === 0) ||
                        (localSyncSettings.secondaryPriceRecipe?.withAmount &&
                          localSyncSettings.secondaryPriceAmountRecipe === 0)
                      ) {
                        const notification = createNotification({
                          content: 'Prices have to be 1 or higher',
                          duration: 5000,
                          type: 'warning',
                        })
                        notificationService.addNotification(notification)
                        return
                      }
                      setLoading(true)
                      syncOffers(finished)
                    }}
                  >
                    Sync
                  </ActionButton>
                  <ActionButton
                    type='cancel'
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </ActionButton>
                </>
              )) || <Loading />}
            </div>
          </div>
        </div>
      </WTDialog>
      <ActionButton type='info' onClick={() => setDialogOpen(true)}>
        <Image
          src='/assets/svgs/sync.svg'
          height='24px'
          width='24px'
          alt='Sync Steam Friends'
        />
        Sync offers
      </ActionButton>
    </>
  )
}

export default SyncOffersDialog
