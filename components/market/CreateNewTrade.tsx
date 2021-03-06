import { selectAllEntities } from '@ngneat/elf-entities'
import { useObservable } from '@ngneat/react-rxjs'
import Image from 'next/image'
import { FunctionComponent, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CreateNewTradeHandler from '../../shared/handlers/createNewTrade.handler'
import FilterHandler from '../../shared/handlers/filter.handler'
import { MARKET_TYPE } from '../../shared/handlers/market.handler'
import { FILTER_TYPE } from '../../shared/static/filterValues'
import { Item } from '../../shared/stores/items/item.model'
import { Offer, Wish } from '../../shared/stores/markets/market.model'
import { createNotification } from '../../shared/stores/notification/notification.model'
import { notificationService } from '../../shared/stores/notification/notification.service'
import { pricesStore } from '../../shared/stores/prices/prices.store'
import ItemFilter from '../items/ItemFilter'
import ActionButton from '../styles/ActionButton'
import Dropdown, { DropdownValue } from '../styles/Dropdown'
import Loading from '../styles/Loading'
import NumberInput from '../styles/NumberInput'
import PriceSelector from './PriceSelector'
import SmallItemView from './SmallItemView'

export const wantsBothValues: DropdownValue[] = [
  { key: true, displayName: 'both prices' },
  { key: false, displayName: 'one of them' },
]

interface Props {
  dialogOpen: boolean
  setDialogOpen: (dialogOpen: boolean) => void
  type: MARKET_TYPE
  addNewTrade: (trade: Offer | Wish) => void
  existingTrades: Offer[] | Wish[]
  openItemDetails: (item: Item) => void
}

const CreateNewTrade: FunctionComponent<Props> = ({
  dialogOpen,
  setDialogOpen,
  type,
  addNewTrade,
  existingTrades,
  openItemDetails,
}) => {
  const [prices] = useObservable(pricesStore.pipe(selectAllEntities()))

  const {
    inventory,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues,
    resetLoadedItems,
  } = FilterHandler(FILTER_TYPE.NEWTRADE, 100, existingTrades)

  const {
    progress,
    setProgress,
    trade,
    setTrade,
    createTrade,
    selectedItemOwned,
    selectedItemAmount,
  } = CreateNewTradeHandler(type, addNewTrade)

  const [wantsBothDropdown, setWantsBothDropdown] = useState<DropdownValue>(
    wantsBothValues[0]
  )
  const [loading, setLoading] = useState(false)

  return (
    <>
      {dialogOpen && (
        <div className='p-2 m-2 text-left align-middle bg-wt-surface-dark rounded-2xl border-2 border-wt-success transition-all'>
          <div className='flex overflow-x-hidden overflow-y-auto flex-col h-smallNewTrade sm:h-wideNewTrade'>
            <p className='text-2xl font-bold leading-6 text-center text-wt-accent'>
              New {type === MARKET_TYPE.OFFER ? 'offer' : 'wishlist item'}
            </p>
            <div className='flex justify-center mt-4 mb-2'>
              <ActionButton
                type='cancel'
                onClick={() => {
                  setDialogOpen(false)
                  setProgress(0)
                  resetLoadedItems()
                }}
              >
                Cancel
              </ActionButton>
            </div>
            {progress === 0 && (
              <>
                <p className='text-center'>Select an item</p>
                <div className='flex flex-wrap'>
                  <div
                    className='overflow-auto my-1 w-full rounded-lg border border-wt-accent sm:w-1/2'
                    style={{ maxHeight: '384px' }}
                  >
                    <ItemFilter
                      itemFilterValues={itemFilterValues}
                      setItemFilterValues={setItemFilterValues}
                      initialOpen={true}
                      type={FILTER_TYPE.NEWTRADE}
                    />
                  </div>
                  <div
                    id='itemScroll'
                    className='overflow-auto w-full sm:w-1/2'
                    style={{ maxHeight: '384px' }}
                  >
                    <InfiniteScroll
                      className='flex flex-row flex-wrap justify-center py-2 h-full'
                      dataLength={loadedItems.length}
                      next={loadMoreItems}
                      hasMore={hasMoreItems()}
                      loader={<p></p>}
                      scrollableTarget='itemScroll'
                    >
                      {loadedItems.map((item, i) => (
                        <SmallItemView
                          key={i}
                          item={item}
                          inventory={inventory}
                          selectItem={(selectedItem: Item) => {
                            setTrade({ ...trade, selectedItem })
                            setProgress(1)
                          }}
                        />
                      ))}
                    </InfiniteScroll>
                  </div>
                </div>
              </>
            )}
            {progress === 1 && trade.selectedItem && (
              <>
                <div className='flex flex-wrap justify-center items-center my-1'>
                  <div className='flex flex-col justify-center items-center my-1'>
                    <p>Selected item</p>
                    <div
                      className='flex flex-col justify-between m-1 w-28 text-center bg-wt-surface rounded-lg shadow-md'
                      style={{
                        borderColor: `#${trade.selectedItem.rarityColor}`,
                        borderWidth: '4px',
                      }}
                    >
                      <div
                        className='cursor-pointer'
                        onClick={() => openItemDetails(trade.selectedItem)}
                      >
                        <Image
                          className='rounded-t-lg'
                          src={trade.selectedItem.iconUrl}
                          height={112}
                          width={112}
                          alt={trade.selectedItem.name}
                        />
                      </div>
                      <p className='p-1 text-sm font-semibold break-words'>
                        {trade.selectedItem.name}
                      </p>
                      <div>
                        {inventory.showInTrading && selectedItemOwned && (
                          <p className='text-sm text-wt-light bg-wt-success-dark'>
                            You own{' '}
                            <span className='whitespace-nowrap'>
                              {selectedItemAmount > 1
                                ? selectedItemAmount
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + 'x'
                                : `${selectedItemAmount}x`}
                            </span>
                          </p>
                        )}
                        {inventory.showInTrading && !selectedItemOwned && (
                          <div className='flex justify-center items-center bg-wt-error-dark'>
                            <p className='text-xs text-wt-light'>
                              You don&apos;t own this item
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center my-1'>
                    <p className='mt-2 text-center underline'>
                      {type === MARKET_TYPE.OFFER
                        ? 'Set quantity and price'
                        : 'Set a price you would like to offer'}
                    </p>
                    {type === MARKET_TYPE.OFFER && (
                      <div className='flex justify-between items-center m-2 w-60'>
                        <div className='flex flex-col justify-start'>
                          <p>In stock</p>
                        </div>
                        <NumberInput
                          value={trade.quantity}
                          setValue={(quantity) =>
                            setTrade({ ...trade, quantity })
                          }
                          min={0}
                          max={10000}
                        />
                      </div>
                    )}
                    <div className='flex flex-wrap justify-center'>
                      <div
                        className={`flex flex-col mx-4 justify-between items-center mb-10 p-1 ${
                          trade.mainPrice ? 'rounded-lg bg-wt-surface' : ''
                        }`}
                      >
                        {trade.mainPrice && (
                          <div className='mb-2 w-14 h-14'>
                            <Image
                              className='rounded-lg'
                              src={`/assets/images/prices/${trade.mainPrice.priceKey}.png`}
                              height={56}
                              width={56}
                              quality={100}
                              alt={trade.mainPrice.displayName}
                            />
                          </div>
                        )}
                        <PriceSelector
                          type={type}
                          prices={prices}
                          price={trade.mainPrice}
                          setPrice={(mainPrice) =>
                            setTrade({ ...trade, mainPrice })
                          }
                          buttonText='Select price #1'
                          excludeIds={
                            trade.secondaryPrice
                              ? [trade.secondaryPrice.id]
                              : []
                          }
                        />
                        {trade.mainPrice?.withAmount && (
                          <div className='flex justify-between items-center m-2 w-60'>
                            <div className='flex flex-col justify-start'>
                              <p>Amount of {trade.mainPrice.displayName}</p>
                            </div>
                            <NumberInput
                              value={trade.mainPriceAmount}
                              setValue={(mainPriceAmount) =>
                                setTrade({ ...trade, mainPriceAmount })
                              }
                              min={0}
                              max={99}
                            />
                          </div>
                        )}
                      </div>
                      {trade.mainPrice && (
                        <>
                          {trade.secondaryPrice && (
                            <div className='mb-2' style={{ width: '220px' }}>
                              <p className='mb-1'>
                                {type === MARKET_TYPE.OFFER
                                  ? 'I want'
                                  : "I'm offering"}
                              </p>
                              <Dropdown
                                selectedValue={wantsBothDropdown}
                                setValue={(wantsBothDropdown) => {
                                  setWantsBothDropdown(wantsBothDropdown)
                                  setTrade({
                                    ...trade,
                                    wantsBoth: wantsBothDropdown.key,
                                  })
                                }}
                                values={wantsBothValues}
                              />
                            </div>
                          )}
                          <div
                            className={`flex flex-col mx-4 justify-between items-center mb-10 p-1 ${
                              trade.secondaryPrice
                                ? 'rounded-lg bg-wt-surface'
                                : ''
                            }`}
                          >
                            {trade.secondaryPrice && (
                              <>
                                <div className='mb-2 w-14 h-14'>
                                  <Image
                                    className='rounded-lg'
                                    src={`/assets/images/prices/${trade.secondaryPrice.priceKey}.png`}
                                    height={56}
                                    width={56}
                                    quality={100}
                                    alt={trade.secondaryPrice.displayName}
                                  />
                                </div>
                                <div className='mt-1 mb-2'>
                                  <ActionButton
                                    type='cancel'
                                    onClick={() =>
                                      setTrade({
                                        ...trade,
                                        secondaryPrice: null,
                                      })
                                    }
                                  >
                                    Remove price #2
                                  </ActionButton>
                                </div>
                              </>
                            )}
                            <PriceSelector
                              type={type}
                              prices={prices}
                              price={trade.secondaryPrice}
                              setPrice={(secondaryPrice) =>
                                setTrade({ ...trade, secondaryPrice })
                              }
                              buttonText='Select price #2'
                              excludeIds={[trade.mainPrice.id]}
                            />
                            {trade.secondaryPrice?.withAmount && (
                              <div className='flex justify-between items-center m-2 w-60'>
                                <div className='flex flex-col justify-start'>
                                  <p>
                                    Amount of {trade.secondaryPrice.displayName}
                                  </p>
                                </div>
                                <NumberInput
                                  value={trade.secondaryPriceAmount}
                                  setValue={(secondaryPriceAmount) =>
                                    setTrade({ ...trade, secondaryPriceAmount })
                                  }
                                  min={0}
                                  max={99}
                                />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex justify-center'>
                  {(!loading && (
                    <ActionButton
                      type='success'
                      disabled={!trade.mainPrice}
                      onClick={() => {
                        if (
                          isNaN(trade.quantity) ||
                          isNaN(trade.mainPriceAmount) ||
                          isNaN(trade.secondaryPriceAmount)
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
                          (trade.mainPrice.withAmount &&
                            trade.mainPriceAmount === 0) ||
                          (trade.secondaryPrice?.withAmount &&
                            trade.secondaryPriceAmount === 0)
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
                        createTrade(() => {
                          setProgress(0)
                          setLoading(false)
                        })
                      }}
                    >
                      Create{' '}
                      {type === MARKET_TYPE.OFFER ? 'offer' : 'wishlist item'}
                    </ActionButton>
                  )) || <Loading />}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CreateNewTrade
