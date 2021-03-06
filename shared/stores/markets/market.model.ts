import { Price } from '../prices/price.model'

export interface Market {
  id: number
  lastUpdated: Date
  offerlistNote: string
  wishlistNote: string
  offers: Offer[]
  wishes: Wish[]
}

export interface Offer {
  id: number
  item: { id: number }
  mainPrice: Price
  mainPriceAmount?: number
  wantsBoth?: boolean
  secondaryPrice?: Price
  secondaryPriceAmount?: number
  quantity: number
  oldQuantity?: number
}

export function createOffer(params: Partial<Offer>) {
  return {
    id: params.id ? params.id : null,
    item: params.item ? params.item : {},
    mainPrice: params.mainPrice ? params.mainPrice : null,
    mainPriceAmount: params.mainPriceAmount ? params.mainPriceAmount : 1,
    wantsBoth:
      params.wantsBoth || params.wantsBoth === false ? params.wantsBoth : null,
    secondaryPrice: params.secondaryPrice ? params.secondaryPrice : null,
    secondaryPriceAmount: params.secondaryPriceAmount
      ? params.secondaryPriceAmount
      : 1,
    quantity: params.quantity ? params.quantity : 0,
  } as Offer
}

export interface Wish {
  id: number
  item: { id: number }
  mainPrice: Price
  mainPriceAmount?: number
  wantsBoth?: boolean
  secondaryPrice?: Price
  secondaryPriceAmount?: number
}

export function createWish(params: Partial<Wish>) {
  return {
    id: params.id ? params.id : null,
    item: params.item ? params.item : {},
    mainPrice: params.mainPrice ? params.mainPrice : null,
    mainPriceAmount: params.mainPriceAmount ? params.mainPriceAmount : 1,
    wantsBoth:
      params.wantsBoth || params.wantsBoth === false ? params.wantsBoth : null,
    secondaryPrice: params.secondaryPrice ? params.secondaryPrice : null,
    secondaryPriceAmount: params.secondaryPriceAmount
      ? params.secondaryPriceAmount
      : 1,
  } as Wish
}

export function createTrade(params: Partial<any>) {
  return {
    id: params.id ? params.id : null,
    item: params.item ? params.item : {},
    mainPrice: params.mainPrice ? params.mainPrice : null,
    mainPriceAmount: params.mainPriceAmount ? params.mainPriceAmount : 1,
    wantsBoth:
      params.wantsBoth || params.wantsBoth === false ? params.wantsBoth : true,
    secondaryPrice: params.secondaryPrice ? params.secondaryPrice : null,
    secondaryPriceAmount: params.secondaryPriceAmount
      ? params.secondaryPriceAmount
      : 1,
    quantity: params.quantity ? params.quantity : 0,
  }
}

export function createMarket(params: Partial<Market>) {
  return {
    id: params.id ? params.id : null,
    lastUpdated: params.lastUpdated ? params.lastUpdated : null,
    offerlistNote: params.offerlistNote ? params.offerlistNote : null,
    wishlistNote: params.wishlistNote ? params.wishlistNote : null,
    offers: params.offers ? params.offers : null,
    wishes: params.wishes ? params.wishes : null,
  } as Market
}

// Preview market which is used in the profile list
export interface PreviewMarket {
  username: string
  displayName: string
  verified: boolean
  offerCount: number
  offers: PreviewOffer[]
}

export interface PreviewOffer {
  rarity: string
  count: number
}

export function createPreviewMarket(params: Partial<PreviewMarket>) {
  return {
    username: params.username ? params.username : null,
    displayName: params.displayName ? params.displayName : null,
    verified: params.verified ? params.verified : false,
    offerCount: params.offerCount ? params.offerCount : null,
    offers: params.offers ? params.offers : [],
  } as PreviewMarket
}
