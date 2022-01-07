import { FunctionComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterHandler from '../../shared/handlers/filter.handler';
import { FILTER_TYPE } from '../../shared/static/filterValues';
import { Item } from '../../shared/stores/items/item.model';
import ItemFilter from '../items/ItemFilter';
import ActionButton from '../styles/ActionButton';
import WTDialog from '../styles/WTDialog';
import SmallItemView from './SmallItemView';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  ignoreList: Item[];
  setIgnoreList: (ignoreList: Item[]) => void;
};

const IgnoreListDialog: FunctionComponent<Props> = ({ dialogOpen, setDialogOpen, ignoreList, setIgnoreList }) => {

  const {
    inventory,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues
  } = FilterHandler(FILTER_TYPE.IGNORELIST, 100);

  return (
    <WTDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} closeOnOutsideClick={true}>
      <div className="inline-block max-w-4xl p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-success">
        <p className="text-center text-xl">Select items to ignore when syncing offers</p>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 overflow-auto my-1 border border-wt-accent rounded-lg" style={{ maxHeight: '384px' }}>
            <ItemFilter itemFilterValues={itemFilterValues} setItemFilterValues={setItemFilterValues} initialOpen={true} type={FILTER_TYPE.IGNORELIST} />
          </div>
          <div className="w-full sm:w-1/2">
            <InfiniteScroll
              className="flex flex-row flex-wrap justify-center py-2 h-full"
              dataLength={loadedItems.length}
              next={loadMoreItems}
              hasMore={hasMoreItems()}
              loader={<p></p>}
              height="full"
              style={{ maxHeight: '384px' }}
            >
              {loadedItems.map((item, i) => (
                <SmallItemView key={i} item={item} inventory={inventory} selectItem={(selectedItem: Item) => {
                  const index = ignoreList.findIndex(il => il.id === selectedItem.id);
                  if (index >= 0) {
                    ignoreList.splice(index, 1);
                    setIgnoreList(ignoreList);
                  } else {
                    setIgnoreList([...ignoreList, selectedItem]);
                  }
                }} selected={ignoreList.some(il => il.id === item.id)} />
              ))}
            </InfiniteScroll>
          </div>
        </div>
        <p className="text-center">Selected items</p>
        {ignoreList.length === 0 &&
          <p className="text-center text-sm italic">No items selected</p>
        }
        <div className="flex flex-row flex-wrap justify-center py-2 max-h-80 overflow-auto">
          {ignoreList.map((item, i) => (
            <SmallItemView key={i} item={item} inventory={inventory} selectItem={(selectedItem: Item) => {
              const index = ignoreList.findIndex(il => il.id === selectedItem.id);
              ignoreList.splice(index, 1);
              setIgnoreList(ignoreList);
            }} selected={true} />
          ))}
        </div>
        {ignoreList.length >= 4 &&
          <div className="flex justify-center my-2">
            <ActionButton type="cancel" onClick={() => setIgnoreList([])}>
              Remove all
            </ActionButton>
          </div>
        }
        <div className="flex justify-center">
          <ActionButton type="info" onClick={() => setDialogOpen(false)}>
            Done
          </ActionButton>
        </div>
      </div>
    </WTDialog>
  );
};

export default IgnoreListDialog;
