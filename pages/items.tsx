import type { NextPage } from 'next';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomHeader from '../components/core/CustomHeader';
import ItemFilter from '../components/items/ItemFilter';
import ItemView from '../components/items/ItemView';
import ActionButton from '../components/styles/ActionButton';
import Chip from '../components/styles/Chip';
import Divider from '../components/styles/Divider';
import PageHeader from '../components/styles/PageHeader';
import WTDialog from '../components/styles/WTDialog';
import ItemsHandler, { itemCharacterValues, itemEventValues, itemSlotValues } from '../shared/handlers/items.handler';

const Items: NextPage = () => {
  const {
    inventory,
    filteredItems,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues,
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails,
    capitalizeFirstLetter
  } = ItemsHandler();

  return (
    <div>
      <WTDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} closeOnOutsideClick={true}>
        {selectedItem &&
          <div className="inline-block max-w-lg p-6 overflow-auto text-center align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4" style={{ borderColor: `#${selectedItem.rarityColor}`, borderWidth: '6px', width: '512px' }}>
            <div className="h-full flex flex-col justify-between">
              <p className="text-2xl font-bold mb-4">{selectedItem.name}</p>
              <div className="w-80 h-80 self-center">
                <Image className="rounded-t-lg" src={selectedItem.iconUrl} height={320} width={320} quality={100} alt={selectedItem.name} />
              </div>
              <p className="my-2">{selectedItem.description ? selectedItem.description : 'No description'}</p>
              <div className="mx-5 my-2">
                <Divider />
              </div>
              <div className="flex flex-wrap justify-center">
                {selectedItem.tradeable &&
                  <Chip title="Tradable" text="Yes" />
                  ||
                  <Chip title="Tradable" text="No" />
                }
                <Chip title="Rarity" text={capitalizeFirstLetter(selectedItem.tagRarity)} />
                {selectedItem.tagCharacter &&
                  <Chip title="Character" text={itemCharacterValues.find(iev => iev.key === selectedItem.tagCharacter)?.displayName} />
                }
                <Chip title="Slot" text={itemSlotValues.find(iev => iev.key === selectedItem.tagSlot)?.displayName} />
                {selectedItem.tagEvent &&
                  <Chip title="Event" text={itemEventValues.find(iev => iev.key === selectedItem.tagEvent)?.displayName} />
                }
              </div>
              <div className="self-center mt-4">
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
      <p className="text-center mt-2"><span className="text-wt-accent font-bold">{filteredItems.length}</span> item{filteredItems.length === 1 ? '' : 's'} filtered</p>
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
