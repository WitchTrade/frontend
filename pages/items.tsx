import type { NextPage } from 'next';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomHeader from '../components/core/CustomHeader';
import ItemFilter from '../components/items/ItemFilter';
import ItemView from '../components/items/ItemView';
import ActionButton from '../components/styles/ActionButton';
import PageHeader from '../components/styles/PageHeader';
import WTDialog from '../components/styles/WTDialog';
import ItemsHandler from '../shared/handlers/items.handler';

const Items: NextPage = () => {
    const {
        inventory,
        loadedItems,
        loadMoreItems,
        hasMoreItems,
        itemFilterValues,
        setItemFilterValues,
        dialogOpen,
        setDialogOpen,
        selectedItem,
        openItemDetails
    } = ItemsHandler();

    return (
        <div>
            <WTDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} closeOnOutsideClick={true}>
                {selectedItem &&
                    <div className="inline-block max-w-lg p-6 overflow-auto text-center align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4" style={{ borderColor: `#${selectedItem.nameColor}`, borderWidth: '6px' }}>
                        <div className="h-full flex flex-col justify-between">
                            <p className="text-2xl font-bold mb-4">{selectedItem.name}</p>
                            <div className="w-80 h-80 self-center">
                                <Image className="rounded-t-lg" src={selectedItem.iconUrl} height={320} width={320} alt={selectedItem.name} />
                            </div>
                            <p className="my-2">{selectedItem.description ? selectedItem.description : 'No description'}</p>
                            <div className="self-center">
                                <ActionButton type="neutral-enabled" onClick={() => setDialogOpen(false)}>
                                    Close
                                </ActionButton>
                            </div>
                        </div>
                    </div>
                }
            </WTDialog>
            <CustomHeader
                title="WitchTrade | Items"
                description="Witch It item list."
                url="https://witchtrade.org/items"
            />
            <PageHeader title="Items" />
            <ItemFilter itemFilterValues={itemFilterValues} setItemFilterValues={setItemFilterValues} />
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
