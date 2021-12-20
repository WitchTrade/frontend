import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { useObservable } from '@ngneat/react-rxjs';
import usePricesProvider from '../providers/prices.provider';
import { createMarket, createOffer, createWish, Market, Offer, Wish } from '../stores/markets/market.model';
import { marketsService } from '../stores/markets/markets.service';
import { userStore } from '../stores/user/user.store';
import { getRarityNumber, getRarityStrings, itemRarityValues, modeValues } from './sync.handler';
import { syncSettingsStore } from '../stores/syncSettings/syncSettings.store';

export enum MARKET_TYPE {
  OFFER,
  WISH
}

const MarketHandler = () => {
  const [user] = useObservable(userStore);
  const [syncSettings] = useObservable(syncSettingsStore);
  const { prices } = usePricesProvider();

  const [market, setMarket] = useState<Market>(createMarket({}));
  const [type, setType] = useState(MARKET_TYPE.OFFER);

  const [editingNote, setEditingNote] = useState(false);
  const [localNote, setLocalNote] = useState('');

  const [creatingNew, setCreatingNew] = useState(false);

  const [localSyncSettings, setLocalSyncSettings] = useState({
    syncInventory: false,
    syncMarket: false,
    ms_mode: modeValues[0],
    ms_rarity: itemRarityValues,
    ms_defaultPriceItem: 4,
    ms_defaultPriceRecipe: 1,
    ms_keepItem: 1,
    ms_keepRecipe: 0,
    ms_ignoreWishlistItems: true,
    ms_removeNoneOnStock: false
  });

  useEffect(() => {
    let marketSub: Subscription;
    if (user.loggedIn) {
      marketSub = marketsService.fetchOwnMarket().subscribe(async (res) => {
        if (res.ok) {
          const market = await res.json();
          if (type == MARKET_TYPE.OFFER) {
            setLocalNote(market.offerlistNote ? market.offerlistNote : '');
          } else {
            setLocalNote(market.marketlistNote ? market.marketlistNote : '');
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

  useEffect(() => {
    if (Object.keys(syncSettings).length === 0) {
      return;
    }
    let ms_mode = modeValues.find(mo => mo.key === syncSettings.ms_mode);
    if (!ms_mode) {
      ms_mode = modeValues[0];
    }
    const rarityStrings = getRarityStrings(syncSettings.ms_rarity);
    let ms_rarity = itemRarityValues.filter(ir => rarityStrings.includes(ir.key));
    if (!ms_rarity) {
      ms_rarity = itemRarityValues;
    }
    setLocalSyncSettings({
      syncInventory: syncSettings.syncInventory,
      syncMarket: syncSettings.syncMarket,
      ms_mode,
      ms_rarity,
      ms_defaultPriceItem: syncSettings.ms_defaultPriceItem,
      ms_defaultPriceRecipe: syncSettings.ms_defaultPriceRecipe,
      ms_keepItem: syncSettings.ms_keepItem,
      ms_keepRecipe: syncSettings.ms_keepRecipe,
      ms_ignoreWishlistItems: syncSettings.ms_ignoreWishlistItems,
      ms_removeNoneOnStock: syncSettings.ms_removeNoneOnStock
    });
  }, [syncSettings]);

  useEffect(() => {
    if (type === MARKET_TYPE.OFFER && market.offerlistNote) {
      setLocalNote(market.offerlistNote);
    } else if (type === MARKET_TYPE.WISH && market.wishlistNote) {
      setLocalNote(market.wishlistNote);
    } else {
      setLocalNote('');
    }
  }, [type]);

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

  const syncOffers = (finished: () => void) => {
    marketsService.syncOffers({ ...localSyncSettings, ms_mode: localSyncSettings.ms_mode.key, ms_rarity: getRarityNumber(localSyncSettings.ms_rarity.map(r => r.key)) }).subscribe(() => {
      marketsService.fetchOwnMarket().subscribe(async (res) => {
        if (res.ok) {
          const market = await res.json();
          if (type == MARKET_TYPE.OFFER && market.offerlistNote) {
            setLocalNote(market.offerlistNote);
          } else if (market.wishlistNote) {
            setLocalNote(market.wishlistNote);
          }
          setMarket(market);
          finished();
        }
      });
    });
  };

  const deleteTrade = (trade: Offer | Wish) => {
    if (type === MARKET_TYPE.OFFER) {
      marketsService.deleteOffer(trade.id).subscribe((res) => {
        if (res.ok) {
          const newOffers = market.offers.filter(o => o.id !== trade.id);
          setMarket({ ...market, offers: newOffers });
        }
      });
    } else {
      marketsService.deleteWish(trade.id).subscribe((res) => {
        if (res.ok) {
          const newWishes = market.wishes.filter(w => w.id !== trade.id);
          setMarket({ ...market, wishes: newWishes });
        }
      });
    }
  };

  const updateTrade = (trade: any, finished: () => void) => {
    const tradeDTO: any = {};
    tradeDTO.mainPriceId = trade.mainPrice.id;
    if (trade.mainPrice.withAmount) {
      tradeDTO.mainPriceAmount = trade.mainPriceAmount ? trade.mainPriceAmount : 0;
    }
    if (trade.secondaryPrice) {
      tradeDTO.secondaryPriceId = trade.secondaryPrice.id;
      if (trade.secondaryPrice.withAmount) {
        tradeDTO.secondaryPriceAmount = trade.secondaryPriceAmount ? trade.secondaryPriceAmount : 0;
      }
    }

    if (type === MARKET_TYPE.OFFER) {
      tradeDTO.quantity = trade.quantity;
      marketsService.updateOffer(trade.id, tradeDTO).subscribe(async (res) => {
        if (res.ok) {
          const updatedOffer = createOffer(await res.json());
          const newOffers = [...market.offers];
          const updatedIndex = newOffers.findIndex(o => o.id === trade.id);
          newOffers[updatedIndex] = updatedOffer;
          setMarket({ ...market, offers: [...newOffers] });
          finished();
        }
      });
    } else {
      marketsService.updateWish(trade.id, tradeDTO).subscribe(async (res) => {
        if (res.ok) {
          const updatedWish = createWish(await res.json());
          const newWishes = [...market.wishes];
          const updatedIndex = newWishes.findIndex(o => o.id === trade.id);
          newWishes[updatedIndex] = updatedWish;
          setMarket({ ...market, wishes: newWishes });
          finished();
        }
      });
    }
  };

  return {
    market,
    prices,
    editingNote,
    setEditingNote,
    localNote,
    setLocalNote,
    type,
    setType,
    updateNote,
    creatingNew,
    setCreatingNew,
    addNewTrade,
    deleteAllTrades,
    localSyncSettings,
    setLocalSyncSettings,
    syncOffers,
    deleteTrade,
    updateTrade
  };
};

export default MarketHandler;
