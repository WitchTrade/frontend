import type { NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomHeader from '../components/core/CustomHeader';
import SearchNav from '../components/navs/SearchNav';
import SearchFilter from '../components/search/SearchFilter';
import SearchTradeView from '../components/search/SearchTradeView';
import PageHeader from '../components/styles/PageHeader';
import SearchHandler, { SearchOffer, SearchWish } from '../shared/handlers/search.handler';

const Search: NextPage = () => {
  const {
    inventory,
    items,
    prices,
    searchResult,
    loadedTrades,
    loadMoreTrades,
    hasMoreTrades,
    searchFilterValues,
    setSearchFilterValues,
    searchOrderValues,
    setSearchOrderValues,
    search,
    searchInProgress,
    searchView,
    setSearchView
  } = SearchHandler();

  return (
    <div>
      <CustomHeader
        title="WitchTrade | Search"
        description="Search WitchTrade for offers."
        url="https://witchtrade.org/search"
      />
      <PageHeader title="Search" />
      <SearchFilter
        searchFilterValues={searchFilterValues}
        setSearchFilterValues={setSearchFilterValues}
        searchOrderValues={searchOrderValues}
        setSearchOrderValues={setSearchOrderValues}
        initialOpen={true}
        search={search}
        searchInProgress={searchInProgress} />
      {searchResult &&
        <div className="mt-2">
          <SearchNav search={searchResult} type={searchView} setType={setSearchView} />
        </div>
      }
      <InfiniteScroll
        className="flex flex-wrap justify-center py-2 mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: '1400px' }}
        dataLength={loadedTrades.length}
        next={loadMoreTrades}
        hasMore={hasMoreTrades()}
        loader={<p></p>}
      >
        {loadedTrades.map((trade: SearchOffer | SearchWish) => (
          <div key={trade.id} className="m-1">
            <SearchTradeView trade={trade} items={items} prices={prices} type={searchView} inventory={inventory} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Search;
