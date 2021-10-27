import { QueryEntity } from '@datorama/akita';
import { ItemsStore, ItemsState, itemsStore } from './items.store';

export class ItemsQuery extends QueryEntity<ItemsState> {

  constructor(protected store: ItemsStore) {
    super(store);
  }

  public rarityToIngredientId(rarity: string): number {
    const rarityToIngredientId: { [key: string]: number; } = {
      common: 900,
      uncommon: 901,
      rare: 902,
      veryrare: 903,
      whimsical: 904
    };

    return rarityToIngredientId[rarity];
  }

  public getRarities(): string[] {
    return [
      'common',
      'uncommon',
      'unlock',
      'eventrarity',
      'rare',
      'veryrare',
      'whimsical',
      'promo'
    ];
  }

}

export const itemsQuery = new ItemsQuery(itemsStore);
