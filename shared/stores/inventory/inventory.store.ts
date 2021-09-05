import { Store, StoreConfig } from '@datorama/akita';
import { createInventory, Inventory } from './inventory.model';

@StoreConfig({ name: 'inventory' })
export class InventoryStore extends Store<Inventory> {

  constructor() {
    super(createInventory({}));
  }

}

export const inventoryStore = new InventoryStore();
