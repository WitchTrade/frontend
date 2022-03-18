import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { selectAllEntities } from '@ngneat/elf-entities';
import { useObservable } from '@ngneat/react-rxjs';
import { getItemRarities, itemsStore } from '../stores/items/items.store';
import { Item } from '../stores/items/item.model';
import { inventoryStore } from '../stores/inventory/inventory.store';
import {
  itemCharacterValues,
  itemEventValues,
  itemSlotValues,
  tradeableItemRarityValues
} from '../static/searchFilterValues';
import { searchService } from '../stores/search/search.service';
import { DropdownValue } from '../../components/styles/Dropdown';
import { createNotification } from '../stores/notification/notification.model';
import { notificationService } from '../stores/notification/notification.service';
import { pricesStore } from '../stores/prices/prices.store';
import { inventoryValues, orderDirectionValues, tradeableOrderByValues } from '../static/filterValues';

export interface SearchTrade {
  offers: SearchOffer[];
  wishes: SearchWish[];
}

export interface SearchOffer {
  id: number;
  markets: SearchMarket[];
}

export interface SearchWish {
  id: number;
  markets: SearchMarket[];
}

export interface SearchMarket {
  quantity?: number;
  mainPrice: {
    priceKey: string;
  };
  mainPriceAmount?: number;
  wantsBoth?: number;
  secondaryPrice?: {
    priceKey: string;
  };
  secondaryPriceAmount?: number;
  user: {
    username: string;
    displayName: string;
    verified: boolean;
  };
}

export interface SearchFilterValues {
  item?: Item;
  itemCharacter: DropdownValue;
  itemSlot: DropdownValue;
  itemEvent: DropdownValue;
  itemRarity: DropdownValue;
  inventory: DropdownValue;
  wishlistOnly: boolean;
}

export interface SearchOrderValues {
  orderBy: DropdownValue;
  orderDirection: DropdownValue;
}

export function createDefaultSearchFilter(): SearchFilterValues {
  return {
    itemCharacter: itemCharacterValues[0],
    itemSlot: itemSlotValues[0],
    itemEvent: itemEventValues[0],
    itemRarity: tradeableItemRarityValues[0],
    inventory: inventoryValues[0],
    wishlistOnly: false
  };
}

export function createDefaultSearchOrder(): SearchOrderValues {
  return {
    orderBy: tradeableOrderByValues[0],
    orderDirection: orderDirectionValues[0],
  };
}

export enum SEARCH_VIEW {
  OFFERS,
  WISHES
}

const SearchHandler = () => {
  const router = useRouter();

  const [inventory] = useObservable(inventoryStore);

  const [items] = useObservable(itemsStore.pipe(selectAllEntities()));
  const [prices] = useObservable(pricesStore.pipe(selectAllEntities()));

  const [searchView, setSearchView] = useState(SEARCH_VIEW.OFFERS);

  const [queryLoaded, setQueryLoaded] = useState(false);
  const [searchInProgress, setSearchInProgress] = useState(false);

  const [searchResult, setSearchResult] = useState<SearchTrade>();
  const [trades, setTrades] = useState<SearchOffer[] | SearchWish[]>([]);
  const [loadedTrades, setLoadedTrades] = useState<SearchOffer[] | SearchWish[]>([]);

  const [searchFilterValues, setSearchFilterValues] = useState<SearchFilterValues>(createDefaultSearchFilter());
  const [searchOrderValues, setSearchOrderValues] = useState<SearchOrderValues>(createDefaultSearchOrder());

  // load query into filter values
  useEffect(() => {
    if (!queryLoaded && router.isReady && items.length > 0) {
      const itemId = typeof router.query.itemId === 'string' ? parseInt(router.query.itemId, 10) : undefined;
      const wishlistOnly = typeof router.query.wishlistOnly === 'string' && router.query.wishlistOnly === 'true' ? true : false;

      let orderBy;
      if (typeof router.query.orderBy === 'string') {
        orderBy = tradeableOrderByValues.find(obv => obv.key === router.query.orderBy);
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
        itemRarity = tradeableItemRarityValues.find(irv => irv.key === router.query.itemRarity);
      }
      let inventory;
      if (typeof router.query.inventory === 'string') {
        inventory = inventoryValues.find(i => i.key === router.query.inventory);
      }

      setSearchFilterValues({
        item: itemId ? items.find(i => i.id === itemId) : undefined,
        itemCharacter: itemCharacter ? itemCharacter : itemCharacterValues[0],
        itemSlot: itemSlot ? itemSlot : itemSlotValues[0],
        itemEvent: itemEvent ? itemEvent : itemEventValues[0],
        itemRarity: itemRarity ? itemRarity : tradeableItemRarityValues[0],
        inventory: inventory ? inventory : inventoryValues[0],
        wishlistOnly
      });
      setSearchOrderValues({
        orderBy: orderBy ? orderBy : tradeableOrderByValues[0],
        orderDirection: orderDirection ? orderDirection : orderDirectionValues[0]
      });
      setQueryLoaded(true);
      if (
        itemId ||
        itemCharacter ||
        itemSlot ||
        itemEvent ||
        itemRarity ||
        inventory ||
        wishlistOnly
      ) {
        search({
          item: itemId ? items.find(i => i.id === itemId) : undefined,
          itemCharacter: itemCharacter ? itemCharacter : itemCharacterValues[0],
          itemSlot: itemSlot ? itemSlot : itemSlotValues[0],
          itemEvent: itemEvent ? itemEvent : itemEventValues[0],
          itemRarity: itemRarity ? itemRarity : tradeableItemRarityValues[0],
          inventory: inventory ? inventory : inventoryValues[0],
          wishlistOnly
        });
      }
    }
  }, [router.query, items]);

  useEffect(() => {
    if (!searchResult) {
      return;
    }
    if (searchView === SEARCH_VIEW.OFFERS) {
      setTrades([...searchResult.offers.sort(sortTrades)]);
    } else {
      setTrades([...searchResult.wishes.sort(sortTrades)]);
    }
  }, [searchResult, searchView, searchOrderValues]);

  useEffect(() => {
    setLoadedTrades(trades.slice(0, loadedTrades.length > 20 ? loadedTrades.length : 20));
  }, [trades]);

  useEffect(() => {
    if (!queryLoaded) {
      return;
    }

    const query: { [key: string]: string | boolean | undefined; } = {
      itemId: searchFilterValues.item ? searchFilterValues.item.id.toString() : undefined,
      orderBy: searchOrderValues.orderBy.key !== tradeableOrderByValues[0].key ? searchOrderValues.orderBy.key : undefined,
      orderDirection: searchOrderValues.orderDirection.key !== orderDirectionValues[0].key ? searchOrderValues.orderDirection.key : undefined,
      itemCharacter: searchFilterValues.itemCharacter.key !== itemCharacterValues[0].key ? searchFilterValues.itemCharacter.key : undefined,
      itemSlot: searchFilterValues.itemSlot.key !== itemSlotValues[0].key ? searchFilterValues.itemSlot.key : undefined,
      itemEvent: searchFilterValues.itemEvent.key !== itemEventValues[0].key ? searchFilterValues.itemEvent.key : undefined,
      itemRarity: searchFilterValues.itemRarity.key !== tradeableItemRarityValues[0].key ? searchFilterValues.itemRarity.key : undefined,
      inventory: searchFilterValues.inventory.key !== inventoryValues[0].key ? searchFilterValues.inventory.key : undefined,
      wishlistOnly: searchFilterValues.wishlistOnly !== false ? searchFilterValues.wishlistOnly : undefined
    };

    Object.keys(query).forEach(key => query[key] === undefined ? delete query[key] : {});
    router.replace(
      { query },
      undefined,
      { scroll: false }
    );
  }, [searchFilterValues, searchOrderValues]);

  useEffect(() => {
    setLoadedTrades(trades.slice(0, 20));
  }, [searchView]);

  const search = (localSearchFilterValues?: any) => {
    if (!localSearchFilterValues) {
      localSearchFilterValues = searchFilterValues;
    }
    setSearchInProgress(true);
    setSearchResult(undefined);
    searchService.search(
      localSearchFilterValues.item ?
        {
          itemId: localSearchFilterValues.item.id,
          character: 'any',
          slot: 'any',
          event: 'any',
          rarity: 'any',
          inventoryType: 'any',
          onlyWishlistItems: false
        } :
        {
          character: localSearchFilterValues.itemCharacter.key,
          slot: localSearchFilterValues.itemSlot.key,
          event: localSearchFilterValues.itemEvent.key,
          rarity: localSearchFilterValues.itemRarity.key,
          inventoryType: localSearchFilterValues.inventory.key,
          onlyWishlistItems: localSearchFilterValues.wishlistOnly,
        }
    ).subscribe(async (res) => {
      if (res.ok) {
        const notification = createNotification({
          content: 'Search complete',
          duration: 2500,
          type: 'success'
        });
        notificationService.addNotification(notification);
        const json = await res.json();
        setSearchResult(json);
        setSearchInProgress(false);
      }
    });
  };

  const loadMoreTrades = () => {
    setLoadedTrades(trades.slice(0, loadedTrades.length + 20));
  };

  const hasMoreTrades = () => {
    return trades.length > loadedTrades.length;
  };

  const sortTrades = (aTrade: any, bTrade: any) => {
    let a = items.find(i => i.id === aTrade.id);
    let b = items.find(i => i.id === bTrade.id);
    if (!a) {
      a = items[0];
    }
    if (!b) {
      b = items[0];
    }
    const key = searchOrderValues.orderBy.key as keyof Item;
    let one = a[key];
    let two = b[key];
    if (one === undefined || two === undefined) {
      return 0;
    }
    if (searchOrderValues.orderBy.key === 'tagRarity') {
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
    if (one === two) {
      returnValue = a.id - b.id;
    }
    if (searchOrderValues.orderDirection.key === 'desc') {
      returnValue *= -1;
    }
    return returnValue;
  };

  return {
    inventory,
    items,
    prices,
    searchResult,
    loadedTrades,
    loadMoreTrades,
    hasMoreTrades,
    searchFilterValues,
    setSearchFilterValues,
    searchOrderValues,
    setSearchOrderValues,
    search,
    searchInProgress,
    searchView,
    setSearchView
  };
};

export default SearchHandler;
