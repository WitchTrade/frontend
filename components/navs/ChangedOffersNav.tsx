import { FunctionComponent } from 'react'
import NavbarLink from '../styles/NavbarLink'

interface Props {
  changedOffers: any
  type: 0 | 1 | 2
  setType: (type: 0 | 1 | 2) => void
}

const ChangedOffersNav: FunctionComponent<Props> = ({
  changedOffers,
  type,
  setType,
}) => {
  return (
    <div className='flex justify-center'>
      <div className='mx-1'>
        <NavbarLink
          type={type === 0 ? 'navSelected' : 'nav'}
          onClick={() => setType(0)}
        >
          New
          {(changedOffers.new && (
            <div
              className='flex justify-center items-center px-1 ml-1 text-center rounded-full'
              style={{
                minWidth: '25px',
                height: '25px',
                backgroundColor:
                  changedOffers.new.length > 0 ? '#059669' : '#F59E0B',
              }}
            >
              <p className='text-sm font-bold text-white'>
                {changedOffers.new.length}
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
          type={type === 1 ? 'navSelected' : 'nav'}
          onClick={() => setType(1)}
        >
          Updated
          {(changedOffers.updated && (
            <div
              className='flex justify-center items-center px-1 ml-1 text-center rounded-full'
              style={{
                minWidth: '25px',
                height: '25px',
                backgroundColor:
                  changedOffers.updated.length > 0 ? '#059669' : '#F59E0B',
              }}
            >
              <p className='text-sm font-bold text-white'>
                {changedOffers.updated.length}
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
          type={type === 2 ? 'navSelected' : 'nav'}
          onClick={() => setType(2)}
        >
          Deleted
          {(changedOffers.deleted && (
            <div
              className='flex justify-center items-center px-1 ml-1 text-center rounded-full'
              style={{
                minWidth: '25px',
                height: '25px',
                backgroundColor:
                  changedOffers.deleted.length > 0 ? '#059669' : '#F59E0B',
              }}
            >
              <p className='text-sm font-bold text-white'>
                {changedOffers.deleted.length}
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

export default ChangedOffersNav
