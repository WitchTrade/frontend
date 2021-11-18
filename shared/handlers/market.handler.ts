import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import useUserProvider from '../providers/user.provider';
import { createMarket, Market, Offer, Wish } from '../stores/markets/market.model';
import { marketsService } from '../stores/markets/markets.service';

export enum MARKET_TYPE {
  OFFER,
  WISH
}

const MarketHandler = (type: MARKET_TYPE) => {
  const { user } = useUserProvider();
  const [market, setMarket] = useState<Market>(createMarket({}));

  const [editingNote, setEditingNote] = useState(false);
  const [localNote, setLocalNote] = useState('');

  const [creatingNew, setCreatingNew] = useState(false);

  useEffect(() => {
    let marketSub: Subscription;
    if (user.loggedIn) {
      marketSub = marketsService.fetchOwnMarket().subscribe(async (res) => {
        if (res.ok) {
          const market = await res.json();
          if (type == MARKET_TYPE.OFFER && market.offerlistNote) {
            setLocalNote(market.offerlistNote);
          } else if (market.wishlistNote) {
            setLocalNote(market.wishlistNote);
          }
          setMarket(market);
        }
      });
    }
    return () => {
      if (marketSub) {
        marketSub.unsubscribe();
      }
    };
  }, [user]);

  const updateNote = () => {
    if (type == MARKET_TYPE.OFFER) {
      marketsService.editMarket({ offerlistNote: localNote, wishlistNote: market.wishlistNote }).subscribe(async (res) => {
        if (res.ok) {
          const newMarket = await res.json();
          setMarket(newMarket);
          setEditingNote(false);
        }
      });
    } else {
      marketsService.editMarket({ offerlistNote: market.offerlistNote, wishlistNote: localNote }).subscribe(async (res) => {
        if (res.ok) {
          const newMarket = await res.json();
          setMarket(newMarket);
          setEditingNote(false);
        }
      });
    }
  };

  const addNewTrade = (trade: Offer | Wish) => {
    if (type === MARKET_TYPE.OFFER) {
      const newOffers = [...market.offers, trade] as Offer[];
      setMarket({ ...market, offers: newOffers });
    } else {
      const newWishes = [...market.wishes, trade];
      setMarket({ ...market, wishes: newWishes });
    }
  };

  const deleteAllTrades = () => {
    if (type === MARKET_TYPE.OFFER) {
      marketsService.deleteAllOffers().subscribe(() => {
        setMarket({ ...market, offers: [] });
      });
    } else {
      marketsService.deleteAllWishes().subscribe(() => {
        setMarket({ ...market, wishes: [] });
      });
    }
  };

  return {
    market,
    editingNote,
    setEditingNote,
    localNote,
    setLocalNote,
    updateNote,
    creatingNew,
    setCreatingNew,
    addNewTrade,
    deleteAllTrades
  };
};

export default MarketHandler;
