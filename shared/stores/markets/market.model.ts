export interface Market {
  id: number;
  lastUpdated: Date;
  offerlistNote: string;
  wishlistNote: string;
  offers: Offer[];
  wishes: Wish[];
}

export interface Offer {
  id: number;
  item: { id: number; };
  mainPrice: Price;
  mainPriceAmount?: number;
  secondaryPrice: Price;
  secondaryPriceAmount?: number;
  quantity: number;
}

export interface Wish {
  id: number;
  item: { id: number; };
  mainPrice: Price;
  mainPriceAmount?: number;
  secondaryPrice: Price;
  secondaryPriceAmount?: number;
}

export interface Price {
  id: number;
  priceKey: string;
  displayName: string;
  forOffers: boolean;
  forWishes: boolean;
  withAmount: number;
}

export function createMarket(params: Partial<Market>) {
  return {
    id: params.id ? params.id : null,
    lastUpdated: params.lastUpdated ? params.lastUpdated : null,
    offerlistNote: params.offerlistNote ? params.offerlistNote : null,
    wishlistNote: params.wishlistNote ? params.wishlistNote : null,
    offers: params.offers ? params.offers : [],
    wishes: params.wishes ? params.wishes : [],
  } as Market;
}

// Preview market which is used in the profile list
export interface PreviewMarket {
  id: number;
  user: { username: string; displayName: string; };
  offerCount: number;
  offers: PreviewOffer[];
}

export interface PreviewOffer {
  rarity: string;
  count: number;
}

export function createPreviewMarket(params: Partial<PreviewMarket>) {
  return {
    id: params.id ? params.id : null,
    user: params.user ? params.user : null,
    offerCount: params.offerCount ? params.offerCount : null,
    offers: params.offers ? params.offers : []
  } as PreviewMarket;
}
