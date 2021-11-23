import { FunctionComponent, useEffect, useState } from 'react';
import Image from 'next/image';
import WTDialog from '../styles/WTDialog';
import ActionButton from '../styles/ActionButton';
import Loading from '../styles/Loading';
import { Offer, Price, Wish } from '../../shared/stores/markets/market.model';
import { TRADE_TYPE } from './TradeView';
import { Item } from '../../shared/stores/items/item.model';
import NumberInput from '../styles/NumberInput';
import PriceSelector from './PriceSelector';
import usePricesProvider from '../../shared/providers/prices.provider';
import { MARKET_TYPE } from '../../shared/handlers/market.handler';

interface Props {
  type: TRADE_TYPE;
  selectedTrade: Offer | Wish;
  selectedItem: Item;
  prices: Price[];
  updateTrade: (trade: any, finished: () => void) => void;
};

const EditTradeDialog: FunctionComponent<Props> = ({ type, selectedTrade, selectedItem, prices, updateTrade }) => {

  const [localTrade, setLocalTrade] = useState<any>(selectedTrade);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalTrade(selectedTrade);
  }, [dialogOpen]);

  const finished = () => {
    setDialogOpen(false);
    setLoading(false);
  };

  return (
    <>
      <WTDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-lg p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-accent">
          <div className="mx-2">
            <p className="text-center">Edit {selectedItem.name}</p>
            <div className="my-1 flex flex-col items-center justify-center">
              <div className="flex w-28 rounded-lg m-1" style={{ borderColor: `#${selectedItem.rarityColor}`, borderWidth: '6px' }}>
                <Image className="rounded-t-lg" src={selectedItem.iconUrl} height={112} width={112} alt={selectedItem.name} />
              </div>
            </div>
            <div className="my-1 flex flex-col items-center justify-center">
              <p className="text-center mt-2 underline">{type === TRADE_TYPE.MANAGE_OFFER ? 'Set quantity and price' : 'Set a price you would like to offer'}</p>
              {type === TRADE_TYPE.MANAGE_OFFER &&
                <div className="flex justify-between items-center m-2 w-60">
                  <div className="flex flex-col justify-start">
                    <p>In stock</p>
                  </div>
                  <NumberInput value={localTrade.quantity} setValue={(quantity) => setLocalTrade({ ...localTrade, quantity })} min={0} max={10000} />
                </div>
              }
              <div className="flex flex-wrap justify-center">
                <div className={`flex flex-col mx-4 justify-between items-center mb-10 p-1 ${localTrade.mainPrice ? 'rounded-lg bg-wt-surface' : ''}`}>
                  {localTrade.mainPrice &&
                    <div className="h-14 w-14 mb-2">
                      <Image className="rounded-lg" src={`/assets/images/prices/${localTrade.mainPrice.priceKey}.png`} height={56} width={56} quality={100} alt={localTrade.mainPrice.displayName} />
                    </div>
                  }
                  <PriceSelector type={type === TRADE_TYPE.MANAGE_OFFER ? MARKET_TYPE.OFFER : MARKET_TYPE.WISH} prices={prices} price={localTrade.mainPrice} setPrice={(mainPrice) => setLocalTrade({ ...localTrade, mainPrice })} buttonText="Select price #1" excludeIds={localTrade.secondaryPrice ? [localTrade.secondaryPrice.id] : []} />
                  {localTrade.mainPrice?.withAmount &&
                    <div className="flex justify-between items-center m-2 w-60">
                      <div className="flex flex-col justify-start">
                        <p>Amount of {localTrade.mainPrice.displayName}</p>
                      </div>
                      <NumberInput value={localTrade.mainPriceAmount ? localTrade.mainPriceAmount : 4} setValue={(mainPriceAmount) => setLocalTrade({ ...localTrade, mainPriceAmount })} min={1} max={99} />
                    </div>
                  }
                </div>
                {localTrade.mainPrice &&
                  <div className={`flex flex-col mx-4 justify-between items-center mb-10 p-1 ${localTrade.secondaryPrice ? 'rounded-lg bg-wt-surface' : ''}`}>
                    {localTrade.secondaryPrice &&
                      <>
                        <div className="h-14 w-14 mb-2">
                          <Image className="rounded-lg" src={`/assets/images/prices/${localTrade.secondaryPrice.priceKey}.png`} height={56} width={56} quality={100} alt={localTrade.secondaryPrice.displayName} />
                        </div>
                        <div className="mt-1 mb-2">
                          <ActionButton type="cancel" onClick={() => setLocalTrade({ ...localTrade, secondaryPrice: null })}>
                            Remove price #2
                          </ActionButton>
                        </div>
                      </>
                    }
                    <PriceSelector type={type === TRADE_TYPE.MANAGE_OFFER ? MARKET_TYPE.OFFER : MARKET_TYPE.WISH} prices={prices} price={localTrade.secondaryPrice} setPrice={(secondaryPrice) => setLocalTrade({ ...localTrade, secondaryPrice })} buttonText="Select price #2" excludeIds={[localTrade.mainPrice.id]} />
                    {localTrade.secondaryPrice?.withAmount &&
                      <div className="flex justify-between items-center m-2 w-60">
                        <div className="flex flex-col justify-start">
                          <p>Amount of {localTrade.secondaryPrice.displayName}</p>
                        </div>
                        <NumberInput value={localTrade.secondaryPriceAmount ? localTrade.secondaryPriceAmount : 1} setValue={(secondaryPriceAmount) => setLocalTrade({ ...localTrade, secondaryPriceAmount })} min={1} max={99} />
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
            <div className="mt-4 flex justify-evenly pb-2">
              {!loading &&
                <>
                  <ActionButton type="accent" onClick={() => {
                    setLoading(true);
                    updateTrade(localTrade, finished);
                  }}>
                    Update
                  </ActionButton>
                  <ActionButton type="neutral-enabled" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </ActionButton>
                </>
                ||
                <Loading />
              }
            </div>
          </div>
        </div>
      </WTDialog>
      <ActionButton type="warning" onClick={() => setDialogOpen(true)} small={true}>
        <Image src={`/assets/svgs/edit/white.svg`} height="24px" width="24px" alt="Delete Trade" />
      </ActionButton>
    </>
  );
};

export default EditTradeDialog;
