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
            <div className="hidden md:flex flex-col justify-between w-36 border-4 rounded-lg bg-wt-surface-dark text-center m-1 shadow-md" style={{ borderColor: `#${item.nameColor}` }}>
                <Image className="rounded-t-lg" src={item.iconUrl} height={144} width={144} alt={item.name} />
                <p className="font-semibold p-1">{item.name}</p>
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
            <div className="md:hidden flex justify-between border-4 rounded-lg bg-wt-surface-dark m-1 w-full text-center shadow-md" style={{ borderColor: `#${item.nameColor}` }}>
                <Image className="rounded-l-lg" src={item.iconUrl} height={96} width={96} alt={item.name} />
                <div className="flex flex-col flex-grow justify-between" style={{ maxWidth: 'calc(100% - 96px)' }}>
                    <p className="font-semibold p-1">{item.name}</p>
                    <div>
                        {item.new &&
                            <p className="text-wt-text text-sm bg-wt-success font-semibold">New!</p>
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
            </div>
        </>
    );
};

export default ItemView;