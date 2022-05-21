import Image from 'next/image'
import { FunctionComponent, useEffect, useState } from 'react'
import { MARKET_TYPE } from '../../shared/handlers/market.handler'
import { Item } from '../../shared/stores/items/item.model'
import {
  createTrade,
  Offer,
  Wish,
} from '../../shared/stores/markets/market.model'
import { createNotification } from '../../shared/stores/notification/notification.model'
import { notificationService } from '../../shared/stores/notification/notification.service'
import { Price } from '../../shared/stores/prices/price.model'
import ActionButton from '../styles/ActionButton'
import Dropdown, { DropdownValue } from '../styles/Dropdown'
import Loading from '../styles/Loading'
import NumberInput from '../styles/NumberInput'
import WTDialog from '../styles/WTDialog'
import { wantsBothValues } from './CreateNewTrade'
import PriceSelector from './PriceSelector'
import { TRADE_TYPE } from './TradeView'

interface Props {
  type: TRADE_TYPE
  selectedTrade: Offer | Wish
  selectedItem: Item
  prices: Price[]
  updateTrade: (trade: any, finished: () => void) => void
}

const EditTradeDialog: FunctionComponent<Props> = ({
  type,
  selectedTrade,
  selectedItem,
  prices,
  updateTrade,
}) => {
  const [localTrade, setLocalTrade] = useState<any>(createTrade(selectedTrade))

  const [wantsBothDropdown, setWantsBothDropdown] = useState<DropdownValue>(
    wantsBothValues[0]
  )

  const [dialogOpen, setDialogOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!dialogOpen) {
      return
    }
    const createdTrade = createTrade(selectedTrade)
    setLocalTrade({ ...createdTrade })

    if (createdTrade.wantsBoth !== undefined) {
      const wantsBoth = wantsBothValues.find(
        (wbv) => wbv.key === createdTrade.wantsBoth
      )
      if (wantsBoth) {
        setWantsBothDropdown(wantsBoth)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen])

  const finished = () => {
    setDialogOpen(false)
    setLoading(false)
  }

  return (
    <>
      <WTDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        closeOnOutsideClick={true}
      >
        <div className='inline-block overflow-auto p-6 my-8 max-w-lg text-left align-middle bg-wt-surface-dark rounded-2xl border-4 border-wt-accent shadow-xl transition-all'>
          <div className='mx-2'>
            <p className='text-center'>Edit {selectedItem.name}</p>
            <div className='flex flex-col justify-center items-center my-1'>
              <div
                className='flex m-1 w-28 rounded-lg'
                style={{
                  borderColor: `#${selectedItem.rarityColor}`,
                  borderWidth: '6px',
                }}
              >
                <Image
                  className='rounded-t-lg'
                  src={selectedItem.iconUrl}
                  height={112}
                  width={112}
                  alt={selectedItem.name}
                />
              </div>
            </div>
            <div className='flex flex-col justify-center items-center my-1'>
              <p className='mt-2 text-center underline'>
                {type === TRADE_TYPE.MANAGE_OFFER
                  ? 'Set quantity and price'
                  : 'Set a price you would like to offer'}
              </p>
              {type === TRADE_TYPE.MANAGE_OFFER && (
                <div className='flex justify-between items-center m-2 w-60'>
                  <div className='flex flex-col justify-start'>
                    <p>In stock</p>
                  </div>
                  <NumberInput
                    value={localTrade.quantity}
                    setValue={(quantity) =>
                      setLocalTrade({ ...localTrade, quantity })
                    }
                    min={0}
                    max={10000}
                  />
                </div>
              )}
              <div className='flex flex-col justify-center items-center'>
                <div
                  className={`flex flex-col mx-4 justify-between items-center mb-2 p-1 ${
                    localTrade.mainPrice ? 'rounded-lg bg-wt-surface' : ''
                  }`}
                >
                  {localTrade.mainPrice && (
                    <div className='mb-2 w-14 h-14'>
                      <Image
                        className='rounded-lg'
                        src={`/assets/images/prices/${localTrade.mainPrice.priceKey}.png`}
                        height={56}
                        width={56}
                        quality={100}
                        alt={localTrade.mainPrice.displayName}
                      />
                    </div>
                  )}
                  <PriceSelector
                    type={
                      type === TRADE_TYPE.MANAGE_OFFER
                        ? MARKET_TYPE.OFFER
                        : MARKET_TYPE.WISH
                    }
                    prices={prices}
                    price={localTrade.mainPrice}
                    setPrice={(mainPrice) =>
                      setLocalTrade({ ...localTrade, mainPrice })
                    }
                    buttonText='Select price #1'
                    excludeIds={
                      localTrade.secondaryPrice
                        ? [localTrade.secondaryPrice.id]
                        : []
                    }
                  />
                  {localTrade.mainPrice?.withAmount && (
                    <div className='flex justify-between items-center m-2 w-60'>
                      <div className='flex flex-col justify-start'>
                        <p>Amount of {localTrade.mainPrice.displayName}</p>
                      </div>
                      <NumberInput
                        value={localTrade.mainPriceAmount}
                        setValue={(mainPriceAmount) =>
                          setLocalTrade({ ...localTrade, mainPriceAmount })
                        }
                        min={0}
                        max={99}
                      />
                    </div>
                  )}
                </div>
                {localTrade.mainPrice && (
                  <>
                    {localTrade.secondaryPrice && (
                      <div className='mb-2' style={{ width: '220px' }}>
                        <p className='mb-1'>
                          {type === TRADE_TYPE.MANAGE_OFFER
                            ? 'I want'
                            : "I'm offering"}
                        </p>
                        <Dropdown
                          selectedValue={wantsBothDropdown}
                          setValue={(wantsBothDropdown) => {
                            setWantsBothDropdown(wantsBothDropdown)
                            setLocalTrade({
                              ...localTrade,
                              wantsBoth: wantsBothDropdown.key,
                            })
                          }}
                          values={wantsBothValues}
                        />
                      </div>
                    )}
                    <div
                      className={`flex flex-col mx-4 justify-between items-center mb-10 p-1 ${
                        localTrade.secondaryPrice
                          ? 'rounded-lg bg-wt-surface'
                          : ''
                      }`}
                    >
                      {localTrade.secondaryPrice && (
                        <>
                          <div className='mb-2 w-14 h-14'>
                            <Image
                              className='rounded-lg'
                              src={`/assets/images/prices/${localTrade.secondaryPrice.priceKey}.png`}
                              height={56}
                              width={56}
                              quality={100}
                              alt={localTrade.secondaryPrice.displayName}
                            />
                          </div>
                          <div className='mt-1 mb-2'>
                            <ActionButton
                              type='cancel'
                              onClick={() =>
                                setLocalTrade({
                                  ...localTrade,
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
                        type={
                          type === TRADE_TYPE.MANAGE_OFFER
                            ? MARKET_TYPE.OFFER
                            : MARKET_TYPE.WISH
                        }
                        prices={prices}
                        price={localTrade.secondaryPrice}
                        setPrice={(secondaryPrice) =>
                          setLocalTrade({ ...localTrade, secondaryPrice })
                        }
                        buttonText='Select price #2'
                        excludeIds={[localTrade.mainPrice.id]}
                      />
                      {localTrade.secondaryPrice?.withAmount && (
                        <div className='flex justify-between items-center m-2 w-60'>
                          <div className='flex flex-col justify-start'>
                            <p>
                              Amount of {localTrade.secondaryPrice.displayName}
                            </p>
                          </div>
                          <NumberInput
                            value={localTrade.secondaryPriceAmount}
                            setValue={(secondaryPriceAmount) =>
                              setLocalTrade({
                                ...localTrade,
                                secondaryPriceAmount,
                              })
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
            <div className='flex justify-evenly pb-2 mt-4'>
              {(!loading && (
                <>
                  <ActionButton
                    type='success'
                    onClick={() => {
                      if (
                        isNaN(localTrade.quantity) ||
                        isNaN(localTrade.mainPriceAmount) ||
                        isNaN(localTrade.secondaryPriceAmount)
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
                        (localTrade.mainPrice.withAmount &&
                          localTrade.mainPriceAmount === 0) ||
                        (localTrade.secondaryPrice?.withAmount &&
                          localTrade.secondaryPriceAmount === 0)
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
                      updateTrade(localTrade, finished)
                    }}
                  >
                    Update
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
      <ActionButton
        type='warning'
        onClick={() => setDialogOpen(true)}
        small={true}
      >
        <Image
          src={`/assets/svgs/edit/white.svg`}
          height='24px'
          width='24px'
          alt='Delete Trade'
        />
      </ActionButton>
    </>
  )
}

export default EditTradeDialog
