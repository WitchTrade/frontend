import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateNewTradeHandler from '../../shared/handlers/createNewTrade.handler';
import FilterHandler, { FILTER_TYPE } from '../../shared/handlers/filter.handler';
import { MARKET_TYPE } from '../../shared/handlers/market.handler';
import { Item } from '../../shared/stores/items/item.model';
import { Offer, Wish } from '../../shared/stores/markets/market.model';
import ItemFilter from '../items/ItemFilter';
import ActionButton from '../styles/ActionButton';
import SmallItemView from './SmallItemView';
import NumberInput from '../styles/NumberInput';
import PriceSelector from './PriceSelector';
import Loading from '../styles/Loading';
import usePricesProvider from '../../shared/providers/prices.provider';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  type: MARKET_TYPE;
  addNewTrade: (trade: Offer | Wish) => void;
  existingTrades: Offer[] | Wish[];
};

const CreateNewTrade: FunctionComponent<Props> = ({ dialogOpen, setDialogOpen, type, addNewTrade, existingTrades }) => {

  const { prices } = usePricesProvider();

  const {
    inventory,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues,
    resetLoadedItems
  } = FilterHandler(FILTER_TYPE.NEWTRADE, 100, existingTrades);

  const {
    progress,
    setProgress,
    trade,
    setTrade,
    createTrade
  } = CreateNewTradeHandler(type, addNewTrade);

  const [loading, setLoading] = useState(false);

  return (
    <>
      {dialogOpen &&
        <div className="m-2 p-2 text-left align-middle transition-all transform rounded-2xl bg-wt-surface-dark border-2 border-wt-success">
          <div className="flex flex-col h-smallNewTrade sm:h-wideNewTrade overflow-y-auto overflow-x-hidden">
            <p className="text-2xl font-bold leading-6 text-center text-wt-accent">New {type === MARKET_TYPE.OFFER ? 'offer' : 'wishlist item'}</p>
            <div className="flex justify-center mt-4 mb-2">
              <ActionButton type="cancel" onClick={() => { setDialogOpen(false); setProgress(0); resetLoadedItems(); }}>
                Cancel
              </ActionButton>
            </div>
            {progress === 0 &&
              <>
                <p className="text-center">Select an item</p>
                <div className="flex flex-wrap">
                  <div className="w-full sm:w-1/2 overflow-auto my-1 border border-wt-accent rounded-lg" style={{ maxHeight: '384px' }}>
                    <ItemFilter itemFilterValues={itemFilterValues} setItemFilterValues={setItemFilterValues} initialOpen={true} type={FILTER_TYPE.NEWTRADE} />
                  </div>
                  <div id="itemScroll" className="w-full sm:w-1/2 overflow-auto" style={{ maxHeight: '384px' }}>
                    <InfiniteScroll
                      className="flex flex-row flex-wrap justify-center py-2 h-full"
                      dataLength={loadedItems.length}
                      next={loadMoreItems}
                      hasMore={hasMoreItems()}
                      loader={<p></p>}
                      scrollableTarget="itemScroll"
                    >
                      {loadedItems.map((item, i) => (
                        <SmallItemView key={i} item={item} inventory={inventory} selectItem={(selectedItem: Item) => { setTrade({ ...trade, selectedItem }); setProgress(1); }} />
                      ))}
                    </InfiniteScroll>
                  </div>
                </div>
              </>
            }
            {progress === 1 && trade.selectedItem &&
              <>
                <div className="my-1 flex flex-wrap items-center justify-center">
                  <div className="my-1 flex flex-col items-center justify-center">
                    <p>Selected item</p>
                    <div className="flex w-28 flex-col justify-between rounded-lg bg-wt-surface text-center m-1 shadow-md" style={{ borderColor: `#${trade.selectedItem.rarityColor}`, borderWidth: '6px' }}>
                      <Image className="rounded-t-lg" src={trade.selectedItem.iconUrl} height={112} width={112} alt={trade.selectedItem.name} />
                      <p className="text-sm p-1 break-words font-semibold">{trade.selectedItem.name}</p>
                    </div>
                  </div>
                  <div className="my-1 flex flex-col items-center justify-center">
                    <p className="text-center mt-2 underline">{type === MARKET_TYPE.OFFER ? 'Set quantity and price' : 'Set a price you would like to offer'}</p>
                    {type === MARKET_TYPE.OFFER &&
                      <div className="flex justify-between items-center m-2 w-60">
                        <div className="flex flex-col justify-start">
                          <p>Quantity</p>
                        </div>
                        <NumberInput value={trade.quantity} setValue={(quantity) => setTrade({ ...trade, quantity })} min={0} />
                      </div>
                    }
                    <div className="flex flex-wrap justify-center">
                      <div className={`flex flex-col mx-4 justify-between items-center mb-10 p-1 ${trade.mainPrice ? 'rounded-lg bg-wt-surface' : ''}`}>
                        {trade.mainPrice &&
                          <div className="h-14 w-14 mb-2">
                            <Image className="rounded-lg" src={`/assets/images/prices/${trade.mainPrice.priceKey}.png`} height={56} width={56} quality={100} alt={trade.mainPrice.displayName} />
                          </div>
                        }
                        <PriceSelector type={type} prices={prices} price={trade.mainPrice} setPrice={(mainPrice) => setTrade({ ...trade, mainPrice })} buttonText="Select price #1" excludeIds={trade.secondaryPrice ? [trade.secondaryPrice.id] : []} />
                        {trade.mainPrice?.withAmount &&
                          <div className="flex justify-between items-center m-2 w-60">
                            <div className="flex flex-col justify-start">
                              <p>Amount of {trade.mainPrice.displayName}</p>
                            </div>
                            <NumberInput value={trade.mainPriceAmount} setValue={(mainPriceAmount) => setTrade({ ...trade, mainPriceAmount })} min={0} max={99} />
                          </div>
                        }
                      </div>
                      {trade.mainPrice &&
                        <div className={`flex flex-col mx-4 justify-between items-center mb-10 p-1 ${trade.secondaryPrice ? 'rounded-lg bg-wt-surface' : ''}`}>
                          {trade.secondaryPrice &&
                            <>
                              <div className="h-14 w-14 mb-2">
                                <Image className="rounded-lg" src={`/assets/images/prices/${trade.secondaryPrice.priceKey}.png`} height={56} width={56} quality={100} alt={trade.secondaryPrice.displayName} />
                              </div>
                              <div className="mt-1 mb-2">
                                <ActionButton type="cancel" onClick={() => setTrade({ ...trade, secondaryPrice: null })}>
                                  Remove price #2
                                </ActionButton>
                              </div>
                            </>
                          }
                          <PriceSelector type={type} prices={prices} price={trade.secondaryPrice} setPrice={(secondaryPrice) => setTrade({ ...trade, secondaryPrice })} buttonText="Select price #2" excludeIds={[trade.mainPrice.id]} />
                          {trade.secondaryPrice?.withAmount &&
                            <div className="flex justify-between items-center m-2 w-60">
                              <div className="flex flex-col justify-start">
                                <p>Amount of {trade.secondaryPrice.displayName}</p>
                              </div>
                              <NumberInput value={trade.secondaryPriceAmount} setValue={(secondaryPriceAmount) => setTrade({ ...trade, secondaryPriceAmount })} min={0} max={99} />
                            </div>
                          }
                        </div>
                      }
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  {!loading &&
                    <ActionButton type="proceed" disabled={!trade.mainPrice} onClick={() => { setLoading(true); createTrade(() => { setProgress(0); setLoading(false); }); }}>
                      Create {type === MARKET_TYPE.OFFER ? 'offer' : 'wishlist item'}
                    </ActionButton>
                    ||
                    <Loading />
                  }
                </div>
              </>
            }
          </div>
        </div>
      }
    </>
  );
};

export default CreateNewTrade;
