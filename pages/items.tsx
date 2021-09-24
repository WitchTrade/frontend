import type { NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomHeader from '../components/core/CustomHeader';
import ItemFilter from '../components/items/ItemFilter';
import ItemView from '../components/items/ItemView';
import PageHeader from '../components/styles/PageHeader';
import ItemsHandler from '../shared/handlers/items.handler';

const Items: NextPage = () => {
    const {
        inventory,
        loadedItems,
        loadMoreItems,
        hasMoreItems,
        itemFilterValues,
        setItemFilterValues
    } = ItemsHandler();

    return (
        <div>
            <CustomHeader
                title="WitchTrade | Items"
                description="Witch It item list."
                url="https://witchtrade.org/items"
            />
            <PageHeader title="Items" />
            <ItemFilter itemFilterValues={itemFilterValues} setItemFilterValues={setItemFilterValues}/>
            <div className="flex flex-wrap justify-center mx-6">
                <InfiniteScroll
                    className="flex flex-row flex-wrap justify-center py-2 h-full"
                    dataLength={loadedItems.length}
                    next={loadMoreItems}
                    hasMore={hasMoreItems()}
                    loader={<p></p>}
                >
                    {loadedItems.map((item, i) => (
                        <ItemView key={i} item={item} inventory={inventory} />
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Items;
