import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent, useEffect, useState } from 'react'
import {
  SearchMarket,
  SearchOffer,
  SearchWish,
  SEARCH_VIEW,
} from '../../shared/handlers/search.handler'
import { itemSlotValues } from '../../shared/static/filterValues'
import { Inventory } from '../../shared/stores/inventory/inventory.model'
import { createItem, Item } from '../../shared/stores/items/item.model'
import { Price } from '../../shared/stores/prices/price.model'
import Verified from '../styles/VerifiedSvg'

interface Props {
  trade: SearchOffer | SearchWish
  items: Item[]
  prices: Price[]
  type: SEARCH_VIEW
  inventory: Inventory
}

const SearchTradeView: FunctionComponent<Props> = ({
  trade,
  items,
  prices,
  type,
  inventory,
}) => {
  const [item, setItem] = useState<Item>(createItem({}))

  const owned = inventory.inventoryItems.some((ii) => ii.item.id === item.id)
  const inventoryItem = inventory.inventoryItems.find(
    (ii) => ii.item.id === item.id
  )
  let amount = 0
  if (inventoryItem) {
    amount = inventoryItem.amount
  }

  useEffect(() => {
    if (items.length > 0) {
      const item = items.find((i) => i.id === trade.id)
      if (item) {
        setItem(item)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  const getPrice = (priceKey: string) => {
    let price = prices.find((p) => p.priceKey === priceKey)
    if (!price) {
      price = prices[0]
    }
    return price
  }

  const sortMarkets = (a: SearchMarket, b: SearchMarket) => {
    let aPriceValue = 0
    if (a.mainPriceAmount) {
      aPriceValue += getRealPriceValue(a.mainPrice.priceKey, a.mainPriceAmount)
    }
    if (
      a.secondaryPrice &&
      a.secondaryPriceAmount &&
      (!a.mainPriceAmount || a.wantsBoth)
    ) {
      aPriceValue += getRealPriceValue(
        a.secondaryPrice.priceKey,
        a.secondaryPriceAmount
      )
    }

    let bPriceValue = 0
    if (b.mainPriceAmount) {
      bPriceValue += getRealPriceValue(b.mainPrice.priceKey, b.mainPriceAmount)
    }
    if (
      b.secondaryPrice &&
      b.secondaryPriceAmount &&
      (!b.mainPriceAmount || b.wantsBoth)
    ) {
      bPriceValue += getRealPriceValue(
        b.secondaryPrice.priceKey,
        b.secondaryPriceAmount
      )
    }
    if (type === SEARCH_VIEW.OFFERS) {
      return aPriceValue - bPriceValue
    } else {
      return bPriceValue - aPriceValue
    }
  }

  const getRealPriceValue = (priceKey: string, amount: number) => {
    let singePriceValue = 0
    switch (priceKey) {
      case 'common':
        singePriceValue = 1
        break
      case 'uncommon':
        singePriceValue = 4
        break
      case 'rare':
        singePriceValue = 16
        break
      case 'odd_mushroom':
        singePriceValue = 16
        break
      case 'rusty_nails':
        singePriceValue = 16
        break
      case 'shell':
        singePriceValue = 16
        break
      case 'ectoplasm':
        singePriceValue = 16
        break
      case 'red_string':
        singePriceValue = 16
        break
      case 'coin':
        singePriceValue = 16
        break
      case 'candy_cane':
        singePriceValue = 16
        break
      case 'morgaryll_flower':
        singePriceValue = 16
        break
      case 'scarab':
        singePriceValue = 16
        break
      case 'veryrare':
        singePriceValue = 64
        break
      case 'whimsical':
        singePriceValue = 256
        break
    }
    return singePriceValue * amount
  }

  return (
    <>
      {item.id && (
        <div
          className='flex p-1 h-full bg-wt-surface-dark rounded-lg border-2'
          style={{ borderColor: `#${item.rarityColor}`, width: '430px' }}
        >
          <div className='flex flex-col justify-between items-center w-1/3'>
            <p className='mb-2 max-w-full font-bold text-center break-words'>
              {item.name}
            </p>
            <div>
              <Image
                className='rounded-lg'
                src={item.iconUrl}
                height={120}
                width={120}
                alt={item.name}
              />
            </div>
            {inventory.showInTrading && owned && (
              <p className='p-1 text-sm text-wt-light bg-wt-success-dark rounded-md'>
                You own{' '}
                <span className='whitespace-nowrap'>
                  {amount > 1
                    ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +
                      'x'
                    : `${amount}x`}
                </span>
              </p>
            )}
            {inventory.showInTrading && !owned && (
              <div className='flex justify-center items-center p-1 bg-wt-error-dark rounded-md'>
                <p className='text-xs text-center text-wt-light'>
                  You don&apos;t own this item
                </p>
              </div>
            )}
          </div>
          <div className='flex flex-col w-2/3'>
            <p className='text-center'>
              {trade.markets.length}{' '}
              {type === SEARCH_VIEW.OFFERS ? 'market' : 'user'}
              {trade.markets.length === 1 ? '' : 's'}
              {type === SEARCH_VIEW.OFFERS ? (
                <span className='text-wt-accent'>
                  {' '}
                  ({(trade.markets as any).reduce((a, b) => a + b.quantity, 0)}
                  x)
                </span>
              ) : (
                ` want${trade.markets.length === 1 ? 's' : ''} this item`
              )}
            </p>
            <div
              className='flex overflow-x-hidden overflow-y-auto flex-col max-w-full'
              style={{ maxHeight: '200px' }}
            >
              {trade.markets
                .sort(sortMarkets)
                .sort((a, b) =>
                  a.user.verified === b.user.verified
                    ? 0
                    : a.user.verified
                    ? -1
                    : 1
                )
                .map((m, i) => (
                  <Link
                    key={i}
                    href={`/@/${m.user.username}?searchString=${
                      item.name
                    }&itemSlot=${
                      itemSlotValues.find((isv) => isv.key === item.tagSlot)?.id
                    }${type === SEARCH_VIEW.WISHES ? '&marketType=1' : ''}`}
                  >
                    <a>
                      <div className='flex justify-between items-center p-1 my-1 mx-2 hover:bg-wt-surface rounded-lg cursor-pointer'>
                        <div
                          className='flex'
                          style={{
                            maxWidth: m.secondaryPrice ? '140px' : '180px',
                          }}
                        >
                          {type === SEARCH_VIEW.OFFERS && (
                            <p className='mr-1 text-wt-accent'>{m.quantity}x</p>
                          )}
                          <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
                            {m.user.displayName}
                          </p>
                          {m.user.verified && (
                            <div className='flex items-center ml-1 w-6 h-6'>
                              <div className='w-4 h-4'>
                                <Verified />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='flex'>
                          <div className='flex items-center mx-1'>
                            <div className='w-8 h-8'>
                              <Image
                                className='rounded-lg'
                                src={`/assets/images/prices/${m.mainPrice.priceKey}.png`}
                                height={32}
                                width={32}
                                quality={100}
                                alt={getPrice(m.mainPrice.priceKey).displayName}
                              />
                            </div>
                            {getPrice(m.mainPrice.priceKey).withAmount && (
                              <p className='text-sm'>{m.mainPriceAmount}</p>
                            )}
                          </div>
                          {m.secondaryPrice && (
                            <>
                              <div className='flex items-center'>
                                <p className='font-bold text-wt-accent'>
                                  {m.wantsBoth ? '+' : '/'}
                                </p>
                              </div>
                              <div className='flex items-center mx-1'>
                                <div className='w-8 h-8'>
                                  <Image
                                    className='rounded-lg'
                                    src={`/assets/images/prices/${m.secondaryPrice.priceKey}.png`}
                                    height={32}
                                    width={32}
                                    quality={100}
                                    alt={
                                      getPrice(m.secondaryPrice.priceKey)
                                        .displayName
                                    }
                                  />
                                </div>
                                {getPrice(m.secondaryPrice.priceKey)
                                  .withAmount && (
                                  <p className='mr-1 text-sm'>
                                    {m.secondaryPriceAmount}
                                  </p>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchTradeView
