import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import useSyncSettingsProvider from '../providers/syncSettings.provider';
import useUserProvider from '../providers/user.provider';
import { createMarket, Market, Offer, Wish } from '../stores/markets/market.model';
import { marketsService } from '../stores/markets/markets.service';
import { getRarityNumber, getRarityStrings, itemRarityValues, modeValues } from './sync.handler';

export enum MARKET_TYPE {
  OFFER,
  WISH
}

const MarketHandler = (type: MARKET_TYPE) => {
  const { user } = useUserProvider();
  const { syncSettings } = useSyncSettingsProvider();
  const [market, setMarket] = useState<Market>(createMarket({}));

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
    deleteAllTrades,
    localSyncSettings,
    setLocalSyncSettings,
    syncOffers,
    deleteTrade
  };
};

export default MarketHandler;
