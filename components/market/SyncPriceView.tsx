import Image from 'next/image'
import { FunctionComponent, useState } from 'react'
import { MARKET_TYPE } from '../../shared/handlers/market.handler'
import { Price } from '../../shared/stores/prices/price.model'
import ActionButton from '../styles/ActionButton'
import NumberInput from '../styles/NumberInput'
import Tooltip from '../styles/Tooltip'
import WTDialog from '../styles/WTDialog'

interface Props {
  type: MARKET_TYPE
  prices: Price[]
  price: Price
  setPrice: (price: Price | null) => void
  priceAmount: number
  setPriceAmount: (priceAmount: number) => void
  text: string
  removeButton: boolean
  excludeIds: number[]
}

const SyncPriceView: FunctionComponent<Props> = ({
  type,
  prices,
  price,
  setPrice,
  priceAmount,
  setPriceAmount,
  text,
  removeButton,
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
      <div className='flex-col justify-evenly items-center p-1 m-1 rounded-lg border border-wt-accent'>
        <div className='flex flex-wrap justify-center items-center'>
          <p className='text-sm underline'>{text}</p>
          <div className='flex items-center'>
            {price && (
              <Tooltip text={price.displayName}>
                <div className='mx-2 w-10 h-10'>
                  <Image
                    className='rounded-lg'
                    src={`/assets/images/prices/${price.priceKey}.png`}
                    height={40}
                    width={40}
                    quality={100}
                    alt={price.displayName}
                  />
                </div>
              </Tooltip>
            )}
            <div className='mx-1'>
              <Tooltip text='Select price'>
                <ActionButton type='info' onClick={() => setDialogOpen(true)}>
                  <Image
                    src={`/assets/svgs/change/white.svg`}
                    height='24px'
                    width='24px'
                    alt='Dropdown Item Icon'
                  />
                </ActionButton>
              </Tooltip>
            </div>
            {removeButton && price && (
              <Tooltip text='Remove price'>
                <div className='mx-1'>
                  <ActionButton type='cancel' onClick={() => setPrice(null)}>
                    <Image
                      src={`/assets/svgs/bin/white.svg`}
                      height='24px'
                      width='24px'
                      alt='Dropdown Item Icon'
                    />
                  </ActionButton>
                </div>
              </Tooltip>
            )}
          </div>
        </div>
        {price?.withAmount && (
          <div className='flex justify-between items-center my-2 mr-1'>
            <div className='flex flex-col justify-start'>
              <p className='text-sm'>
                Amount of{' '}
                {price.priceKey.startsWith('dynamic')
                  ? 'ingredients'
                  : price.displayName}
              </p>
            </div>
            <NumberInput
              value={priceAmount}
              setValue={setPriceAmount}
              min={0}
              max={99}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default SyncPriceView
