import { Wish } from '../markets/market.model';

export interface SearchResult {
  wishes: Wish[];
  offers: SearchOffer[];
}

export interface SearchOffer {
  id: number,
  markets: MarketOffer[];
}

interface MarketOffer {
  price: number;
  quantity: number;
  user: { username: string, displayName: string; };
}

export function createSearchResult(params: Partial<SearchResult>) {
  return {
    wishes: params.wishes ? params.wishes : [],
    offers: params.offers ? params.offers : []
  } as SearchResult;
}