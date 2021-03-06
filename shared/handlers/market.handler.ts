import { selectAllEntities } from '@ngneat/elf-entities'
import { useObservable } from '@ngneat/react-rxjs'
import { useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import { wantsBothValues } from '../../components/market/CreateNewTrade'
import { getItemRarities, itemsStore } from '../stores/items/items.store'
import {
  createMarket,
  createOffer,
  createWish,
  Market,
  Offer,
  Wish,
} from '../stores/markets/market.model'
import { marketsService } from '../stores/markets/markets.service'
import { createNotification } from '../stores/notification/notification.model'
import { notificationService } from '../stores/notification/notification.service'
import { pricesStore } from '../stores/prices/prices.store'
import { syncSettingsStore } from '../stores/syncSettings/syncSettings.store'
import { userStore } from '../stores/user/user.store'
import {
  getRarityNumber,
  getRarityStrings,
  itemRarityValues,
  modeValues,
} from './sync.handler'

export enum MARKET_TYPE {
  OFFER,
  WISH,
  SYNC,
}

const MarketHandler = () => {
  const [user] = useObservable(userStore)
  const [syncSettings] = useObservable(syncSettingsStore)
  const [prices] = useObservable(pricesStore.pipe(selectAllEntities()))
  const [items] = useObservable(itemsStore.pipe(selectAllEntities()))

  const [market, setMarket] = useState<Market>(createMarket({}))
  const [type, setType] = useState(MARKET_TYPE.OFFER)
  const [changedOfferView, setChangedOfferView] = useState(false)
  const [changedOffers, setChangedOffers] = useState<{
    new: any
    updated: any
    deleted: any
  }>({
    new: [],
    updated: [],
    deleted: [],
  })
  const [selectedChangedOffers, setSelectedChangedOffers] = useState<0 | 1 | 2>(
    0
  )

  const [editingNote, setEditingNote] = useState(false)
  const [localNote, setLocalNote] = useState('')

  const [creatingNew, setCreatingNew] = useState(false)

  const [localSyncSettings, setLocalSyncSettings] = useState<any>({
    syncInventory: false,
    syncMarket: false,
    mode: modeValues[0],
    rarity: itemRarityValues,
    mainPriceItem: prices.find((p) => p.priceKey === 'dynamicRarity'),
    mainPriceAmountItem: 4,
    wantsBothItem: wantsBothValues.find((wbv) => wbv.key === false),
    secondaryPriceItem: undefined,
    secondaryPriceAmountItem: 1,
    mainPriceRecipe: prices.find((p) => p.priceKey === 'dynamicRarity'),
    mainPriceAmountRecipe: 2,
    wantsBothRecipe: wantsBothValues.find((wbv) => wbv.key === false),
    secondaryPriceRecipe: undefined,
    secondaryPriceAmountRecipe: 1,
    keepItem: 1,
    keepRecipe: 0,
    ignoreWishlistItems: true,
    removeNoneOnStock: false,
    ignoreList: [],
  })

  useEffect(() => {
    let marketSub: Subscription
    if (user.loggedIn) {
      marketSub = marketsService.fetchOwnMarket().subscribe(async (res) => {
        if (res.ok) {
          const market = await res.json()
          if (type == MARKET_TYPE.OFFER) {
            setLocalNote(market.offerlistNote ? market.offerlistNote : '')
          } else {
            setLocalNote(market.marketlistNote ? market.marketlistNote : '')
          }
          setMarket(market)
        }
      })
    }
    return () => {
      if (marketSub) {
        marketSub.unsubscribe()
      }
    }
  }, [user])

  useEffect(() => {
    if (Object.keys(syncSettings).length === 0) {
      return
    }
    let mode = modeValues.find((mo) => mo.key === syncSettings.mode)
    if (!mode) {
      mode = modeValues[0]
    }
    const rarityStrings = getRarityStrings(syncSettings.rarity)
    let rarity = itemRarityValues.filter((ir) => rarityStrings.includes(ir.key))
    if (!rarity) {
      rarity = itemRarityValues
    }
    setLocalSyncSettings({
      syncInventory: syncSettings.syncInventory,
      syncMarket: syncSettings.syncMarket,
      mode,
      rarity,
      mainPriceItem: syncSettings.mainPriceItem,
      mainPriceAmountItem: syncSettings.mainPriceAmountItem,
      wantsBothItem: wantsBothValues.find(
        (wbv) => wbv.key === syncSettings.wantsBothItem
      ),
      secondaryPriceItem: syncSettings.secondaryPriceItem,
      secondaryPriceAmountItem: syncSettings.secondaryPriceAmountItem,
      mainPriceRecipe: syncSettings.mainPriceRecipe,
      mainPriceAmountRecipe: syncSettings.mainPriceAmountRecipe,
      wantsBothRecipe: wantsBothValues.find(
        (wbv) => wbv.key === syncSettings.wantsBothRecipe
      ),
      secondaryPriceRecipe: syncSettings.secondaryPriceRecipe,
      secondaryPriceAmountRecipe: syncSettings.secondaryPriceAmountRecipe,
      keepItem: syncSettings.keepItem,
      keepRecipe: syncSettings.keepRecipe,
      ignoreWishlistItems: syncSettings.ignoreWishlistItems,
      removeNoneOnStock: syncSettings.removeNoneOnStock,
      ignoreList: syncSettings.ignoreList,
    })
  }, [syncSettings])

  useEffect(() => {
    if (type === MARKET_TYPE.OFFER && market.offerlistNote) {
      setLocalNote(market.offerlistNote)
    } else if (type === MARKET_TYPE.WISH && market.wishlistNote) {
      setLocalNote(market.wishlistNote)
    } else {
      setLocalNote('')
    }
  }, [type])

  const updateNote = () => {
    if (type == MARKET_TYPE.OFFER) {
      marketsService
        .editMarket({
          offerlistNote: localNote,
          wishlistNote: market.wishlistNote,
        })
        .subscribe(async (res) => {
          if (res.ok) {
            const newMarket = await res.json()
            setMarket(newMarket)
            setEditingNote(false)
          }
        })
    } else {
      marketsService
        .editMarket({
          offerlistNote: market.offerlistNote,
          wishlistNote: localNote,
        })
        .subscribe(async (res) => {
          if (res.ok) {
            const newMarket = await res.json()
            setMarket(newMarket)
            setEditingNote(false)
          }
        })
    }
  }

  const addNewTrade = (trade: Offer | Wish) => {
    if (type === MARKET_TYPE.OFFER) {
      const newOffers = [...market.offers, trade] as Offer[]
      setMarket({ ...market, offers: newOffers })
    } else {
      const newWishes = [...market.wishes, trade]
      setMarket({ ...market, wishes: newWishes })
    }
  }

  const deleteAllTrades = () => {
    if (type === MARKET_TYPE.OFFER) {
      marketsService.deleteAllOffers().subscribe(() => {
        setMarket({ ...market, offers: [] })
      })
    } else {
      marketsService.deleteAllWishes().subscribe(() => {
        setMarket({ ...market, wishes: [] })
      })
    }
  }

  const syncOffers = (finished: () => void) => {
    marketsService
      .syncOffers({
        ...localSyncSettings,
        mode: localSyncSettings.mode.key,
        rarity: getRarityNumber(localSyncSettings.rarity.map((r) => r.key)),
        wantsBothItem: localSyncSettings.wantsBothItem.key,
        wantsBothRecipe: localSyncSettings.wantsBothRecipe.key,
      })
      .subscribe(async (res) => {
        const json = await res.json()
        const notification = createNotification({
          content: `${json.newOffersCount} offer${
            json.newOffersCount === 1 ? '' : 's'
          } created, ${json.updatedOffersCount} updated and ${
            json.deletedOffersCount
          } deleted`,
          duration: 5000,
          type: 'success',
        })
        notificationService.addNotification(notification)

        marketsService.fetchOwnMarket().subscribe(async (res) => {
          if (res.ok) {
            const market = await res.json()
            if (type == MARKET_TYPE.OFFER && market.offerlistNote) {
              setLocalNote(market.offerlistNote)
            } else if (market.wishlistNote) {
              setLocalNote(market.wishlistNote)
            }
            if (
              json.newOffersCount > 0 ||
              json.updatedOffersCount > 0 ||
              json.deletedOffersCount > 0
            ) {
              setChangedOffers({
                new: market.offers
                  .filter((offer) => json.newOffers.includes(offer.id))
                  .sort((aTrade, bTrade) => {
                    let a = items.find((i) => i.id === aTrade.item.id)
                    let b = items.find((i) => i.id === bTrade.item.id)
                    if (!a) {
                      a = items[0]
                    }
                    if (!b) {
                      b = items[0]
                    }
                    const one = getItemRarities().indexOf(a.tagRarity as string)
                    const two = getItemRarities().indexOf(b.tagRarity as string)
                    let returnValue = 0
                    if (one > two) {
                      returnValue = -1
                    }
                    if (two > one) {
                      returnValue = 1
                    }
                    if (one === two) {
                      returnValue = a.id - b.id
                    }
                    return returnValue
                  }),
                updated: market.offers
                  .filter((offer) =>
                    json.updatedOffers.some(
                      (updateOffer) => updateOffer.id === offer.id
                    )
                  )
                  .map((offer) => {
                    offer.oldQuantity = json.updatedOffers.find(
                      (updateOffer) => updateOffer.id === offer.id
                    ).oldQuantity
                    return offer
                  })
                  .sort((aTrade, bTrade) => {
                    let a = items.find((i) => i.id === aTrade.item.id)
                    let b = items.find((i) => i.id === bTrade.item.id)
                    if (!a) {
                      a = items[0]
                    }
                    if (!b) {
                      b = items[0]
                    }
                    const one = getItemRarities().indexOf(a.tagRarity as string)
                    const two = getItemRarities().indexOf(b.tagRarity as string)
                    let returnValue = 0
                    if (one > two) {
                      returnValue = 1
                    }
                    if (two > one) {
                      returnValue = -1
                    }
                    if (one === two) {
                      returnValue = a.id - b.id
                    }
                    return returnValue
                  }),
                deleted: json.deletedOffers.sort((aTrade, bTrade) => {
                  let a = items.find((i) => i.id === aTrade.item.id)
                  let b = items.find((i) => i.id === bTrade.item.id)
                  if (!a) {
                    a = items[0]
                  }
                  if (!b) {
                    b = items[0]
                  }
                  const one = getItemRarities().indexOf(a.tagRarity as string)
                  const two = getItemRarities().indexOf(b.tagRarity as string)
                  let returnValue = 0
                  if (one > two) {
                    returnValue = 1
                  }
                  if (two > one) {
                    returnValue = -1
                  }
                  if (one === two) {
                    returnValue = a.id - b.id
                  }
                  return returnValue
                }),
              })
              setMarket(market)
              setCreatingNew(false)
              setSelectedChangedOffers(
                market.offers.filter((offer) =>
                  json.newOffers.includes(offer.id)
                ).length !== 0
                  ? 0
                  : market.offers.filter((offer) =>
                      json.updatedOffers.some(
                        (updateOffer) => updateOffer.id === offer.id
                      )
                    ).length !== 0
                  ? 1
                  : 2
              )
              setChangedOfferView(true)
            } else {
              setMarket(market)
            }

            finished()
          }
        })
      })
  }

  const deleteTrade = (trade: Offer | Wish) => {
    if (type === MARKET_TYPE.OFFER) {
      marketsService.deleteOffer(trade.id).subscribe((res) => {
        if (res.ok) {
          const newOffers = market.offers.filter((o) => o.id !== trade.id)
          setMarket({ ...market, offers: newOffers })
          if (changedOfferView) {
            setChangedOffers({
              new: changedOffers.new.filter((o) => o.id !== trade.id),
              updated: changedOffers.updated.filter((o) => o.id !== trade.id),
              deleted: changedOffers.deleted,
            })
          }
        }
      })
    } else {
      marketsService.deleteWish(trade.id).subscribe((res) => {
        if (res.ok) {
          const newWishes = market.wishes.filter((w) => w.id !== trade.id)
          setMarket({ ...market, wishes: newWishes })
        }
      })
    }
  }

  const updateTrade = (trade: any, finished: () => void) => {
    const tradeDTO: any = {}
    tradeDTO.mainPriceId = trade.mainPrice.id
    if (trade.mainPrice.withAmount) {
      tradeDTO.mainPriceAmount = trade.mainPriceAmount
    }
    if (trade.secondaryPrice) {
      tradeDTO.secondaryPriceId = trade.secondaryPrice.id
      tradeDTO.wantsBoth = trade.wantsBoth
      if (trade.secondaryPrice.withAmount) {
        tradeDTO.secondaryPriceAmount = trade.secondaryPriceAmount
      }
    }

    if (type === MARKET_TYPE.OFFER) {
      tradeDTO.quantity = trade.quantity
      marketsService.updateOffer(trade.id, tradeDTO).subscribe(async (res) => {
        if (res.ok) {
          const updatedOffer = createOffer(await res.json())
          const newOffers = [...market.offers]
          const updatedIndex = newOffers.findIndex((o) => o.id === trade.id)
          newOffers[updatedIndex] = updatedOffer
          setMarket({ ...market, offers: [...newOffers] })
          if (changedOfferView) {
            const newOffers = [...changedOffers.new]
            const newIndex = newOffers.findIndex((o) => o.id === trade.id)
            if (newIndex >= 0) {
              newOffers[newIndex] = updatedOffer
            }

            const updatedOffers = [...changedOffers.updated]
            const upIndex = updatedOffers.findIndex((o) => o.id === trade.id)
            if (upIndex >= 0) {
              updatedOffer.oldQuantity = updatedOffers[upIndex].oldQuantity
              updatedOffers[upIndex] = updatedOffer
            }

            setChangedOffers({
              new: newOffers,
              updated: updatedOffers,
              deleted: changedOffers.deleted,
            })
          }
          finished()
        }
      })
    } else {
      marketsService.updateWish(trade.id, tradeDTO).subscribe(async (res) => {
        if (res.ok) {
          const updatedWish = createWish(await res.json())
          const newWishes = [...market.wishes]
          const updatedIndex = newWishes.findIndex((o) => o.id === trade.id)
          newWishes[updatedIndex] = updatedWish
          setMarket({ ...market, wishes: newWishes })
          finished()
        }
      })
    }
  }

  const closeChangedOfferView = () => {
    setChangedOffers({
      new: [],
      updated: [],
      deleted: [],
    })
    setChangedOfferView(false)
  }

  return {
    market,
    prices,
    changedOfferView,
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
    closeChangedOfferView,
    changedOffers,
    selectedChangedOffers,
    setSelectedChangedOffers,
  }
}

export default MarketHandler
