import { FunctionComponent } from 'react'
import { MARKET_TYPE } from '../../shared/handlers/market.handler'
import { Market } from '../../shared/stores/markets/market.model'
import NavbarLink from '../styles/NavbarLink'

interface Props {
  market: Market
  type: MARKET_TYPE
  setType: (type: MARKET_TYPE) => void
}

const MarketNav: FunctionComponent<Props> = ({ market, type, setType }) => {
  return (
    <div className='flex justify-center'>
      <div className='mx-1'>
        <NavbarLink
          type={type === MARKET_TYPE.OFFER ? 'navSelected' : 'nav'}
          onClick={() => setType(MARKET_TYPE.OFFER)}
        >
          Offers
          {(market.offers && (
            <div
              className='flex justify-center items-center px-1 ml-1 text-center rounded-full'
              style={{
                minWidth: '25px',
                height: '25px',
                backgroundColor:
                  market.offers.length > 0 ? '#059669' : '#F59E0B',
              }}
            >
              <p className='text-sm font-bold text-white'>
                {market.offers.length}
              </p>
            </div>
          )) || (
            <div
              className='flex justify-center items-center px-1 ml-1 text-center rounded-full'
              style={{ minWidth: '25px', height: '25px' }}
            >
              <p className='text-sm font-bold text-white'></p>
            </div>
          )}
        </NavbarLink>
      </div>
      <div className='mx-1'>
        <NavbarLink
          type={type === MARKET_TYPE.WISH ? 'navSelected' : 'nav'}
          onClick={() => setType(MARKET_TYPE.WISH)}
        >
          Wishlist
          {(market.wishes && (
            <div
              className='flex justify-center items-center px-1 ml-1 text-center rounded-full'
              style={{
                minWidth: '25px',
                height: '25px',
                backgroundColor:
                  market.wishes.length > 0 ? '#059669' : '#F59E0B',
              }}
            >
              <p className='text-sm font-bold text-white'>
                {market.wishes.length}
              </p>
            </div>
          )) || (
            <div
              className='flex justify-center items-center px-1 ml-1 text-center rounded-full'
              style={{ minWidth: '25px', height: '25px' }}
            >
              <p className='text-sm font-bold text-white'></p>
            </div>
          )}
        </NavbarLink>
      </div>
    </div>
  )
}

export default MarketNav
