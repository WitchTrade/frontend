export interface Price {
  id: number;
  priceKey: string;
  displayName: string;
  withAmount: number;
  forOffers: boolean;
  forWishes: boolean;
  forSync: boolean;
  canBeMain: boolean;
}
