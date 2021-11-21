import { FunctionComponent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchMarket, SearchOffer, SearchWish, SEARCH_VIEW } from '../../shared/handlers/search.handler';
import { Inventory } from '../../shared/stores/inventory/inventory.model';
import { createItem, Item } from '../../shared/stores/items/item.model';
import { Price } from '../../shared/stores/markets/market.model';

interface Props {
  trade: SearchOffer | SearchWish;
  items: Item[];
  prices: Price[];
  type: SEARCH_VIEW;
  inventory: Inventory;
};

const SearchTradeView: FunctionComponent<Props> = ({ trade, items, prices, type, inventory }) => {
  const [item, setItem] = useState<Item>(createItem({}));

  const owned = inventory.inventoryItems.some(ii => ii.item.id === item.id);
  const inventoryItem = inventory.inventoryItems.find(ii => ii.item.id === item.id);
  let amount = 0;
  if (inventoryItem) {
    amount = inventoryItem.amount;
  }

  useEffect(() => {
    if (items.length > 0) {
      let item = items.find(i => i.id === trade.id);
      if (item) {
        setItem(item);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const getPrice = (priceKey: string) => {
    let price = prices.find(p => p.priceKey === priceKey);
    if (!price) {
      price = prices[0];
    }
    return price;
  };

  const sortMarkets = (a: SearchMarket, b: SearchMarket) => {
    let aPriceValue = 0;
    if (a.mainPriceAmount) {
      aPriceValue += getRealPriceValue(a.mainPrice.priceKey, a.mainPriceAmount);
    }
    if (a.secondaryPrice && a.secondaryPriceAmount) {
      aPriceValue += getRealPriceValue(a.secondaryPrice.priceKey, a.secondaryPriceAmount);
    }

    let bPriceValue = 0;
    if (b.mainPriceAmount) {
      bPriceValue += getRealPriceValue(b.mainPrice.priceKey, b.mainPriceAmount);
    }
    if (b.secondaryPrice && b.secondaryPriceAmount) {
      bPriceValue += getRealPriceValue(b.secondaryPrice.priceKey, b.secondaryPriceAmount);
    }
    if (type === SEARCH_VIEW.OFFERS) {
      return aPriceValue - bPriceValue;
    } else {
      return bPriceValue - aPriceValue;
    }
  };

  const getRealPriceValue = (priceKey: string, amount: number) => {
    let singePriceValue = 0;
    switch (priceKey) {
      case 'common':
        singePriceValue = 1;
        break;
      case 'uncommon':
        singePriceValue = 4;
        break;
      case 'rare':
        singePriceValue = 16;
        break;
      case 'odd_mushroom':
        singePriceValue = 16;
        break;
      case 'rusty_nails':
        singePriceValue = 16;
        break;
      case 'shell':
        singePriceValue = 16;
        break;
      case 'ectoplasm':
        singePriceValue = 16;
        break;
      case 'red_string':
        singePriceValue = 16;
        break;
      case 'coin':
        singePriceValue = 16;
        break;
      case 'candy_cane':
        singePriceValue = 16;
        break;
      case 'morgaryll_flower':
        singePriceValue = 16;
        break;
      case 'scarab':
        singePriceValue = 16;
        break;
      case 'veryrare':
        singePriceValue = 64;
        break;
      case 'whimsical':
        singePriceValue = 256;
        break;
    };
    return singePriceValue * amount;
  };

  return (
    <>
      {item.id &&
        <div className="flex bg-wt-surface-dark border-2 p-1 rounded-lg h-full" style={{ borderColor: `#${item.rarityColor}`, width: '370px' }}>
          <div className="flex flex-col justify-between items-center w-1/3">
            <p className="font-bold text-center mb-2 break-words max-w-full">{item.name}</p>
            <div>
              <Image className="rounded-lg" src={item.iconUrl} height={120} width={120} alt={item.name} />
            </div>
            {inventory.showInTrading && owned &&
              <p className="text-wt-text text-sm bg-wt-success-dark p-1 rounded-md">You own {amount > 1 ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + 'x' : `${amount}x`}</p>
            }
            {inventory.showInTrading && !owned &&
              <div className="flex justify-center items-center bg-wt-error-dark p-1 rounded-md">
                <p className="text-wt-text text-xs text-center">You don&apos;t own this item</p>
              </div>
            }
          </div>
          <div className="flex flex-col w-2/3">
            <p className="text-center">{trade.markets.length} {type === SEARCH_VIEW.OFFERS ? 'market' : 'user'}{trade.markets.length === 1 ? '' : 's'}{type === SEARCH_VIEW.OFFERS ? (<span className="text-wt-accent"> ({(trade.markets as any).reduce((a, b) => a + b.quantity, 0)}x)</span>) : ` want${trade.markets.length === 1 ? 's' : ''} this item`}</p>
            <div className="flex flex-col overflow-y-auto max-w-full" style={{ maxHeight: '180px' }}>
              {trade.markets.sort(sortMarkets).sort((a, b) => (a.user.verified === b.user.verified) ? 0 : a.user.verified ? -1 : 1).map((m, i) => (
                <Link key={i} href={`/@/${m.user.username}?searchString=${item.name}&itemSlot=${item.tagSlot}${type === SEARCH_VIEW.WISHES ? '&marketType=1' : ''}`}>
                  <a>
                    <div className="flex justify-between items-center hover:bg-wt-surface cursor-pointer my-1 mx-2 p-1 rounded-lg">
                      <div className="flex" style={{ maxWidth: m.secondaryPrice ? '120px' : '180px' }}>
                        {type === SEARCH_VIEW.OFFERS &&
                          <p className="text-wt-accent mr-1">{m.quantity}x</p>
                        }
                        <p className="whitespace-nowrap overflow-ellipsis overflow-hidden">{m.user.displayName}</p>
                        {m.user.verified &&
                          <div className="flex items-center ml-1 h-6 w-6">
                            <Image src="/assets/svgs/verified.svg" height={16} width={16} alt="Verified" />
                          </div>
                        }
                      </div>
                      <div className="flex">
                        <div className="flex items-center mx-1">
                          <div className="h-8 w-8">
                            <Image className="rounded-lg" src={`/assets/images/prices/${m.mainPrice.priceKey}.png`} height={32} width={32} quality={100} alt={getPrice(m.mainPrice.priceKey).displayName} />
                          </div>
                          {getPrice(m.mainPrice.priceKey).withAmount &&
                            <p className="mr-1 text-sm">{m.mainPriceAmount}</p>
                            ||
                            <div style={{ height: '14px' }}></div>
                          }
                        </div>
                        {m.secondaryPrice &&
                          <div className="flex items-center mx-1">
                            <div className="h-8 w-8">
                              <Image className="rounded-lg" src={`/assets/images/prices/${m.secondaryPrice.priceKey}.png`} height={32} width={32} quality={100} alt={getPrice(m.secondaryPrice.priceKey).displayName} />
                            </div>
                            {getPrice(m.secondaryPrice.priceKey).withAmount &&
                              <p className="mr-1 text-sm">{m.secondaryPriceAmount}</p>
                              ||
                              <div style={{ height: '14px' }}></div>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default SearchTradeView;
