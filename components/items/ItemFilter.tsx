import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import useThemeProvider from '../../shared/providers/theme.provider';
import { createDefaultItemFilter, FILTER_TYPE, inventoryValues, itemCharacterValues, itemEventValues, ItemFilterValues, itemRarityValues, itemSlotValues, orderByValues, orderDirectionValues, tradeableItemRarityValues, tradeableOrderByValues } from '../../shared/handlers/filter.handler';
import Dropdown from '../styles/Dropdown';
import TextInput from '../styles/TextInput';
import CheckboxInput from '../styles/CheckboxInput';
import useInventoryProvider from '../../shared/providers/inventory.provider';
import ActionButton from '../styles/ActionButton';

interface Props {
  itemFilterValues: ItemFilterValues;
  setItemFilterValues: (itemFilterValues: ItemFilterValues) => void;
  initialOpen: boolean;
  type: FILTER_TYPE;
};

const ItemFilter: FunctionComponent<Props> = ({ itemFilterValues, setItemFilterValues, initialOpen, type }) => {
  const { theme } = useThemeProvider();

  const { inventory } = useInventoryProvider();

  const [filterOpen, setFilterOpen] = useState(initialOpen);

  const clearFilter = () => {
    setItemFilterValues(createDefaultItemFilter());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-wt-surface-dark rounded-lg">
        <div className={`flex p-2 rounded-lg ${type !== FILTER_TYPE.NEWTRADE ? 'justify-between cursor-pointer hover:bg-wt-hover' : 'justify-center'}`} onClick={() => type !== FILTER_TYPE.NEWTRADE ? setFilterOpen(!filterOpen) : undefined}>
          {type !== FILTER_TYPE.NEWTRADE &&
            <Image src={`/assets/svgs/expand_${filterOpen ? 'less' : 'more'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="20px" width="20px" alt="Dropdown Item Icon" />
          }
          <p className="font-semibold">Filter</p>
          {type !== FILTER_TYPE.NEWTRADE &&
            <Image src={`/assets/svgs/expand_${filterOpen ? 'less' : 'more'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="20px" width="20px" alt="Dropdown Item Icon" />
          }
        </div>
        {filterOpen &&
          <div className="flex flex-col items-center p-2">
            <TextInput placeholder="Search for an item" required={false} type="text" value={itemFilterValues.searchString} setValue={(searchString) => setItemFilterValues({ ...itemFilterValues, searchString })} clearOption={true} />
            <div className="flex flex-wrap justify-center">
              <div className="m-1" style={{ width: '220px' }}>
                <p className="mb-1">Character</p>
                <Dropdown selectedValue={itemFilterValues.itemCharacter} setValue={(itemCharacter) => setItemFilterValues({ ...itemFilterValues, itemCharacter })} values={itemCharacterValues} />
              </div>
              <div className="m-1" style={{ width: '220px' }}>
                <p className="mb-1">Slot</p>
                <Dropdown selectedValue={itemFilterValues.itemSlot} setValue={(itemSlot) => setItemFilterValues({ ...itemFilterValues, itemSlot })} values={itemSlotValues} />
              </div>
              <div className="m-1" style={{ width: '220px' }}>
                <p className="mb-1">Event</p>
                <Dropdown selectedValue={itemFilterValues.itemEvent} setValue={(itemEvent) => setItemFilterValues({ ...itemFilterValues, itemEvent })} values={itemEventValues} />
              </div>
              <div className="m-1" style={{ width: '220px' }}>
                <p className="mb-1">Rarity</p>
                <Dropdown selectedValue={itemFilterValues.itemRarity} setValue={(itemRarity) => setItemFilterValues({ ...itemFilterValues, itemRarity })} values={type === FILTER_TYPE.ITEM ? itemRarityValues : tradeableItemRarityValues} />
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              {type === FILTER_TYPE.ITEM &&
                <div className="m-2">
                  <CheckboxInput placeholder="Show tradeable items only" value={itemFilterValues.tradeableOnly} setValue={(tradeableOnly) => setItemFilterValues({ ...itemFilterValues, tradeableOnly })} />
                </div>
              }
              <div className="my-2">
                <CheckboxInput placeholder="Show new items only" value={itemFilterValues.newOnly} setValue={(newOnly) => setItemFilterValues({ ...itemFilterValues, newOnly })} />
              </div>
            </div>
            {inventory.id &&
              <>
                <div className="m-1" style={{ width: '220px' }}>
                  <p className="mb-1">Inventory</p>
                  <Dropdown selectedValue={itemFilterValues.inventory} setValue={(inventory) => setItemFilterValues({ ...itemFilterValues, inventory })} values={inventoryValues} />
                </div>
                <div className="m-2">
                  <CheckboxInput placeholder="Show duplicates only" value={itemFilterValues.duplicatesOnly} setValue={(duplicatesOnly) => setItemFilterValues({ ...itemFilterValues, duplicatesOnly })} />
                </div>
              </>
            }
            <div className="flex flex-wrap justify-center">
              <div className="m-1" style={{ width: '220px' }}>
                <p className="mb-1">Order by</p>
                <Dropdown selectedValue={itemFilterValues.orderBy} setValue={(orderBy) => setItemFilterValues({ ...itemFilterValues, orderBy })} values={type === FILTER_TYPE.ITEM ? orderByValues : tradeableOrderByValues} />
              </div>
              <div className="m-1" style={{ width: '220px' }}>
                <p className="mb-1">Show in</p>
                <Dropdown selectedValue={itemFilterValues.orderDirection} setValue={(orderDirection) => setItemFilterValues({ ...itemFilterValues, orderDirection })} values={orderDirectionValues} />
              </div>
            </div>
            <div className="mt-2">
              <ActionButton type="cancel" onClick={clearFilter}>
                <Image src="/assets/svgs/bin/white.svg" height="24px" width="24px" alt="Clear filter" />
                Clear Filter
              </ActionButton>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ItemFilter;
