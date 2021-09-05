import { Query } from '@datorama/akita';
import { Inventory } from './inventory.model';
import { InventoryStore, inventoryStore } from './inventory.store';

export class InventoryQuery extends Query<Inventory> {

  constructor(protected store: InventoryStore) {
    super(store);
  }

}

export const inventoryQuery = new InventoryQuery(inventoryStore);
