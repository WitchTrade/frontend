import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { selectAllEntities } from '@ngneat/elf-entities';
import { useObservable } from '@ngneat/react-rxjs';
import { createMarket, createOffer, createWish, Market, Offer, Wish } from '../stores/markets/market.model';
import { marketsService } from '../stores/markets/markets.service';
import { userStore } from '../stores/user/user.store';
import { getRarityNumber, getRarityStrings, itemRarityValues, modeValues } from './sync.handler';
import { syncSettingsStore } from '../stores/syncSettings/syncSettings.store';
import { pricesStore } from '../stores/prices/prices.store';
import { wantsBothValues } from '../../components/market/CreateNewTrade';
import { createNotification } from '../stores/notification/notification.model';
import { notificationService } from '../stores/notification/notification.service';

export enum MARKET_TYPE {
  OFFER,
  WISH,
  SYNC
}

const MarketHandler = () => {
  const [user] = useObservable(userStore);
  const [syncSettings] = useObservable(syncSettingsStore);
  const [prices] = useObservable(pricesStore.pipe(selectAllEntities()));

  const [market, setMarket] = useState<Market>(createMarket({}));
  const [type, setType] = useState(MARKET_TYPE.OFFER);
  const [newOfferView, setNewOfferView] = useState(false);
  const [allOffers, setAllOffers] = useState<Offer[]>([]);

  const [editingNote, setEditingNote] = useState(false);
  const [localNote, setLocalNote] = useState('');

  const [creatingNew, setCreatingNew] = useState(false);

  const [localSyncSettings, setLocalSyncSettings] = useState<any>({
    syncInventory: false,
    syncMarket: false,
    mode: modeValues[0],
    rarity: itemRarityValues,
    mainPriceItem: prices.find(p => p.priceKey === 'dynamicRarity'),
    mainPriceAmountItem: 4,
    wantsBothItem: wantsBothValues.find(wbv => wbv.key === false),
    secondaryPriceItem: undefined,
    secondaryPriceAmountItem: 1,
    mainPriceRecipe: prices.find(p => p.priceKey === 'dynamicRarity'),
    mainPriceAmountRecipe: 2,
    wantsBothRecipe: wantsBothValues.find(wbv => wbv.key === false),
    secondaryPriceRecipe: undefined,
    secondaryPriceAmountRecipe: 1,
    keepItem: 1,
    keepRecipe: 0,
    ignoreWishlistItems: true,
    removeNoneOnStock: false,
    ignoreList: []
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
    let mode = modeValues.find(mo => mo.key === syncSettings.mode);
    if (!mode) {
      mode = modeValues[0];
    }
    const rarityStrings = getRarityStrings(syncSettings.rarity);
    let rarity = itemRarityValues.filter(ir => rarityStrings.includes(ir.key));
    if (!rarity) {
      rarity = itemRarityValues;
    }
    setLocalSyncSettings({
      syncInventory: syncSettings.syncInventory,
      syncMarket: syncSettings.syncMarket,
      mode,
      rarity,
      mainPriceItem: syncSettings.mainPriceItem,
      mainPriceAmountItem: syncSettings.mainPriceAmountItem,
      wantsBothItem: wantsBothValues.find(wbv => wbv.key === syncSettings.wantsBothItem),
      secondaryPriceItem: syncSettings.secondaryPriceItem,
      secondaryPriceAmountItem: syncSettings.secondaryPriceAmountItem,
      mainPriceRecipe: syncSettings.mainPriceRecipe,
      mainPriceAmountRecipe: syncSettings.mainPriceAmountRecipe,
      wantsBothRecipe: wantsBothValues.find(wbv => wbv.key === syncSettings.wantsBothRecipe),
      secondaryPriceRecipe: syncSettings.secondaryPriceRecipe,
      secondaryPriceAmountRecipe: syncSettings.secondaryPriceAmountRecipe,
      keepItem: syncSettings.keepItem,
      keepRecipe: syncSettings.keepRecipe,
      ignoreWishlistItems: syncSettings.ignoreWishlistItems,
      removeNoneOnStock: syncSettings.removeNoneOnStock,
      ignoreList: syncSettings.ignoreList,
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
    marketsService.syncOffers({
      ...localSyncSettings,
      mode: localSyncSettings.mode.key,
      rarity: getRarityNumber(localSyncSettings.rarity.map(r => r.key)),
      wantsBothItem: localSyncSettings.wantsBothItem.key,
      wantsBothRecipe: localSyncSettings.wantsBothRecipe.key,
    }).subscribe(async res => {
      const json = await res.json();
      const notification = createNotification({
        content: `${json.newOffersCount} offer${json.newOffersCount === 1 ? '' : 's'} created, ${json.updatedOffersCount} updated and ${json.deletedOffersCount} deleted`,
        duration: 5000,
        type: 'success'
      });
      notificationService.addNotification(notification);

      marketsService.fetchOwnMarket().subscribe(async (res) => {
        if (res.ok) {
          const market = await res.json();
          if (type == MARKET_TYPE.OFFER && market.offerlistNote) {
            setLocalNote(market.offerlistNote);
          } else if (market.wishlistNote) {
            setLocalNote(market.wishlistNote);
          }
          if (json.newOffersCount > 0) {
            setAllOffers(market.offers);
            market.offers = market.offers.filter(o => json.newOffers.includes(o.id));
            setMarket(market);
            setNewOfferView(true);
          } else {
            setMarket(market);
          }

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
          if (newOfferView) {
            const newAllOffers = allOffers.filter(o => o.id !== trade.id);
            setAllOffers(newAllOffers);
          }
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
      tradeDTO.mainPriceAmount = trade.mainPriceAmount;
    }
    if (trade.secondaryPrice) {
      tradeDTO.secondaryPriceId = trade.secondaryPrice.id;
      tradeDTO.wantsBoth = trade.wantsBoth;
      if (trade.secondaryPrice.withAmount) {
        tradeDTO.secondaryPriceAmount = trade.secondaryPriceAmount;
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
          if (newOfferView) {
            const newAllOffers = [...allOffers];
            const updatedIndex = newAllOffers.findIndex(o => o.id === trade.id);
            newAllOffers[updatedIndex] = updatedOffer;
            setAllOffers(newAllOffers);
          }
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

  const closeNewOfferView = () => {
    setMarket({ ...market, offers: allOffers });
    setNewOfferView(false);
  };

  return {
    market,
    prices,
    newOfferView,
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
    updateTrade,
    closeNewOfferView
  };
};

export default MarketHandler;
