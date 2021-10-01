import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Inventory } from '../../shared/stores/inventory/inventory.model';
import { Item } from '../../shared/stores/items/item.model';

interface Props {
    item: Item;
    inventory: Inventory;
};

const ItemView: FunctionComponent<Props> = ({ item, inventory }) => {
    const owned = inventory.inventoryItems.some(ii => ii.item.id === item.id);
    const inventoryItem = inventory.inventoryItems.find(ii => ii.item.id === item.id);
    let amount = 0;
    if (inventoryItem) {
        amount = inventoryItem.amount;
    }

    return (
        <>
            <div className="flex w-28 md:w-36 flex-col justify-between border-4 rounded-lg bg-wt-surface-dark text-center m-1 shadow-md" style={{ borderColor: `#${item.nameColor}` }}>
                <Image className="rounded-t-lg" src={item.iconUrl} height={136} width={136} alt={item.name} />
                <p className="font-semibold p-1 break-words">{item.name}</p>
                <div>
                    {item.new &&
                        <p className="text-wt-dark text-sm bg-wt-success font-semibold">New!</p>
                    }
                    {!item.tradeable &&
                        <p className="text-wt-dark text-sm bg-wt-error font-semibold">Not tradeable</p>
                    }
                    {owned &&
                        <p className="text-wt-text text-sm bg-wt-accent font-semibold">Owned {amount > 1 ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + 'x' : ''}</p>
                    }
                    <p className="text-wt-dark capitalize font-bold text-sm" style={{ backgroundColor: `#${item.nameColor}` }}>{item.tagRarity}</p>
                </div>
            </div>
        </>
    );
};

export default ItemView;