import { QueryEntity } from '@datorama/akita';
import { ItemsStore, ItemsState, itemsStore } from './items.store';

export class ItemsQuery extends QueryEntity<ItemsState> {

  private NOT_FOUND_ICON_URL = '/assets/svgs/notFound.svg';

  constructor(protected store: ItemsStore) {
    super(store);
  }

  public getIconUrlOf(itemId: number): string {
    const iconUrl = this.getEntity(itemId)?.iconUrl;
    return iconUrl ? iconUrl : this.NOT_FOUND_ICON_URL;
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
