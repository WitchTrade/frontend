import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useObservable } from '@ngneat/react-rxjs';
import { selectAll } from '@ngneat/elf-entities';
import { Item } from '../stores/items/item.model';
import { inventoryStore } from '../stores/inventory/inventory.store';
import { getItemRarities, itemsStore } from '../stores/items/items.store';
import { Offer, Wish } from '../stores/markets/market.model';
import { MARKET_TYPE } from './market.handler';
import { createDefaultItemFilter, FILTER_TYPE, inventoryValues, itemCharacterValues, itemEventValues, ItemFilterValues, itemRarityValues, itemSlotValues, orderByValues, orderDirectionValues, tradeableItemRarityValues } from '../static/filterValues';

const FilterHandler = (type: FILTER_TYPE, itemsToLoad: number, trades?: Offer[] | Wish[], marketType?: MARKET_TYPE, setMarketType?: (marketType: MARKET_TYPE) => void) => {
  const router = useRouter();
  const username = router.query.username;

  const [inventory] = useObservable(inventoryStore);

  const [items] = useObservable(itemsStore.pipe(selectAll()));

  const [queryLoaded, setQueryLoaded] = useState(false);
  const [usernameChanged, setUsernameChanged] = useState(false);

  const [filteredItems, setFilteredItems] = useState<Item[] | Offer[] | Wish[]>([]);
  const [loadedItems, setLoadedItems] = useState<Item[] | Offer[] | Wish[]>([]);

  const [itemFilterValues, setItemFilterValues] = useState<ItemFilterValues>(createDefaultItemFilter(type));

  useEffect(() => {
    if ((!queryLoaded || usernameChanged) && router.isReady && type !== FILTER_TYPE.NEWTRADE) {
      const searchString = typeof router.query.searchString === 'string' ? router.query.searchString : '';
      const tradeableOnly = typeof router.query.tradeableOnly === 'string' && router.query.tradeableOnly === 'true' ? true : false;
      const newOnly = typeof router.query.newOnly === 'string' && router.query.newOnly === 'true' ? true : false;
      const newMarketType = typeof router.query.marketType === 'string' && router.query.marketType === '1' ? MARKET_TYPE.WISH : MARKET_TYPE.OFFER;

      let orderBy;
      if (typeof router.query.orderBy === 'string') {
        orderBy = orderByValues.find(obv => obv.key === router.query.orderBy);
      }
      let orderDirection;
      if (typeof router.query.orderDirection === 'string') {
        orderDirection = orderDirectionValues.find(odv => odv.key === router.query.orderDirection);
      }
      let itemCharacters;
      if (typeof router.query.itemCharacter === 'string') {
        itemCharacters = router.query.itemCharacter.split('-').map(id => itemCharacterValues.find(icv => icv.id === parseInt(id))).filter(val => val);;
      }
      let itemSlots;
      if (typeof router.query.itemSlot === 'string') {
        itemSlots = router.query.itemSlot.split('-').map(id => itemSlotValues.find(isv => isv.id === parseInt(id))).filter(val => val);;
      }
      let itemEvents;
      if (typeof router.query.itemEvent === 'string') {
        itemEvents = router.query.itemEvent.split('-').map(id => itemEventValues.find(iev => iev.id === parseInt(id))).filter(val => val);;
      }
      let itemRarities;
      if (typeof router.query.itemRarity === 'string') {
        itemRarities = router.query.itemRarity.split('-').map(id => itemRarityValues.find(irv => irv.id === parseInt(id))).filter(val => val);
      }
      let inventory;
      if (typeof router.query.inventory === 'string') {
        inventory = inventoryValues.find(i => i.key === router.query.inventory);
      }

      setItemFilterValues({
        searchString,
        tradeableOnly,
        newOnly,
        orderBy: orderBy ? orderBy : orderByValues[0],
        orderDirection: orderDirection ? orderDirection : type === FILTER_TYPE.MARKET ? orderDirectionValues[1] : orderDirectionValues[0],
        itemCharacter: itemCharacters ? itemCharacters : itemCharacterValues,
        itemSlot: itemSlots ? itemSlots : itemSlotValues,
        itemEvent: itemEvents ? itemEvents : itemEventValues,
        itemRarity: itemRarities ? itemRarities : type === FILTER_TYPE.ITEM ? itemRarityValues : tradeableItemRarityValues,
        inventory: inventory ? inventory : inventoryValues[0]
      });
      if (setMarketType) {
        setMarketType(newMarketType);
      }
      setQueryLoaded(true);
      setUsernameChanged(false);
    }
  }, [router.query, queryLoaded, usernameChanged]);

  useEffect(() => {
    if (username) {
      setUsernameChanged(true);
    }
  }, [username]);

  useEffect(() => {
    filterItems();
  }, [items, trades, inventory]);

  useEffect(() => {
    setLoadedItems(filteredItems.slice(0, loadedItems.length > itemsToLoad ? loadedItems.length : itemsToLoad));
  }, [filteredItems]);

  useEffect(() => {
    filterItems();
    if (!queryLoaded || type === FILTER_TYPE.NEWTRADE) {
      return;
    }

    const query: { [key: string]: string | boolean | undefined; } = {
      searchString: itemFilterValues.searchString !== '' ? itemFilterValues.searchString : undefined,
      tradeableOnly: itemFilterValues.tradeableOnly !== false ? itemFilterValues.tradeableOnly : undefined,
      newOnly: itemFilterValues.newOnly !== false ? itemFilterValues.newOnly : undefined,
      orderBy: itemFilterValues.orderBy.key !== orderByValues[0].key ? itemFilterValues.orderBy.key : undefined,
      orderDirection: (type === FILTER_TYPE.MARKET && itemFilterValues.orderDirection.key === orderDirectionValues[0].key) || (type !== FILTER_TYPE.MARKET && itemFilterValues.orderDirection.key === orderDirectionValues[1].key) ? itemFilterValues.orderDirection.key : undefined,
      itemCharacter: itemFilterValues.itemCharacter.length < itemCharacterValues.length ? itemFilterValues.itemCharacter.map(ic => ic.id).join('-') : undefined,
      itemSlot: itemFilterValues.itemSlot.length < itemSlotValues.length ? itemFilterValues.itemSlot.map(is => is.id).join('-') : undefined,
      itemEvent: itemFilterValues.itemEvent.length < itemEventValues.length ? itemFilterValues.itemEvent.map(ie => ie.id).join('-') : undefined,
      itemRarity: itemFilterValues.itemRarity.length < (type === FILTER_TYPE.ITEM ? itemRarityValues.length : tradeableItemRarityValues.length) ? itemFilterValues.itemRarity.map(ir => ir.id).join('-') : undefined,
      inventory: itemFilterValues.inventory.key !== inventoryValues[0].key ? itemFilterValues.inventory.key : undefined,
      username: router.query.username ? router.query.username as string : undefined,
      marketType: marketType ? marketType.toString() : undefined
    };

    Object.keys(query).forEach(key => query[key] === undefined ? delete query[key] : {});
    router.replace(
      { query },
      undefined,
      { scroll: false }
    );
  }, [itemFilterValues, marketType]);

  const filterItems = () => {
    let filteredItems = items.filter((item) => {
      const searchString = item.name.toLowerCase().includes(itemFilterValues.searchString.toLowerCase());
      const tradeableOnly = itemFilterValues.tradeableOnly ? item.tradeable : true;
      const newOnly = itemFilterValues.newOnly ? item.new : true;
      const itemCharacter = itemFilterValues.itemCharacter.some(is => is.key === item.tagCharacter) || item.tagCharacter === null && itemFilterValues.itemCharacter.some(is => is.key === 'none');
      const itemSlot = itemFilterValues.itemSlot.some(is => is.key === item.tagSlot);
      const itemEvent = itemFilterValues.itemEvent.some(is => is.key === item.tagEvent) || item.tagEvent === null && itemFilterValues.itemEvent.some(is => is.key === 'none');
      const itemRarity = itemFilterValues.itemRarity.some(ir => ir.key === item.tagRarity);

      let inventoryFilter = true;
      if (inventory.id && itemFilterValues.inventory.key == 'owned') {
        inventoryFilter = inventory.inventoryItems.some(ii => ii.item.id === item.id);
      } else if (inventory.id && itemFilterValues.inventory.key == 'duplicateown') {
        inventoryFilter = inventory.inventoryItems.some(ii => ii.item.id === item.id && ii.amount > 1);
      } else if (inventory.id && itemFilterValues.inventory.key == 'notowned') {
        inventoryFilter = !inventory.inventoryItems.some(ii => ii.item.id === item.id);
      }

      return searchString &&
        tradeableOnly &&
        newOnly &&
        itemCharacter &&
        itemSlot &&
        itemEvent &&
        itemRarity &&
        inventoryFilter;
    });
    if (type === FILTER_TYPE.MARKET) {
      if (trades) {
        const filteredTrades = trades.filter(t => filteredItems.some(item => item.id === t.item.id));
        filteredTrades.sort((aTrade, bTrade) => {
          let a = items.find(i => i.id === aTrade.item.id);
          let b = items.find(i => i.id === bTrade.item.id);
          if (!a) {
            a = items[0];
          }
          if (!b) {
            b = items[0];
          }
          const key = itemFilterValues.orderBy.key as keyof Item;
          let one = a[key];
          let two = b[key];
          if (one === undefined || two === undefined) {
            return 0;
          }
          if (itemFilterValues.orderBy.key === 'tagRarity') {
            one = getItemRarities().indexOf(one as string);
            two = getItemRarities().indexOf(two as string);
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
          if (one === two) {
            returnValue = a.id - b.id;
          }
          return returnValue;
        });
        setFilteredItems(filteredTrades);
      }
    } else {
      if (type === FILTER_TYPE.NEWTRADE) {
        filteredItems = filteredItems.filter(i => i.tradeable && !trades?.some(t => t.item.id === i.id));
      }
      filteredItems.sort((a, b) => {
        const key = itemFilterValues.orderBy.key as keyof Item;
        let one = a[key];
        let two = b[key];
        if (one === undefined || two === undefined) {
          return 0;
        }
        if (itemFilterValues.orderBy.key === 'tagRarity') {
          one = getItemRarities().indexOf(one as string);
          two = getItemRarities().indexOf(two as string);
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
    }
  };

  const loadMoreItems = () => {
    setLoadedItems(filteredItems.slice(0, loadedItems.length + itemsToLoad));
  };

  const hasMoreItems = () => {
    return filteredItems.length > loadedItems.length;
  };

  const resetLoadedItems = () => {
    setLoadedItems(filteredItems.slice(0, itemsToLoad));
  };

  return {
    inventory,
    totalItemCount: type === FILTER_TYPE.MARKET && trades ? trades.length : items.length,
    filteredItems,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues,
    resetLoadedItems
  };
};

export default FilterHandler;
