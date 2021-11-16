import { FunctionComponent, useEffect, useState } from 'react';
import { Inventory } from '../../shared/stores/inventory/inventory.model';
import { Wish } from '../../shared/stores/markets/market.model';
import Image from 'next/image';
import { itemsQuery } from '../../shared/stores/items/items.query';
import { createItem, Item } from '../../shared/stores/items/item.model';
import Tooltip from '../styles/Tooltip';

interface Props {
  wish: Wish;
  inventory: Inventory;
};

const WishView: FunctionComponent<Props> = ({ wish, inventory }) => {
  const [item, setItem] = useState<Item>(createItem({}));

  const owned = inventory.inventoryItems.some(ii => ii.item.id === item.id);
  const inventoryItem = inventory.inventoryItems.find(ii => ii.item.id === item.id);
  let amount = 0;
  if (inventoryItem) {
    amount = inventoryItem.amount;
  }

  useEffect(() => {
    if (itemsQuery.getAll().length > 0) {
      let item = itemsQuery.getAll().find(i => i.id === wish.item.id);
      if (item) {
        setItem(item);
      }
    }
  }, [itemsQuery.getAll()]);

  return (
    <>
      {item.id &&
        <div className="flex w-40 flex-col justify-between rounded-lg bg-wt-surface-dark text-center m-1 shadow-md" style={{ borderColor: `#${item.rarityColor}`, borderWidth: '6px' }}>
          <Image className="rounded-t-lg" src={item.iconUrl} height={160} width={160} alt={item.name} />
          <p className="text-sm p-1 break-words font-semibold">{item.name}</p>
          <div className="rounded-lg border border-wt-accent mx-2 mb-2">
            <p className="text-sm p-1 font-bold">I'm offering</p>
            <div className={`flex ${wish.secondaryPrice ? 'justify-between' : 'justify-center'} mx-4 items-center mb-2`}>
              <div className="flex items-center">
                {wish.mainPrice.withAmount &&
                  <p className="mr-1">{wish.mainPriceAmount}</p>
                }
                <Tooltip text={wish.mainPrice.displayName}>
                  <Image className="rounded-lg" src={`/assets/images/prices/${wish.mainPrice.priceKey}.png`} height={30} width={30} alt={wish.mainPrice.displayName} />
                </Tooltip>
              </div>
              {wish.secondaryPrice &&
                <div className="flex items-center">
                  <Tooltip text={wish.secondaryPrice.displayName}>
                    <Image className="rounded-lg" src={`/assets/images/prices/${wish.secondaryPrice.priceKey}.png`} height={30} width={30} alt={wish.secondaryPrice.displayName} />
                  </Tooltip>
                  {wish.secondaryPrice.withAmount &&
                    <p className="mr-1">{wish.secondaryPriceAmount}</p>
                  }
                </div>
              }
            </div>
          </div>
          {inventory.showInTrading && owned &&
            <p className="text-wt-text text-sm bg-wt-success-dark">You own {amount > 1 ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + 'x' : `${amount}x`}</p>
          }
          {inventory.showInTrading && !owned &&
            <div className="flex justify-center items-center bg-wt-error-dark h-5">
              <p className="text-wt-text text-xs">You don't own this item</p>
            </div>
          }
        </div>
      }
    </>
  );
};

export default WishView;
