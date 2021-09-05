export interface Item {
  id: number;
  name: string;
  description: string;
  backgroundColor: string;
  dateCreated: string;
  iconUrl: string;
  itemQuality: string;
  itemSlot: string;
  marketable: boolean;
  nameColor: string;
  quantity: number;
  tradeable: boolean;
  type: string;
  tagRarity: string;
  tagCharacter?: string;
  tagSlot: string;
  tagType: string;
  tagEvent?: string;
  new?: boolean;
}

export function createItem(params: Partial<Item>) {
  return {
    id: params.id ? params.id : null,
    name: params.name ? params.name : null,
    description: params.description ? params.description : null,
    backgroundColor: params.backgroundColor ? params.backgroundColor : null,
    dateCreated: params.dateCreated ? params.dateCreated : null,
    iconUrl: params.iconUrl ? params.iconUrl : null,
    itemQuality: params.itemQuality ? params.itemQuality : null,
    itemSlot: params.itemSlot ? params.itemSlot : null,
    marketable: params.marketable ? params.marketable : null,
    nameColor: params.nameColor ? params.nameColor : null,
    quantity: params.quantity ? params.quantity : null,
    tradeable: params.tradeable ? params.tradeable : null,
    type: params.type ? params.type : null,
    tagRarity: params.tagRarity ? params.tagRarity : null,
    tagCharacter: params.tagCharacter ? params.tagCharacter : null,
    tagSlot: params.tagSlot ? params.tagSlot : null,
    tagType: params.tagType ? params.tagType : null,
    tagEvent: params.tagEvent ? params.tagEvent : null,
    new: params.new ? params.new : null,
  } as Item;
}
