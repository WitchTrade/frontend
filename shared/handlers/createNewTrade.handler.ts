import { useEffect, useState } from 'react';
import useInventoryProvider from '../providers/inventory.provider';
import { Offer, Wish } from '../stores/markets/market.model';
import { marketsService } from '../stores/markets/markets.service';
import { MARKET_TYPE } from './market.handler';

const CreateNewTradeHandler = (type: MARKET_TYPE, addNewTrade: (trade: Offer | Wish) => void) => {
  const { inventory } = useInventoryProvider();

  const [progress, setProgress] = useState(0);

  const [trade, setTrade] = useState<any>({
    selectedItem: null,
    quantity: 1,
    mainPrice: null,
    mainPriceAmount: 4,
    secondaryPrice: null,
    secondaryPriceAmount: 4
  });

  const [selectedItemOwned, setSelectedItemOwned] = useState(false);
  const [selectedItemAmount, setSelectedItemAmount] = useState(0);

  useEffect(() => {
    setProgress(0);
    setTrade({
      selectedItem: null,
      quantity: 1,
      mainPrice: null,
      mainPriceAmount: 4,
      secondaryPrice: null,
      secondaryPriceAmount: 4
    });
  }, [type]);

  useEffect(() => {
    if (trade.selectedItem) {
      setSelectedItemOwned(inventory.inventoryItems.some(ii => ii.item.id === trade.selectedItem.id));
      const inventoryItem = inventory.inventoryItems.find(ii => ii.item.id === trade.selectedItem.id);
      let amount = 0;
      if (inventoryItem) {
        amount = inventoryItem.amount;
      }
      setSelectedItemAmount(amount);
    }
  }, [trade.selectedItem]);

  const createTrade = (finished: () => void) => {
    const tradeDTO: any = {};
    tradeDTO.itemId = trade.selectedItem.id;
    tradeDTO.mainPriceId = trade.mainPrice.id;
    tradeDTO.mainPriceAmount = trade.mainPriceAmount;
    if (trade.secondaryPrice) {
      tradeDTO.secondaryPriceId = trade.secondaryPrice.id;
      tradeDTO.secondaryPriceAmount = trade.secondaryPriceAmount;
    }

    if (type == MARKET_TYPE.OFFER) {
      tradeDTO.quantity = trade.quantity;
      marketsService.createOffer(tradeDTO).subscribe(async (res) => {
        if (res.ok) {
          const json = await res.json();
          addNewTrade(json);
          finished();
        }
      });
    } else {
      marketsService.createWish(tradeDTO).subscribe(async (res) => {
        if (res.ok) {
          const json = await res.json();
          addNewTrade(json);
          finished();
        }
      });
    }
  };

  return {
    progress,
    setProgress,
    trade,
    setTrade,
    createTrade,
    selectedItemOwned,
    selectedItemAmount
  };
};

export default CreateNewTradeHandler;
