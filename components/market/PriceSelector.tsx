import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import { Price } from '../../shared/stores/markets/market.model';
import WTDialog from '../styles/WTDialog';
import ActionButton from '../styles/ActionButton';
import Tooltip from '../styles/Tooltip';
import { MARKET_TYPE } from '../../shared/handlers/market.handler';

interface Props {
  type: MARKET_TYPE;
  prices: Price[];
  price: Price;
  setPrice: (price: Price) => void;
  buttonText: string;
  excludeIds: number[];
};

const PriceSelector: FunctionComponent<Props> = ({ type, prices, price, setPrice, buttonText, excludeIds }) => {

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <WTDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-lg p-6 pb-16 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-success">
          <div className="h-full flex flex-col justify-between">
            <p className="text-2xl font-medium leading-6 text-center">Select a price</p>
            <div className="flex flex-wrap justify-center items-center mt-3">
              {prices.filter(p => !excludeIds.includes(p.id) && (type === MARKET_TYPE.OFFER && p.forOffers) || (type === MARKET_TYPE.WISH && p.forWishes)).map(p => (
                <Tooltip key={p.id} text={p.displayName}>
                  <div className={`m-1 h-14 w-14 rounded-lg p-1 cursor-pointer ${price?.id === p.id ? 'bg-wt-accent' : ''}`} onClick={() => { setPrice(p); setDialogOpen(false); }}>
                    <Image className="rounded-lg" src={`/assets/images/prices/${p.priceKey}.png`} height={56} width={56} alt={p.displayName} />
                  </div>
                </Tooltip>
              ))
              }
            </div>
          </div>
        </div>
      </WTDialog>
      <ActionButton type="proceed" onClick={() => setDialogOpen(true)}>
        {buttonText}
      </ActionButton>
    </>
  );
};

export default PriceSelector;
