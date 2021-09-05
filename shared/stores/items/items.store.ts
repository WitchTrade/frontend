import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Item } from './item.model';

export interface ItemsState extends EntityState<Item> { }

@StoreConfig({
  name: 'items',
  idKey: 'id'
})
export class ItemsStore extends EntityStore<ItemsState> {

  constructor() {
    super();
  }

}

export const itemsStore = new ItemsStore();
