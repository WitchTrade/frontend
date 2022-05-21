import { useObservable } from '@ngneat/react-rxjs'
import Image from 'next/image'
import { FunctionComponent, useState } from 'react'
import {
  createDefaultItemFilter,
  FILTER_TYPE,
  ignoreListItemSlotValues,
  inventoryValues,
  itemCharacterValues,
  itemEventValues,
  ItemFilterValues,
  itemRarityValues,
  itemSlotValues,
  orderByValues,
  orderDirectionValues,
  tradeableItemRarityValues,
  tradeableOrderByValues,
} from '../../shared/static/filterValues'
import { inventoryStore } from '../../shared/stores/inventory/inventory.store'
import { themeStore } from '../../shared/stores/theme/theme.store'
import ActionButton from '../styles/ActionButton'
import CheckboxInput from '../styles/CheckboxInput'
import Dropdown from '../styles/Dropdown'
import MultiDropdown, { updateMultiSelectValue } from '../styles/MultiDropdown'
import TextInput from '../styles/TextInput'

interface Props {
  itemFilterValues: ItemFilterValues
  setItemFilterValues: (itemFilterValues: ItemFilterValues) => void
  initialOpen: boolean
  type: FILTER_TYPE
}

const ItemFilter: FunctionComponent<Props> = ({
  itemFilterValues,
  setItemFilterValues,
  initialOpen,
  type,
}) => {
  const [theme] = useObservable(themeStore)

  const [inventory] = useObservable(inventoryStore)

  const [filterOpen, setFilterOpen] = useState(initialOpen)

  const clearFilter = () => {
    setItemFilterValues(createDefaultItemFilter(type))
  }

  return (
    <div className='px-4 mx-auto max-w-6xl sm:px-6 lg:px-8'>
      <div className='bg-wt-surface-dark rounded-lg'>
        <div
          className={`flex p-2 rounded-lg ${
            type !== FILTER_TYPE.NEWTRADE && type !== FILTER_TYPE.IGNORELIST
              ? 'justify-between cursor-pointer hover:bg-wt-hover'
              : 'justify-center'
          }`}
          onClick={() =>
            type !== FILTER_TYPE.NEWTRADE && type !== FILTER_TYPE.IGNORELIST
              ? setFilterOpen(!filterOpen)
              : undefined
          }
        >
          {type !== FILTER_TYPE.NEWTRADE && type !== FILTER_TYPE.IGNORELIST && (
            <Image
              src={`/assets/svgs/expand_${filterOpen ? 'less' : 'more'}/${
                theme?.type === 'light' ? 'black' : 'white'
              }.svg`}
              height='20px'
              width='20px'
              alt='Dropdown Item Icon'
            />
          )}
          <p className='font-semibold'>Filter</p>
          {type !== FILTER_TYPE.NEWTRADE && type !== FILTER_TYPE.IGNORELIST && (
            <Image
              src={`/assets/svgs/expand_${filterOpen ? 'less' : 'more'}/${
                theme?.type === 'light' ? 'black' : 'white'
              }.svg`}
              height='20px'
              width='20px'
              alt='Dropdown Item Icon'
            />
          )}
        </div>
        {filterOpen && (
          <div className='flex flex-col items-center p-2'>
            <TextInput
              placeholder='Search for an item'
              required={false}
              type='text'
              value={itemFilterValues.searchString}
              setValue={(searchString) =>
                setItemFilterValues({ ...itemFilterValues, searchString })
              }
              clearOption={true}
            />
            <div className='flex flex-wrap justify-center'>
              <div className='m-1' style={{ width: '220px' }}>
                <p className='mb-1'>Character</p>
                <MultiDropdown
                  selectedValues={itemFilterValues.itemCharacter}
                  updateValue={(newCharacter) =>
                    setItemFilterValues({
                      ...itemFilterValues,
                      itemCharacter: updateMultiSelectValue(
                        itemFilterValues.itemCharacter,
                        newCharacter,
                        itemCharacterValues
                      ),
                    })
                  }
                  values={itemCharacterValues}
                  selectAll={() =>
                    setItemFilterValues({
                      ...itemFilterValues,
                      itemCharacter: itemCharacterValues,
                    })
                  }
                  clear={() =>
                    setItemFilterValues({
                      ...itemFilterValues,
                      itemCharacter: [],
                    })
                  }
                />
              </div>
              <div className='m-1' style={{ width: '220px' }}>
                <p className='mb-1'>Slot</p>
                <MultiDropdown
                  selectedValues={itemFilterValues.itemSlot}
                  updateValue={(newSlot) =>
                    setItemFilterValues({
                      ...itemFilterValues,
                      itemSlot: updateMultiSelectValue(
                        itemFilterValues.itemSlot,
                        newSlot,
                        type === FILTER_TYPE.IGNORELIST
                          ? ignoreListItemSlotValues
                          : itemSlotValues
                      ),
                    })
                  }
                  values={
                    type === FILTER_TYPE.IGNORELIST
                      ? ignoreListItemSlotValues
                      : itemSlotValues
                  }
                  selectAll={() =>
                    setItemFilterValues({
                      ...itemFilterValues,
                      itemSlot:
                        type === FILTER_TYPE.IGNORELIST
                          ? ignoreListItemSlotValues
                          : itemSlotValues,
                    })
                  }
                  clear={() =>
                    setItemFilterValues({ ...itemFilterValues, itemSlot: [] })
                  }
                />
              </div>
              <div className='m-1' style={{ width: '220px' }}>
                <p className='mb-1'>Event</p>
                <MultiDropdown
                  selectedValues={itemFilterValues.itemEvent}
                  updateValue={(newEvent) =>
                    setItemFilterValues({
                      ...itemFilterValues,
                      itemEvent: updateMultiSelectValue(
                        itemFilterValues.itemEvent,
                        newEvent,
                        itemEventValues
                      ),
                    })
                  }
                  values={itemEventValues}
                  selectAll={() =>
                    setItemFilterValues({
                      ...itemFilterValues,
                      itemEvent: itemEventValues,
                    })
                  }
                  clear={() =>
                    setItemFilterValues({ ...itemFilterValues, itemEvent: [] })
                  }
                />
              </div>
              <div className='m-1' style={{ width: '220px' }}>
                <p className='mb-1'>Rarity</p>
                <MultiDropdown
                  selectedValues={itemFilterValues.itemRarity}
                  updateValue={(newRarity) =>
                    setItemFilterValues({
                      ...itemFilterValues,
                      itemRarity: updateMultiSelectValue(
                        itemFilterValues.itemRarity,
                        newRarity,
                        type === FILTER_TYPE.ITEM
                          ? itemRarityValues
                          : tradeableItemRarityValues
                      ),
                    })
                  }
                  values={
                    type === FILTER_TYPE.ITEM
                      ? itemRarityValues
                      : tradeableItemRarityValues
                  }
                  selectAll={() =>
                    setItemFilterValues({
                      ...itemFilterValues,
                      itemRarity:
                        type === FILTER_TYPE.ITEM
                          ? itemRarityValues
                          : tradeableItemRarityValues,
                    })
                  }
                  clear={() =>
                    setItemFilterValues({ ...itemFilterValues, itemRarity: [] })
                  }
                />
              </div>
            </div>
            <div className='flex flex-wrap justify-center'>
              {type === FILTER_TYPE.ITEM && (
                <div className='m-2'>
                  <CheckboxInput
                    placeholder='Show tradeable items only'
                    value={itemFilterValues.tradeableOnly}
                    setValue={(tradeableOnly) =>
                      setItemFilterValues({
                        ...itemFilterValues,
                        tradeableOnly,
                      })
                    }
                  />
                </div>
              )}
              <div className='my-2'>
                <CheckboxInput
                  placeholder='Show new items only'
                  value={itemFilterValues.newOnly}
                  setValue={(newOnly) =>
                    setItemFilterValues({ ...itemFilterValues, newOnly })
                  }
                />
              </div>
            </div>
            {inventory.id && (
              <>
                <div className='m-1' style={{ width: '220px' }}>
                  <p className='mb-1'>Inventory</p>
                  <Dropdown
                    selectedValue={itemFilterValues.inventory}
                    setValue={(inventory) =>
                      setItemFilterValues({ ...itemFilterValues, inventory })
                    }
                    values={inventoryValues}
                  />
                </div>
              </>
            )}
            <div className='flex flex-wrap justify-center'>
              <div className='m-1' style={{ width: '220px' }}>
                <p className='mb-1'>Order by</p>
                <Dropdown
                  selectedValue={itemFilterValues.orderBy}
                  setValue={(orderBy) =>
                    setItemFilterValues({ ...itemFilterValues, orderBy })
                  }
                  values={
                    type === FILTER_TYPE.ITEM
                      ? orderByValues
                      : tradeableOrderByValues
                  }
                />
              </div>
              <div className='m-1' style={{ width: '220px' }}>
                <p className='mb-1'>Show in</p>
                <Dropdown
                  selectedValue={itemFilterValues.orderDirection}
                  setValue={(orderDirection) =>
                    setItemFilterValues({ ...itemFilterValues, orderDirection })
                  }
                  values={orderDirectionValues}
                />
              </div>
            </div>
            <div className='mt-2'>
              <ActionButton type='cancel' onClick={clearFilter}>
                <Image
                  src='/assets/svgs/bin/white.svg'
                  height='24px'
                  width='24px'
                  alt='Clear filter'
                />
                Clear Filter
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemFilter
