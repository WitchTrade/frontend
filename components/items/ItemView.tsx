import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Inventory } from '../../shared/stores/inventory/inventory.model';
import { Item } from '../../shared/stores/items/item.model';

interface Props {
  item: Item;
  inventory: Inventory;
  openItemDetails: (item: Item) => void;
};

const ItemView: FunctionComponent<Props> = ({ item, inventory, openItemDetails }) => {
  const owned = inventory.inventoryItems.some(ii => ii.item.id === item.id);
  const inventoryItem = inventory.inventoryItems.find(ii => ii.item.id === item.id);
  let amount = 0;
  if (inventoryItem) {
    amount = inventoryItem.amount;
  }

  return (
    <div className="flex w-28 md:w-36 flex-col justify-between rounded-lg bg-wt-surface-dark text-center m-1 shadow-md cursor-pointer transition duration-75 transform hover:scale-105" style={{ borderColor: `#${item.nameColor}`, borderWidth: '6px' }} onClick={() => openItemDetails(item)}>
      <Image className="rounded-t-lg" src={item.iconUrl} height={132} width={132} alt={item.name} />
      <p className="text-sm p-1 break-words font-semibold">{item.name}</p>
      <div>
        {item.new &&
          <p className="text-wt-dark text-sm bg-wt-success">New</p>
        }
        {!item.tradeable &&
          <p className="text-wt-dark text-sm bg-wt-error">Not tradeable</p>
        }
        {owned &&
          <p className="text-wt-text text-sm bg-wt-accent">Owned {amount > 1 ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + 'x' : ''}</p>
        }
      </div>
    </div>
  );
};

export default ItemView;
