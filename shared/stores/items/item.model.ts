export interface Item {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  rarityColor: string;
  tradeable: boolean;
  tagRarity: string;
  tagCharacter?: string;
  tagSlot: string;
  tagType: string;
  tagEvent?: string;
  new: boolean;
}

export function createItem(params: Partial<Item>) {
  return {
    id: params.id ? params.id : null,
    name: params.name ? params.name : null,
    description: params.description ? params.description : null,
    iconUrl: params.iconUrl ? params.iconUrl : null,
    rarityColor: params.rarityColor ? params.rarityColor : null,
    tradeable: params.tradeable ? params.tradeable : null,
    tagRarity: params.tagRarity ? params.tagRarity : null,
    tagCharacter: params.tagCharacter ? params.tagCharacter : null,
    tagSlot: params.tagSlot ? params.tagSlot : null,
    tagType: params.tagType ? params.tagType : null,
    tagEvent: params.tagEvent ? params.tagEvent : null,
    new: params.new ? params.new : null,
  } as Item;
}
