import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReactMarkdown from 'react-markdown'
import CustomHeader from '../../../components/core/CustomHeader'
import LoginWrapper from '../../../components/core/LoginWrapper'
import ItemDetailDialog from '../../../components/items/ItemDetailDialog'
import ItemFilter from '../../../components/items/ItemFilter'
import CreateNewTrade from '../../../components/market/CreateNewTrade'
import SyncOffersDialog from '../../../components/market/SyncOffersDialog'
import TradeView, { TRADE_TYPE } from '../../../components/market/TradeView'
import ChangedOffersNav from '../../../components/navs/ChangedOffersNav'
import MarketNav from '../../../components/navs/MarketNav'
import ActionButton from '../../../components/styles/ActionButton'
import Loading from '../../../components/styles/Loading'
import PageHeader from '../../../components/styles/PageHeader'
import Textarea from '../../../components/styles/Textarea'
import WTDialog from '../../../components/styles/WTDialog'
import FilterHandler from '../../../shared/handlers/filter.handler'
import ItemsHandler from '../../../shared/handlers/items.handler'
import MarketHandler, {
  MARKET_TYPE,
} from '../../../shared/handlers/market.handler'
import { FILTER_TYPE } from '../../../shared/static/filterValues'
import {
  emojified,
  MarkdownComponents,
} from '../../../shared/static/markdownComponents'

const Market: NextPage = () => {
  const {
    market,
    prices,
    changedOfferView,
    editingNote,
    setEditingNote,
    localNote,
    setLocalNote,
    type,
    setType,
    updateNote,
    creatingNew,
    setCreatingNew,
    addNewTrade,
    deleteAllTrades,
    localSyncSettings,
    setLocalSyncSettings,
    syncOffers,
    deleteTrade,
    updateTrade,
    closeChangedOfferView,
    changedOffers,
    selectedChangedOffers,
    setSelectedChangedOffers,
  } = MarketHandler()

  const {
    inventory,
    totalItemCount,
    filteredItems,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues,
  } = FilterHandler(
    FILTER_TYPE.MARKET,
    50,
    type === MARKET_TYPE.OFFER ? market.offers : market.wishes
  )

  const {
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails,
    capitalizeFirstLetter,
  } = ItemsHandler()

  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false)

  return (
    <LoginWrapper>
      <WTDialog
        dialogOpen={deleteAllDialogOpen}
        setDialogOpen={setDeleteAllDialogOpen}
        closeOnOutsideClick={true}
      >
        <div className='inline-block overflow-auto p-6 my-8 max-w-md text-left align-middle bg-wt-surface-dark rounded-2xl border-4 border-wt-error shadow-xl transition-all'>
          <div className='flex flex-col justify-between h-full'>
            <div>
              <p className='text-2xl font-medium leading-6'>
                Delete all{' '}
                {type === MARKET_TYPE.OFFER ? 'offers' : 'wishlist items'}
              </p>
              <p className='my-2 text-sm'>
                Are you sure that you want to delete ALL your{' '}
                {type === MARKET_TYPE.OFFER ? 'offers' : 'wishlist items'}?
                <br />
                This can&apos;t be undone.
              </p>
            </div>
            <div className='flex justify-evenly pb-2 mt-4'>
              <ActionButton
                type='success'
                onClick={() => {
                  setDeleteAllDialogOpen(false)
                  deleteAllTrades()
                }}
              >
                Yes, delete them
              </ActionButton>
              <ActionButton
                type='cancel'
                onClick={() => setDeleteAllDialogOpen(false)}
              >
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      </WTDialog>
      <CustomHeader
        title='WitchTrade | Manage Market'
        description='Manage your WitchTrade market'
        url='https://witchtrade.org/user/market'
      />
      <div className='pt-3'>
        <MarketNav market={market} type={type} setType={setType} />
      </div>
      <PageHeader
        title='Manage Market'
        description={type === MARKET_TYPE.OFFER ? 'Offers' : 'Wishlist'}
      />
      {(market.id && (
        <>
          <ItemDetailDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            item={selectedItem}
            inventory={inventory}
            capitalizeFirstLetter={capitalizeFirstLetter}
          />
          <div className='flex flex-col justify-center px-4 mx-auto max-w-2xl sm:px-6 lg:px-8'>
            <div className='flex flex-wrap justify-between items-end mb-2'>
              <p className='mx-1'>
                {type === MARKET_TYPE.OFFER ? 'Offerlist' : 'Wishlist'} note
              </p>
              {(editingNote && (
                <div className='flex'>
                  <div className='mx-1'>
                    <ActionButton
                      type='success'
                      disabled={
                        localNote.length > 250 ||
                        (localNote.match(/\n/g) || []).length + 1 > 10
                      }
                      onClick={() => updateNote()}
                    >
                      Save
                    </ActionButton>
                  </div>
                  <div className='mx-1'>
                    <ActionButton
                      type='cancel'
                      onClick={() => {
                        setLocalNote(
                          type === MARKET_TYPE.OFFER && market.offerlistNote
                            ? market.offerlistNote
                            : type === MARKET_TYPE.WISH && market.wishlistNote
                            ? market.wishlistNote
                            : ''
                        )
                        setEditingNote(false)
                      }}
                    >
                      Cancel
                    </ActionButton>
                  </div>
                </div>
              )) || (
                <div className='flex'>
                  <div className='mx-1'>
                    <ActionButton
                      type='warning'
                      onClick={() => setEditingNote(true)}
                    >
                      Edit
                    </ActionButton>
                  </div>
                </div>
              )}
            </div>
            {(editingNote && (
              <>
                <Textarea
                  placeholder={`Enter your ${
                    type === MARKET_TYPE.OFFER ? 'offerlist' : 'wishlist'
                  } note`}
                  value={localNote}
                  setValue={setLocalNote}
                  rows={6}
                />
                <p
                  className={`text-sm ${
                    localNote.length > 250 ? 'text-wt-error' : ''
                  }`}
                >
                  {localNote.length}/250 characters
                </p>
                <p
                  className={`text-sm ${
                    (localNote.match(/\n/g) || []).length + 1 > 10
                      ? 'text-wt-error'
                      : ''
                  }`}
                >
                  {(localNote.match(/\n/g) || []).length + 1}/10 lines
                </p>
                <p className='text-sm'>
                  Need help formatting your description? Check the{' '}
                  <Link href='/faq'>
                    <a className='text-wt-accent hover:underline cursor-pointer'>
                      FAQ
                    </a>
                  </Link>
                </p>
              </>
            )) || (
              <div
                className='py-1 px-3 w-full text-base placeholder:text-wt-text bg-wt-surface-dark rounded-lg'
                style={{ minHeight: '34px' }}
              >
                <ReactMarkdown
                  className='break-words markdown-content'
                  components={MarkdownComponents}
                >
                  {localNote
                    ? emojified(localNote)
                    : `No ${
                        type === MARKET_TYPE.OFFER ? 'offerlist' : 'wishlist'
                      } note set.`}
                </ReactMarkdown>
              </div>
            )}
          </div>
          <div className='flex flex-wrap justify-center mt-10'>
            {(type === MARKET_TYPE.WISH || !changedOfferView) && (
              <div className='m-1'>
                <ActionButton
                  type='success'
                  onClick={() => setCreatingNew(true)}
                >
                  <Image
                    src='/assets/svgs/add/white.svg'
                    height='24px'
                    width='24px'
                    alt='Add player'
                  />
                  New {type === MARKET_TYPE.OFFER ? 'offer' : 'wishlist item'}
                </ActionButton>
              </div>
            )}
            {type === MARKET_TYPE.OFFER && !changedOfferView && (
              <div className='m-1'>
                <SyncOffersDialog
                  localSyncSettings={localSyncSettings}
                  setLocalSyncSettings={setLocalSyncSettings}
                  syncOffers={syncOffers}
                  prices={prices}
                />
              </div>
            )}
            {((type === MARKET_TYPE.OFFER &&
              market.offers.length > 3 &&
              !changedOfferView) ||
              (type === MARKET_TYPE.WISH && market.wishes.length > 3)) && (
              <div className='m-1'>
                <ActionButton
                  type='cancel'
                  onClick={() => setDeleteAllDialogOpen(true)}
                >
                  <Image
                    src='/assets/svgs/bin/white.svg'
                    height='24px'
                    width='24px'
                    alt='Remove all'
                  />
                  Delete all
                </ActionButton>
              </div>
            )}
          </div>

          <div className='flex flex-col justify-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <CreateNewTrade
              type={type}
              dialogOpen={creatingNew}
              setDialogOpen={setCreatingNew}
              addNewTrade={addNewTrade}
              existingTrades={
                type === MARKET_TYPE.OFFER ? market.offers : market.wishes
              }
              openItemDetails={openItemDetails}
            />
          </div>
          {changedOfferView && type === MARKET_TYPE.OFFER && (
            <div className='flex justify-center items-center py-2 px-8 mx-auto mt-4 max-w-6xl bg-wt-success rounded-lg'>
              <p className='mr-10 text-2xl font-bold'>
                Showing changed offers{' '}
                <span className='text-base'>
                  ({changedOffers.new.length} new,{' '}
                  {changedOffers.updated.length} updated,{' '}
                  {changedOffers.deleted.length} deleted)
                </span>
              </p>
              <ActionButton
                type='cancel'
                onClick={() => closeChangedOfferView()}
              >
                Close
              </ActionButton>
            </div>
          )}
          {!changedOfferView && (
            <>
              <div className='w-full'>
                <ItemFilter
                  itemFilterValues={itemFilterValues}
                  setItemFilterValues={setItemFilterValues}
                  initialOpen={false}
                  type={FILTER_TYPE.MARKET}
                />
              </div>
              <p className='mt-2 text-center'>
                <span className='font-bold text-wt-accent'>
                  {totalItemCount}
                </span>{' '}
                {type === MARKET_TYPE.OFFER ? 'offer' : 'wishlist item'}
                {totalItemCount === 1 ? '' : 's'}
                {totalItemCount !== filteredItems.length ? (
                  <>
                    {' '}
                    in total,{' '}
                    <span className='font-bold text-wt-accent'>
                      {filteredItems.length}
                    </span>{' '}
                    filtered
                  </>
                ) : (
                  ''
                )}
              </p>
              <InfiniteScroll
                className='flex flex-row flex-wrap justify-center py-2 mx-6 h-full'
                dataLength={loadedItems.length}
                next={loadMoreItems}
                hasMore={hasMoreItems()}
                loader={<p></p>}
              >
                {loadedItems.map((item) => (
                  <TradeView
                    key={item.id}
                    type={
                      type === MARKET_TYPE.OFFER
                        ? TRADE_TYPE.MANAGE_OFFER
                        : TRADE_TYPE.MANAGE_WISH
                    }
                    trade={item}
                    inventory={inventory}
                    deleteTrade={deleteTrade}
                    updateTrade={updateTrade}
                    prices={prices}
                    openItemDetails={openItemDetails}
                  />
                ))}
              </InfiniteScroll>
            </>
          )}
          {changedOfferView && (
            <>
              <div className='pt-3'>
                <ChangedOffersNav
                  changedOffers={changedOffers}
                  type={selectedChangedOffers}
                  setType={setSelectedChangedOffers}
                />
              </div>
              <div className='flex flex-row flex-wrap justify-center py-2 mx-6 h-full'>
                {changedOffers[
                  selectedChangedOffers === 0
                    ? 'new'
                    : selectedChangedOffers === 1
                    ? 'updated'
                    : 'deleted'
                ].map((item) => (
                  <TradeView
                    key={item.id}
                    type={
                      type === MARKET_TYPE.OFFER
                        ? TRADE_TYPE.MANAGE_OFFER
                        : TRADE_TYPE.MANAGE_WISH
                    }
                    trade={item}
                    inventory={inventory}
                    deleteTrade={deleteTrade}
                    updateTrade={updateTrade}
                    prices={prices}
                    openItemDetails={openItemDetails}
                    deleted={selectedChangedOffers === 2}
                    updated={selectedChangedOffers === 1}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )) || <Loading />}
    </LoginWrapper>
  )
}

export default Market
