import { useEffect, useState } from 'react';
import { Item } from '../stores/items/item.model';
import { itemsQuery } from '../stores/items/items.query';

const useItemsProvider = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const itemsSub = itemsQuery.selectAll().subscribe(setItems);

    return (() => {
      itemsSub.unsubscribe();
    });
  }, []);

  return { items };
};

export default useItemsProvider;
