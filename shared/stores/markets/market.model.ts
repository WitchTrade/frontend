export interface Market {
  id: number;
  offerNote: string;
  wishNote: string;
  user: { username: string; displayName: string; };
  offerCount: number;
  offers: Offer[];
  wishCount: number;
  wishes: Wish[];
  lastUpdated: Date;
}

export interface Offer {
  id: number;
  item: { id: number; };
  price: number;
  quantity: number;
}

export interface Wish {
  id: number;
  item: { id: number; };
  user?: { username: string, displayName: string; };
}

export function createMarket(params: Partial<Market>) {
  return {
    id: params.id ? params.id : null,
    user: params.user ? params.user : null,
    offerNote: params.offerNote ? params.offerNote : null,
    wishNote: params.wishNote ? params.wishNote : null,
    offerCount: params.offerCount ? params.offerCount : null,
    offers: params.offers ? params.offers : []
  } as Market;
}


// Simple market which is used in the profile list
export interface SimpleMarket {
  id: number;
  user: { username: string; displayName: string; };
  offerCount: number;
  offers: SimpleOffer[];
}

export interface SimpleOffer {
  rarity: string;
  count: number;
}

export function createSimpleMarket(params: Partial<SimpleMarket>) {
  return {
    id: params.id ? params.id : null,
    user: params.user ? params.user : null,
    offerCount: params.offerCount ? params.offerCount : null,
    offers: params.offers ? params.offers : []
  } as SimpleMarket;
}
