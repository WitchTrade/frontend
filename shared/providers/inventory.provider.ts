import { useEffect, useState } from 'react';
import { createInventory, Inventory } from '../stores/inventory/inventory.model';
import { inventoryQuery } from '../stores/inventory/inventory.query';

const useInventoryProvider = () => {
  const [inventory, setInventory] = useState<Inventory>(createInventory({}));

  useEffect(() => {
    const inventorySub = inventoryQuery.select().subscribe(setInventory);

    return (() => {
      inventorySub.unsubscribe();
    });
  }, []);

  return { inventory };
};

export default useInventoryProvider;
