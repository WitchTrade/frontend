import { Fragment, FunctionComponent, useEffect } from 'react';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemAutocompleteHandler from '../../shared/handlers/itemAutocomplete.handler';
import { Item } from '../../shared/stores/items/item.model';
import TextInput from '../styles/TextInput';
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick';
import ActionButton from '../styles/ActionButton';

interface Props {
  item?: Item;
  setItem: (item: Item | undefined) => void;
};

const ItemAutocomplete: FunctionComponent<Props> = ({ item, setItem }) => {


  const {
    loadedItems,
    searchValue,
    setSearchValue,
    loadMoreItems,
    hasMoreItems,
    resetLoadedItems,
    foundItemRefs,
    keyNavigation,
    handleKeyDown
  } = ItemAutocompleteHandler(setItem);

  const { show, nodeRef, toggleRef } = useDetectOutsideClick(false, true, false);


  useEffect(() => {
    if (show) {
      resetLoadedItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <>
      {item &&
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <Image className="rounded-md" src={item.iconUrl} height={60} width={60} alt={item.name} />
            <p className="ml-1">
              {item.name}
            </p>
          </div>
          <div className="mt-2">
            <ActionButton type="cancel" onClick={() => setItem(undefined)}>
              <Image src="/assets/svgs/bin/white.svg" height="24px" width="24px" alt="Clear filter" />
              Remove Item
            </ActionButton>
          </div>
        </div>
        ||
        <div className="relative mt-1">
          <div ref={toggleRef}>
            <TextInput type="text" placeholder="Select item" required={false} value={searchValue} setValue={setSearchValue} onKeyDown={handleKeyDown} />
          </div>
          <div ref={nodeRef}>
            <Transition
              show={show}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="absolute w-full mt-1 overflow-auto text-base bg-wt-surface-dark rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30"
                id="itemScroll"
              >
                <div className="h-full">
                  <InfiniteScroll
                    className="flex flex-row flex-wrap justify-center py-2 h-full px-1"
                    dataLength={loadedItems.length}
                    next={loadMoreItems}
                    hasMore={hasMoreItems()}
                    loader={<p></p>}
                    scrollableTarget="itemScroll"
                  >
                    {loadedItems.map((value, i) => (
                      <div
                        key={i}
                        className={`relative rounded-md hover:bg-wt-hover cursor-pointer w-full h-11 p-1 ${keyNavigation.item?.id === value.id ? 'bg-wt-hover' : ''}`}
                        onClick={() => setItem(value)}
                        ref={foundItemRefs[i]}
                      >
                        <div className="flex items-center">
                          <Image className="rounded-md" src={value.iconUrl} height={35} width={35} alt={value.name} />
                          <p className="ml-1" style={{ maxWidth: '189px' }}>
                            {value.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      }
    </>
  );
};

export default ItemAutocomplete;
