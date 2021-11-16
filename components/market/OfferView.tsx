import { FunctionComponent, useEffect, useState } from 'react';
import { Inventory } from '../../shared/stores/inventory/inventory.model';
import { Offer } from '../../shared/stores/markets/market.model';
import Image from 'next/image';
import { itemsQuery } from '../../shared/stores/items/items.query';
import { createItem, Item } from '../../shared/stores/items/item.model';
import Tooltip from '../styles/Tooltip';

interface Props {
  offer: Offer;
  inventory: Inventory;
};

const OfferView: FunctionComponent<Props> = ({ offer, inventory }) => {
  const [item, setItem] = useState<Item>(createItem({}));

  const owned = inventory.inventoryItems.some(ii => ii.item.id === item.id);
  const inventoryItem = inventory.inventoryItems.find(ii => ii.item.id === item.id);
  let amount = 0;
  if (inventoryItem) {
    amount = inventoryItem.amount;
  }

  useEffect(() => {
    if (itemsQuery.getAll().length > 0) {
      let item = itemsQuery.getAll().find(i => i.id === offer.item.id);
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
          <div className="flex justify-between mx-4">
            <p className="text-sm p-1 break-words">In stock:</p>
            <p className="text-sm p-1 break-words font-bold">{offer.quantity}</p>
          </div>
          <div className="rounded-lg border border-wt-accent mx-2 mb-2">
            <p className="text-sm p-1 font-bold">Price per item</p>
            <div className={`flex ${offer.secondaryPrice ? 'justify-between' : 'justify-center'} mx-4 items-center mb-2`}>
              <div className="flex items-center">
                {offer.mainPrice.withAmount &&
                  <p className="mr-1">{offer.mainPriceAmount}</p>
                }
                <Tooltip text={offer.mainPrice.displayName}>
                  <Image className="rounded-lg" src={`/assets/images/prices/${offer.mainPrice.priceKey}.png`} height={30} width={30} alt={offer.mainPrice.displayName} />
                </Tooltip>
              </div>
              {offer.secondaryPrice &&
                <div className="flex items-center">
                  <Tooltip text={offer.secondaryPrice.displayName}>
                    <Image className="rounded-lg" src={`/assets/images/prices/${offer.secondaryPrice.priceKey}.png`} height={30} width={30} alt={offer.secondaryPrice.displayName} />
                  </Tooltip>
                  {offer.secondaryPrice.withAmount &&
                    <p className="ml-1">{offer.secondaryPriceAmount}</p>
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

export default OfferView;
