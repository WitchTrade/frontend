import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { DropdownValue } from '../../components/styles/Dropdown';
import useInventoryProvider from '../providers/inventory.provider';
import useItemsProvider from '../providers/items.provider';
import { Item } from '../stores/items/item.model';
import { itemsQuery } from '../stores/items/items.query';

export interface ItemFilterValues {
  searchString: string;
  tradeableOnly: boolean;
  newOnly: boolean;
  orderBy: DropdownValue;
  orderDirection: DropdownValue;
  itemCharacter: DropdownValue;
  itemSlot: DropdownValue;
  itemEvent: DropdownValue;
  itemRarity: DropdownValue;
  inventory: DropdownValue;
  duplicatesOnly: boolean;
}

export const orderByValues: DropdownValue[] = [
  { key: 'tagRarity', displayName: 'Rarity' },
  { key: 'name', displayName: 'Name' },
  { key: 'tradeable', displayName: 'Tradeable' }
];

export const orderDirectionValues: DropdownValue[] = [
  { key: 'asc', displayName: 'Ascending Order' },
  { key: 'desc', displayName: 'Descending Order' }
];

export const itemCharacterValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'none', displayName: 'No Character' },
  { key: 'hunter', displayName: 'Hunter' },
  { key: 'witch', displayName: 'Witch' }
];

export const itemSlotValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'ingredient', displayName: 'Ingredient', imagePath: '/assets/images/slotIcons/ingredient.png' },
  { key: 'body', displayName: 'Body', imagePath: '/assets/images/slotIcons/body.png' },
  { key: 'hat', displayName: 'Hat', imagePath: '/assets/images/slotIcons/hat.png' },
  { key: 'head', displayName: 'Head', imagePath: '/assets/images/slotIcons/head.png' },
  { key: 'skin color', displayName: 'Skin Color', imagePath: '/assets/images/slotIcons/skincolor.png' },
  { key: 'player icon', displayName: 'Player Icon', imagePath: '/assets/images/slotIcons/playericon.png' },
  { key: 'upper body', displayName: 'Upper Body', imagePath: '/assets/images/slotIcons/upperbody.png' },
  { key: 'lower body', displayName: 'Lower Body', imagePath: '/assets/images/slotIcons/lowerbody.png' },
  { key: 'melee weapon', displayName: 'Melee Weapon', imagePath: '/assets/images/slotIcons/melee.png' },
  { key: 'projectile', displayName: 'Projectile', imagePath: '/assets/images/slotIcons/projectile.png' },
  { key: 'broom', displayName: 'Broom', imagePath: '/assets/images/slotIcons/broom.png' },
  { key: 'recipe', displayName: 'Recipe', imagePath: '/assets/images/slotIcons/recipe.png' },
];

export const itemEventValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'none', displayName: 'No Event' },
  { key: 'theater', displayName: 'Theater' },
  { key: 'chinese newyear', displayName: 'Chinese New Year', imagePath: '/assets/images/eventIcons/chineseNewYear.png' },
  { key: 'halloween', displayName: 'Halloween', imagePath: '/assets/images/eventIcons/halloween.png' },
  { key: 'halloween2018', displayName: 'Halloween 2018', imagePath: '/assets/images/eventIcons/halloween2018.png' },
  { key: 'halloween2019', displayName: 'Halloween 2019', imagePath: '/assets/images/eventIcons/halloween2019.png' },
  { key: 'halloween2020', displayName: 'Halloween 2020' },
  { key: 'plunderparty', displayName: 'Plunder Party', imagePath: '/assets/images/eventIcons/plunderparty.png' },
  { key: 'springfever', displayName: 'Spring Fever', imagePath: '/assets/images/eventIcons/springfever.png' },
  { key: 'summerevent', displayName: 'Summer Event', imagePath: '/assets/images/eventIcons/summer.png' },
  { key: 'winterdream', displayName: 'Winterdream', imagePath: '/assets/images/eventIcons/winterdream.png' },
  { key: 'winterdream witch', displayName: 'Winterdream Witch', imagePath: '/assets/images/eventIcons/winterdreamwitch.png' },
  { key: 'winterdream2018', displayName: 'Winterdream 2018', imagePath: '/assets/images/eventIcons/winterdream2018.png' },
  { key: 'winterdream2019', displayName: 'Winterdream 2019', imagePath: '/assets/images/eventIcons/winterdream2019.png' },
  { key: 'winterdream2020', displayName: 'Winterdream 2020', imagePath: '/assets/images/eventIcons/winterdream2020.png' },
  { key: 'witchforest', displayName: 'Witch Forest', imagePath: '/assets/images/eventIcons/witchforest.png' }
];

export const itemRarityValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'common', displayName: 'Common', imagePath: '/assets/svgs/rarity_circles/common.svg' },
  { key: 'uncommon', displayName: 'Uncommon', imagePath: '/assets/svgs/rarity_circles/uncommon.svg' },
  { key: 'unlock', displayName: 'Unlock', imagePath: '/assets/svgs/rarity_circles/unlock.svg' },
  { key: 'eventrarity', displayName: 'Eventrarity', imagePath: '/assets/svgs/rarity_circles/eventrarity.svg' },
  { key: 'rare', displayName: 'Rare', imagePath: '/assets/svgs/rarity_circles/rare.svg' },
  { key: 'veryrare', displayName: 'Veryrare', imagePath: '/assets/svgs/rarity_circles/veryrare.svg' },
  { key: 'whimsical', displayName: 'Whimsical', imagePath: '/assets/svgs/rarity_circles/whimsical.svg' },
  { key: 'promo', displayName: 'Promo', imagePath: '/assets/svgs/rarity_circles/promo.svg' }
];

export const inventoryValues: DropdownValue[] = [
  { key: 'any', displayName: 'Any' },
  { key: 'owned', displayName: 'Owned' },
  { key: 'notowned', displayName: 'Not owned' }
];

const ItemsHandler = () => {
  const router = useRouter();

  const { inventory } = useInventoryProvider();

  const { items } = useItemsProvider();

  const [queryLoaded, setQueryLoaded] = useState(false);

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loadedItems, setLoadedItems] = useState<Item[]>([]);

  const [itemFilterValues, setItemFilterValues] = useState<ItemFilterValues>({
    searchString: '',
    tradeableOnly: false,
    newOnly: false,
    orderBy: orderByValues[0],
    orderDirection: orderDirectionValues[0],
    itemCharacter: itemCharacterValues[0],
    itemSlot: itemSlotValues[0],
    itemEvent: itemEventValues[0],
    itemRarity: itemRarityValues[0],
    inventory: inventoryValues[0],
    duplicatesOnly: false
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item>();

  useEffect(() => {
    if (!queryLoaded && router.isReady) {
      const searchString = typeof router.query.searchString === 'string' ? router.query.searchString : '';
      const tradeableOnly = typeof router.query.tradeableOnly === 'string' && router.query.tradeableOnly === 'true' ? true : false;
      const newOnly = typeof router.query.newOnly === 'string' && router.query.newOnly === 'true' ? true : false;

      let orderBy;
      if (typeof router.query.orderBy === 'string') {
        orderBy = orderByValues.find(obv => obv.key === router.query.orderBy);
      }
      let orderDirection;
      if (typeof router.query.orderDirection === 'string') {
        orderDirection = orderDirectionValues.find(odv => odv.key === router.query.orderDirection);
      }
      let itemCharacter;
      if (typeof router.query.itemCharacter === 'string') {
        itemCharacter = itemCharacterValues.find(icv => icv.key === router.query.itemCharacter);
      }
      let itemSlot;
      if (typeof router.query.itemSlot === 'string') {
        itemSlot = itemSlotValues.find(isv => isv.key === router.query.itemSlot);
      }
      let itemEvent;
      if (typeof router.query.itemEvent === 'string') {
        itemEvent = itemEventValues.find(iev => iev.key === router.query.itemEvent);
      }
      let itemRarity;
      if (typeof router.query.itemRarity === 'string') {
        itemRarity = itemRarityValues.find(irv => irv.key === router.query.itemRarity);
      }
      let inventory;
      if (typeof router.query.inventory === 'string') {
        inventory = inventoryValues.find(i => i.key === router.query.inventory);
      }

      const duplicatesOnly = typeof router.query.duplicatesOnly === 'string' && router.query.duplicatesOnly === 'true' ? true : false;

      setItemFilterValues({
        searchString,
        tradeableOnly,
        newOnly,
        orderBy: orderBy ? orderBy : orderByValues[0],
        orderDirection: orderDirection ? orderDirection : orderDirectionValues[0],
        itemCharacter: itemCharacter ? itemCharacter : itemCharacterValues[0],
        itemSlot: itemSlot ? itemSlot : itemSlotValues[0],
        itemEvent: itemEvent ? itemEvent : itemEventValues[0],
        itemRarity: itemRarity ? itemRarity : itemRarityValues[0],
        inventory: inventory ? inventory : inventoryValues[0],
        duplicatesOnly
      });
      setQueryLoaded(true);
    }
  }, [router.query]);

  useEffect(() => {
    filterItems();
  }, [items]);

  useEffect(() => {
    setLoadedItems(filteredItems.slice(0, 75));
  }, [filteredItems]);

  useEffect(() => {
    filterItems();
    if (!queryLoaded) {
      return;
    }

    const query: { [key: string]: string | boolean | undefined; } = {
      searchString: itemFilterValues.searchString !== '' ? itemFilterValues.searchString : undefined,
      tradeableOnly: itemFilterValues.tradeableOnly !== false ? itemFilterValues.tradeableOnly : undefined,
      newOnly: itemFilterValues.newOnly !== false ? itemFilterValues.newOnly : undefined,
      orderBy: itemFilterValues.orderBy.key !== orderByValues[0].key ? itemFilterValues.orderBy.key : undefined,
      orderDirection: itemFilterValues.orderDirection.key !== orderDirectionValues[0].key ? itemFilterValues.orderDirection.key : undefined,
      itemCharacter: itemFilterValues.itemCharacter.key !== itemCharacterValues[0].key ? itemFilterValues.itemCharacter.key : undefined,
      itemSlot: itemFilterValues.itemSlot.key !== itemSlotValues[0].key ? itemFilterValues.itemSlot.key : undefined,
      itemEvent: itemFilterValues.itemEvent.key !== itemEventValues[0].key ? itemFilterValues.itemEvent.key : undefined,
      itemRarity: itemFilterValues.itemRarity.key !== itemRarityValues[0].key ? itemFilterValues.itemRarity.key : undefined,
      inventory: itemFilterValues.inventory.key !== inventoryValues[0].key ? itemFilterValues.inventory.key : undefined,
      duplicatesOnly: itemFilterValues.duplicatesOnly !== false ? itemFilterValues.duplicatesOnly : undefined,
    };

    Object.keys(query).forEach(key => query[key] === undefined ? delete query[key] : {});
    router.replace(
      { query },
      undefined,
      { scroll: false }
    );
  }, [itemFilterValues]);

  const filterItems = () => {
    const filteredItems = items.filter((item) => {
      const searchString = item.name.toLowerCase().includes(itemFilterValues.searchString.toLowerCase());
      const tradeableOnly = itemFilterValues.tradeableOnly ? item.tradeable : true;
      const newOnly = itemFilterValues.newOnly ? item.new : true;
      const itemCharacter = itemFilterValues.itemCharacter.key !== 'any' ? itemFilterValues.itemCharacter.key === 'none' ? item.tagCharacter === null : item.tagCharacter === itemFilterValues.itemCharacter.key : true;
      const itemSlot = itemFilterValues.itemSlot.key !== 'any' ? item.tagSlot === itemFilterValues.itemSlot.key : true;
      const itemEvent = itemFilterValues.itemEvent.key !== 'any' ? itemFilterValues.itemEvent.key === 'none' ? item.tagEvent === null : item.tagEvent === itemFilterValues.itemEvent.key : true;
      const itemRarity = itemFilterValues.itemRarity.key !== 'any' ? item.tagRarity === itemFilterValues.itemRarity.key : true;

      const inventoryFilter = inventory.id && itemFilterValues.inventory.key !== 'any' ? itemFilterValues.inventory.key === 'owned' ? inventory.inventoryItems.find(ii => ii.item.id === item.id) : !inventory.inventoryItems.find(ii => ii.item.id === item.id) && item.tagSlot !== 'ingredient' && item.tagSlot !== 'recipe' : true;
      const duplicatesOnly = itemFilterValues.duplicatesOnly ? inventory.inventoryItems.find(ii => ii.item.id === item.id && ii.amount > 1) && item.tagSlot !== 'ingredient' : true;

      return searchString &&
        tradeableOnly &&
        newOnly &&
        itemCharacter &&
        itemSlot &&
        itemEvent &&
        itemRarity &&
        inventoryFilter &&
        duplicatesOnly;
    });
    filteredItems.sort((a, b) => {
      const key = itemFilterValues.orderBy.key as keyof Item;
      let one = a[key];
      let two = b[key];
      if (one === undefined || two === undefined) {
        return 0;
      }
      if (itemFilterValues.orderBy.key === 'tagRarity') {
        one = itemsQuery.getRarities().indexOf(one as string);
        two = itemsQuery.getRarities().indexOf(two as string);
      }
      let returnValue = 0;
      if (one > two) {
        returnValue = 1;
      }
      if (two > one) {
        returnValue = -1;
      }
      if (itemFilterValues.orderDirection.key === 'desc') {
        returnValue *= -1;
      }
      return returnValue;
    });
    setFilteredItems(filteredItems);
  };

  const loadMoreItems = () => {
    setLoadedItems(filteredItems.slice(0, loadedItems.length + 75));
  };

  const hasMoreItems = () => {
    return items.length > loadedItems.length;
  };

  const openItemDetails = (item: Item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return {
    inventory,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues,
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails
  };
};

export default ItemsHandler;
