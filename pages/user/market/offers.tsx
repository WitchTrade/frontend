import { NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import LoginWrapper from '../../../components/core/LoginWrapper';
import CustomHeader from '../../../components/core/CustomHeader';
import PageHeader from '../../../components/styles/PageHeader';
import MarketNav from '../../../components/navs/MarketNav';
import Textarea from '../../../components/styles/Textarea';
import MarketHandler, { MARKET_TYPE } from '../../../shared/handlers/market.handler';
import ActionButton from '../../../components/styles/ActionButton';
import Loading from '../../../components/styles/Loading';
import FilterHandler, { FILTER_TYPE } from '../../../shared/handlers/filter.handler';
import ItemFilter from '../../../components/items/ItemFilter';
import InfiniteScroll from 'react-infinite-scroll-component';
import TradeView from '../../../components/market/TradeView';
import CreateNewTrade from '../../../components/market/CreateNewTrade';
import WTDialog from '../../../components/styles/WTDialog';

const Market: NextPage = () => {
  const {
    market,
    editingNote,
    setEditingNote,
    localNote,
    setLocalNote,
    updateNote,
    creatingNew,
    setCreatingNew,
    addNewTrade,
    deleteAllTrades
  } = MarketHandler(MARKET_TYPE.OFFER);

  const {
    inventory,
    totalItemCount,
    filteredItems,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues
  } = FilterHandler(FILTER_TYPE.MARKET, 50, market.offers);

  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);

  return (
    <LoginWrapper>
      <WTDialog dialogOpen={deleteAllDialogOpen} setDialogOpen={setDeleteAllDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-md p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-error">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-2xl font-medium leading-6">Delete all offers</p>
              <p className="text-sm my-2">Are you sure that you want to delete ALL your offers?<br />This can't be undone.</p>
            </div>
            <div className="mt-4 flex justify-evenly pb-2">
              <ActionButton type="neutral-enabled" onClick={() => setDeleteAllDialogOpen(false)}>
                Cancel
              </ActionButton>
              <ActionButton type="cancel" onClick={() => {
                setDeleteAllDialogOpen(false);
                deleteAllTrades();
              }}>
                Yes, delete them
              </ActionButton>
            </div>
          </div>
        </div>
      </WTDialog>
      <CustomHeader
        title="WitchTrade | Manage Market"
        description="Manage your WitchTrade market"
        url="https://witchtrade.org/user/market/offers"
      />
      <MarketNav />
      <PageHeader title="Manage Market" description="Offers" />
      {market.id &&
        <>
          <div className="flex flex-col justify-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between mb-2 items-end">
              <p className="mx-1">Offerlist note</p>
              {editingNote &&
                <div className="flex">
                  <div className="mx-1">
                    <ActionButton type="cancel" onClick={() => { setLocalNote(market.offerlistNote ? market.offerlistNote : ''); setEditingNote(false); }}>Cancel</ActionButton>
                  </div>
                  <div className="mx-1">
                    <ActionButton type="proceed" disabled={localNote.length > 200 || (localNote.match(/\n/g) || []).length + 1 > 10} onClick={() => updateNote()}>Save</ActionButton>
                  </div>
                </div>
                ||
                <div className="flex">
                  <div className="mx-1">
                    <ActionButton type="warning" onClick={() => setEditingNote(true)}>Edit</ActionButton>
                  </div>
                </div>
              }
            </div>
            {editingNote &&
              <>
                <Textarea placeholder="Enter your wishlist note" value={localNote} setValue={setLocalNote} rows={6} />
                <p className={`text-sm ${localNote.length > 200 ? 'text-wt-error' : ''}`}>{localNote.length}/200 characters</p>
                <p className={`text-sm ${(localNote.match(/\n/g) || []).length + 1 > 10 ? 'text-wt-error' : ''}`}>{(localNote.match(/\n/g) || []).length + 1}/10 lines</p>
              </>
              ||
              <div className="w-full px-3 py-1 text-base placeholder-wt-text rounded-lg bg-wt-surface-dark" style={{ minHeight: '34px' }}>
                <p className={`whitespace-pre-line break-words ${market.offerlistNote ? '' : 'italic'}`}>{market.offerlistNote ? market.offerlistNote : 'No offerlist note set.'} </p>
              </div>
            }
          </div>
          <div className="flex flex-wrap justify-center mt-10">
            <div className="m-1">
              <ActionButton type="proceed" onClick={() => setCreatingNew(true)}>
                <Image src="/assets/svgs/add/white.svg" height="24px" width="24px" alt="Add player" />
                Add offer
              </ActionButton>
            </div>
            <div className="m-1">
              <ActionButton type="accent" onClick={() => { }}>
                <Image src="/assets/svgs/sync.svg" height="24px" width="24px" alt="Sync Steam Friends" />
                Sync offers
              </ActionButton>
            </div>
            {market.offers.length > 3 &&
              <div className="m-1">
                <ActionButton type="cancel" onClick={() => setDeleteAllDialogOpen(true)}>
                  <Image src="/assets/svgs/bin/white.svg" height="24px" width="24px" alt="Remove all" />
                  Delete all
                </ActionButton>
              </div>
            }
          </div>

          <div className="flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CreateNewTrade type={MARKET_TYPE.OFFER} dialogOpen={creatingNew} setDialogOpen={setCreatingNew} addNewTrade={addNewTrade} existingTrades={market.offers} />
          </div>
          <div className="w-full">
            <ItemFilter itemFilterValues={itemFilterValues} setItemFilterValues={setItemFilterValues} initialOpen={false} type={FILTER_TYPE.MARKET} />
          </div>
          <p className="text-center mt-2">
            <span className="text-wt-accent font-bold">
              {totalItemCount}
            </span> offer
            {totalItemCount === 1 ? '' : 's'}
            {totalItemCount !== filteredItems.length ? (
              <> in total, <span className="text-wt-accent font-bold">
                {filteredItems.length}
              </span> filtered</>) : ''}
          </p>
          <InfiniteScroll
            className="flex flex-row flex-wrap justify-center py-2 h-full mx-6"
            dataLength={loadedItems.length}
            next={loadMoreItems}
            hasMore={hasMoreItems()}
            loader={<p></p>}
          >
            {loadedItems.map((item) => (
              <TradeView key={item.id} type={MARKET_TYPE.OFFER} trade={item} inventory={inventory} />
            ))}
          </InfiniteScroll>
        </>
        ||
        <Loading />
      }
    </LoginWrapper>
  );
};

export default Market;
