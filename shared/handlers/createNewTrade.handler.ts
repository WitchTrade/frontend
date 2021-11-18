import { useEffect, useState } from 'react';
import { Offer, Price, Wish } from '../stores/markets/market.model';
import { marketsService } from '../stores/markets/markets.service';
import { MARKET_TYPE } from './market.handler';

const CreateNewTradeHandler = (type: MARKET_TYPE, addNewTrade: (trade: Offer | Wish) => void) => {

  const [progress, setProgress] = useState(0);

  const [trade, setTrade] = useState<any>({
    selectedItem: null,
    quantity: 0,
    mainPrice: null,
    mainPriceAmount: 0,
    secondaryPrice: null,
    secondaryPriceAmount: 0
  });

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
    createTrade
  };
};

export default CreateNewTradeHandler;
