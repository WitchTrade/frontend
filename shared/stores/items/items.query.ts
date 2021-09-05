import { QueryEntity } from '@datorama/akita';
import { Item } from './item.model';
import { ItemsStore, ItemsState, itemsStore } from './items.store';

export class ItemsQuery extends QueryEntity<ItemsState> {

  constructor(protected store: ItemsStore) {
    super(store);
  }

  public itemToIngredientId(item: Item) {
    const rarityToIngredientId: { [key: string]: number; } = {
      'common': 900,
      'uncommon': 901,
      'rare': 902,
      'veryrare': 903,
      'whimsical': 904
    };
    return rarityToIngredientId[item.tagRarity];
  }

  public rarityToIngredient(rarity: string) {
    const rarityToIngredientId: { [key: string]: number; } = {
      'common': 900,
      'uncommon': 901,
      'rare': 902,
      'veryrare': 903,
      'whimsical': 904
    };
    return this.getEntity(rarityToIngredientId[rarity]);
  }

  public filterByRarity(items: Item[], rarity: string) {
    return items.filter(i => i.tagRarity === rarity.toLowerCase());
  }

  public rarityToColor(rarity: string) {
    switch (rarity) {
      case 'common':
        return '#7C7C7C';
      case 'uncommon':
        return '#ECECEC';
      case 'unlock':
        return '#C08051';
      case 'eventrarity':
        return '#FFE400';
      case 'rare':
        return '#45E53D';
      case 'veryrare':
        return '#1472FF';
      case 'whimsical':
        return '#FF00EA';
      case 'promo':
        return '#00E4FF';
      default:
        return '';
    }
  }

  public getRarities() {
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
