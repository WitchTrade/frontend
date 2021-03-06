import Image from 'next/image'
import { FunctionComponent, useState } from 'react'
import { MARKET_TYPE } from '../../shared/handlers/market.handler'
import { Price } from '../../shared/stores/prices/price.model'
import ActionButton from '../styles/ActionButton'
import Tooltip from '../styles/Tooltip'
import WTDialog from '../styles/WTDialog'

interface Props {
  type: MARKET_TYPE
  prices: Price[]
  price: Price
  setPrice: (price: Price) => void
  buttonText: string
  excludeIds: number[]
}

const PriceSelector: FunctionComponent<Props> = ({
  type,
  prices,
  price,
  setPrice,
  buttonText,
  excludeIds,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <WTDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        closeOnOutsideClick={true}
      >
        <div className='inline-block overflow-auto p-6 pb-16 my-8 max-w-lg text-left align-middle bg-wt-surface-dark rounded-2xl border-4 border-wt-success shadow-xl transition-all'>
          <div className='flex flex-col justify-between h-full'>
            <p className='text-2xl font-medium leading-6 text-center'>
              Select a price
            </p>
            <div className='flex flex-wrap justify-center items-center mt-3'>
              {prices
                .filter(
                  (p) =>
                    !excludeIds.includes(p.id) &&
                    ((type === MARKET_TYPE.OFFER && p.forOffers) ||
                      (type === MARKET_TYPE.WISH && p.forWishes) ||
                      (type === MARKET_TYPE.SYNC &&
                        p.forSync &&
                        !p.priceKey.startsWith('dynamic')))
                )
                .map((p) => (
                  <Tooltip key={p.id} text={p.displayName}>
                    <div
                      className={`m-1 h-14 w-14 rounded-lg p-1 cursor-pointer ${
                        price?.id === p.id ? 'bg-wt-accent' : ''
                      }`}
                      onClick={() => {
                        setPrice(p)
                        setDialogOpen(false)
                      }}
                    >
                      <Image
                        className='rounded-lg'
                        src={`/assets/images/prices/${p.priceKey}.png`}
                        height={56}
                        width={56}
                        quality={100}
                        alt={p.displayName}
                      />
                    </div>
                  </Tooltip>
                ))}
            </div>
            <div className='flex flex-wrap justify-center items-center mt-3'>
              {type === MARKET_TYPE.SYNC &&
                prices
                  .filter(
                    (p) =>
                      !excludeIds.includes(p.id) &&
                      p.forSync &&
                      p.priceKey.startsWith('dynamic')
                  )
                  .map((p) => (
                    <Tooltip key={p.id} text={p.displayName}>
                      <div
                        className={`m-1 h-14 w-14 rounded-lg p-1 cursor-pointer ${
                          price?.id === p.id ? 'bg-wt-accent' : ''
                        }`}
                        onClick={() => {
                          setPrice(p)
                          setDialogOpen(false)
                        }}
                      >
                        <Image
                          className='rounded-lg'
                          src={`/assets/images/prices/${p.priceKey}.png`}
                          height={56}
                          width={56}
                          quality={100}
                          alt={p.displayName}
                        />
                      </div>
                    </Tooltip>
                  ))}
            </div>
          </div>
        </div>
      </WTDialog>
      <ActionButton type='info' onClick={() => setDialogOpen(true)}>
        {buttonText}
      </ActionButton>
    </>
  )
}

export default PriceSelector
