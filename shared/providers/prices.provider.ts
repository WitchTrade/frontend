import { useEffect, useState } from 'react';
import { Price } from '../stores/markets/market.model';
import { marketsService } from '../stores/markets/markets.service';

const usePricesProvider = () => {
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    const pricesSub = marketsService.fetchPrices().subscribe(async (res) => {
      if (res.ok) {
        const prices = await res.json();
        setPrices(prices);
      }
    });

    return (() => {
      pricesSub.unsubscribe();
    });
  }, []);

  return { prices };
};

export default usePricesProvider;
