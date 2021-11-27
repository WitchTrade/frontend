import { FunctionComponent, useEffect, useState } from 'react';
import { Inventory } from '../../shared/stores/inventory/inventory.model';
import { Offer, Price, Wish } from '../../shared/stores/markets/market.model';
import Image from 'next/image';
import { itemsQuery } from '../../shared/stores/items/items.query';
import { createItem, Item } from '../../shared/stores/items/item.model';
import Tooltip from '../styles/Tooltip';
import ActionButton from '../styles/ActionButton';
import Loading from '../styles/Loading';
import EditTradeDialog from './EditTradeDialog';

interface TradeWish extends Wish {
  quantity: number;
}

export enum TRADE_TYPE {
  MANAGE_OFFER,
  MANAGE_WISH,
  PROFILE_OFFER,
  PROFILE_WISH
}

interface Props {
  type: TRADE_TYPE;
  trade: Offer | TradeWish;
  inventory: Inventory;
  prices?: Price[];
  deleteTrade?: (trade: Offer | Wish) => void;
  updateTrade?: (trade: any, finished: () => void) => void;
  openItemDetails: (item: Item) => void;
};

const TradeView: FunctionComponent<Props> = ({ type, trade, inventory, prices, deleteTrade, updateTrade, openItemDetails }) => {
  const [item, setItem] = useState<Item>(createItem({}));

  const [loading, setLoading] = useState(false);

  const owned = inventory.inventoryItems.some(ii => ii.item.id === item.id);
  const inventoryItem = inventory.inventoryItems.find(ii => ii.item.id === item.id);
  let amount = 0;
  if (inventoryItem) {
    amount = inventoryItem.amount;
  }

  const items = itemsQuery.getAll();

  useEffect(() => {
    if (itemsQuery.getAll().length > 0) {
      let item = itemsQuery.getAll().find(i => i.id === trade.item.id);
      if (item) {
        setItem(item);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <>
      {item.id &&
        <div className="flex w-40 flex-col justify-between rounded-lg bg-wt-surface-dark text-center m-1 shadow-md" style={{ borderColor: `#${item.rarityColor}`, borderWidth: '6px' }}>
          <div className="cursor-pointer" onClick={() => openItemDetails(item)}>
            <Image className="rounded-t-lg" src={item.iconUrl} height={160} width={160} alt={item.name} />
          </div>
          <p className="text-sm p-1 break-words font-semibold">{item.name}</p>
          <div>
            {(type === TRADE_TYPE.MANAGE_OFFER || type === TRADE_TYPE.PROFILE_OFFER) &&
              <div className="flex justify-between mx-4">
                <p className="text-sm p-1 break-words">In stock:</p>
                <p className="text-sm p-1 break-words font-bold">{trade.quantity}</p>
              </div>
            }
            <div className="rounded-lg border border-wt-accent mx-2 mb-2">
              <p className="text-sm p-1 font-bold">{type === TRADE_TYPE.MANAGE_OFFER || type === TRADE_TYPE.PROFILE_OFFER ? 'Price per item' : 'I\'m offering'}</p>
              <div className={`flex ${trade.secondaryPrice ? 'justify-between' : 'justify-center'} mx-4 mb-2`}>
                <div className="flex flex-col">
                  <Tooltip text={trade.mainPrice.displayName}>
                    <Image className="rounded-lg" src={`/assets/images/prices/${trade.mainPrice.priceKey}.png`} height={40} width={40} quality={100} alt={trade.mainPrice.displayName} />
                  </Tooltip>
                  {trade.mainPrice.withAmount &&
                    <p className="mr-1">{trade.mainPriceAmount}</p>
                    ||
                    <div className="h-6"></div>
                  }
                </div>
                {trade.secondaryPrice &&
                  <div className="flex flex-col">
                    <Tooltip text={trade.secondaryPrice.displayName}>
                      <Image className="rounded-lg" src={`/assets/images/prices/${trade.secondaryPrice.priceKey}.png`} height={40} width={40} quality={100} alt={trade.secondaryPrice.displayName} />
                    </Tooltip>
                    {trade.secondaryPrice.withAmount &&
                      <p className="ml-1">{trade.secondaryPriceAmount}</p>
                    }
                  </div>
                }
              </div>
            </div>
            {(type === TRADE_TYPE.MANAGE_OFFER || type === TRADE_TYPE.MANAGE_WISH) && updateTrade && deleteTrade && prices &&
              <>
                <div className="flex justify-between py-1 px-2">
                  <EditTradeDialog type={type} selectedTrade={trade} selectedItem={item} updateTrade={updateTrade} prices={prices} />
                  <ActionButton type="cancel" onClick={() => { setLoading(true); deleteTrade(trade); }} small={true} disabled={loading}>
                    <Image src={`/assets/svgs/bin/white.svg`} height="24px" width="24px" alt="Delete Trade" />
                  </ActionButton>
                </div>
                {loading &&
                  <Loading />
                }
              </>
            }
            {inventory.showInTrading && owned &&
              <p className="text-wt-text text-sm bg-wt-success-dark">You own <span className="whitespace-nowrap">{amount > 1 ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + 'x' : `${amount}x`}</span></p>
            }
            {inventory.showInTrading && !owned &&
              <div className="flex justify-center items-center bg-wt-error-dark h-5">
                <p className="text-wt-text text-xs">You don&apos;t own this item</p>
              </div>
            }
          </div>
        </div>
      }
    </>
  );
};

export default TradeView;
