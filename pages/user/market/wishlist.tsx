import { NextPage } from 'next';
import LoginWrapper from '../../../components/core/LoginWrapper';
import CustomHeader from '../../../components/core/CustomHeader';
import PageHeader from '../../../components/styles/PageHeader';
import MarketNav from '../../../components/navs/MarketNav';
import Textarea from '../../../components/styles/Textarea';
import MarketHandler, { MARKET_TYPE } from '../../../shared/handlers/market.handler';
import ActionButton from '../../../components/styles/ActionButton';
import Loading from '../../../components/styles/Loading';

const Market: NextPage = () => {
  const {
    market,
    editingNote,
    setEditingNote,
    localNote,
    setLocalNote,
    updateNote,
    creatingNew,
    setCreatingNew
  } = MarketHandler(MARKET_TYPE.WISH);

  return (
    <LoginWrapper>
      <CustomHeader
        title="WitchTrade | Manage Market"
        description="Manage your WitchTrade market"
        url="https://witchtrade.org/user/market/wishlist"
      />
      <MarketNav />
      <PageHeader title="Manage Market" description="Wishlist" />
      {market.id &&
        <div className="flex flex-col justify-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between mb-2 items-end">
            <p className="mx-1">Wishlist note</p>
            {editingNote &&
              <div className="flex">
                <div className="mx-1">
                  <ActionButton type="cancel" onClick={() => { setLocalNote(market.wishlistNote ? market.wishlistNote : ''); setEditingNote(false); }}>Cancel</ActionButton>
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
              <p className={`${localNote.length > 200 ? 'text-wt-error' : ''}`}>{localNote.length}/200 chars</p>
              <p className={`${(localNote.match(/\n/g) || []).length + 1 > 10 ? 'text-wt-error' : ''}`}>{(localNote.match(/\n/g) || []).length + 1}/10 lines</p>
            </>
            ||
            <div className="w-full px-3 py-1 text-base placeholder-wt-text rounded-lg bg-wt-surface-dark" style={{ minHeight: '154px' }}>
              <p className={`whitespace-pre-line break-words ${market.wishlistNote ? '' : 'italic'}`}>{market.wishlistNote ? market.wishlistNote : 'No wishlist note set.'} </p>
            </div>
          }
        </div>
        ||
        <Loading />
      }
    </LoginWrapper>
  );
};

export default Market;
