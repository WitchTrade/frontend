import type { NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomHeader from '../components/core/CustomHeader';
import ItemFilter from '../components/items/ItemFilter';
import ItemView from '../components/items/ItemView';
import PageHeader from '../components/styles/PageHeader';
import ItemsHandler from '../shared/handlers/items.handler';
import FilterHandler, { FILTER_TYPE } from '../shared/handlers/filter.handler';
import ItemDetailDialog from '../components/items/ItemDetailDialog';

const Items: NextPage = () => {
  const {
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails,
    capitalizeFirstLetter
  } = ItemsHandler();

  const {
    inventory,
    totalItemCount,
    filteredItems,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues,
  } = FilterHandler(FILTER_TYPE.ITEM, 125);

  return (
    <div>
      <ItemDetailDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} item={selectedItem} inventory={inventory} capitalizeFirstLetter={capitalizeFirstLetter} />
      <CustomHeader
        title="WitchTrade | Items"
        description="Witch It item list."
        url="https://witchtrade.org/items"
      />
      <PageHeader title="Items" />
      <ItemFilter itemFilterValues={itemFilterValues} setItemFilterValues={setItemFilterValues} initialOpen={true} type={FILTER_TYPE.ITEM} />
      <p className="text-center mt-2">
        <span className="text-wt-accent font-bold">
          {totalItemCount}
        </span> item
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
        {loadedItems.map((item, i) => (
          <ItemView key={i} item={item} inventory={inventory} openItemDetails={openItemDetails} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Items;
