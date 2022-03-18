import { selectAllEntities } from '@ngneat/elf-entities';
import { useObservable } from '@ngneat/react-rxjs';
import { createRef, KeyboardEvent, useEffect, useState } from 'react';
import { Item } from '../stores/items/item.model';
import { itemsStore } from '../stores/items/items.store';

const ItemAutocompleteHandler = (setItem: (item: Item | undefined) => void) => {

  const [items] = useObservable(itemsStore.pipe(selectAllEntities()));

  const [searchValue, setSearchValue] = useState('');

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loadedItems, setLoadedItems] = useState<Item[]>([]);

  const [foundItemRefs, setFoundItemRefs] = useState<any[]>([]);
  const [keyNavigation, setKeyNavigation] = useState<{
    cursor: number,
    item?: Item,
    positionInView: number,
    direction?: string;
  }>({ cursor: -1, positionInView: 0 });

  useEffect(() => {
    setFilteredItems(items.filter(i => i.tradeable).sort((a, b) => a.name.localeCompare(b.name)));
  }, [items]);

  useEffect(() => {
    setFilteredItems(items.filter(i => i.name.toLowerCase().includes(searchValue.toLowerCase()) && i.tradeable).sort((a, b) => a.name.localeCompare(b.name)));
    setKeyNavigation({ cursor: -1, positionInView: 0 });
  }, [searchValue]);

  useEffect(() => {
    setLoadedItems(filteredItems.slice(0, 30));
    setFoundItemRefs(Array(filteredItems.length).fill(null).map((_, i) => foundItemRefs[i] || createRef()));
  }, [filteredItems]);

  useEffect(() => {
    if (keyNavigation.cursor >= 0 && foundItemRefs[keyNavigation.cursor].current) {
      if (keyNavigation.positionInView === 1 && keyNavigation.direction === 'up') {
        foundItemRefs[keyNavigation.cursor].current.scrollIntoView({ block: 'start' });
      } else if (keyNavigation.positionInView === 6 && keyNavigation.direction === 'down') {
        foundItemRefs[keyNavigation.cursor].current.scrollIntoView({ block: 'end' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyNavigation]);

  const loadMoreItems = () => {
    setLoadedItems(filteredItems.slice(0, loadedItems.length + 30));
  };

  const hasMoreItems = () => {
    return filteredItems.length > loadedItems.length;
  };

  const resetLoadedItems = () => {
    setLoadedItems(filteredItems.slice(0, 30));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && keyNavigation.cursor > 0) {
      const newCursor = keyNavigation.cursor - 1;
      const newPositionInView = keyNavigation.positionInView > 1 ? keyNavigation.positionInView - 1 : keyNavigation.positionInView;
      setKeyNavigation({ cursor: newCursor, item: filteredItems[newCursor], positionInView: newPositionInView, direction: 'up' });
    } else if (e.keyCode === 40 && keyNavigation.cursor < filteredItems.length - 1) {
      const newCursor = keyNavigation.cursor + 1;
      const newPositionInView = keyNavigation.positionInView < 6 ? keyNavigation.positionInView + 1 : keyNavigation.positionInView;
      setKeyNavigation({ cursor: newCursor, item: filteredItems[newCursor], positionInView: newPositionInView, direction: 'down' });
    } else if (e.keyCode === 13 && keyNavigation.item) {
      setItem(keyNavigation.item);
    }
  };

  return {
    loadedItems,
    searchValue,
    setSearchValue,
    loadMoreItems,
    hasMoreItems,
    resetLoadedItems,
    foundItemRefs,
    keyNavigation,
    handleKeyDown
  };
};

export default ItemAutocompleteHandler;
