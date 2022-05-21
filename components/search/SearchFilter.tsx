import { useObservable } from '@ngneat/react-rxjs'
import Image from 'next/image'
import { FunctionComponent, useState } from 'react'
import {
  createDefaultSearchFilter,
  SearchFilterValues,
  SearchOrderValues,
} from '../../shared/handlers/search.handler'
import {
  inventoryValues,
  orderDirectionValues,
  tradeableOrderByValues,
} from '../../shared/static/filterValues'
import {
  itemCharacterValues,
  itemEventValues,
  itemSlotValues,
  tradeableItemRarityValues,
} from '../../shared/static/searchFilterValues'
import { inventoryStore } from '../../shared/stores/inventory/inventory.store'
import { themeStore } from '../../shared/stores/theme/theme.store'
import { userStore } from '../../shared/stores/user/user.store'
import ActionButton from '../styles/ActionButton'
import CheckboxInput from '../styles/CheckboxInput'
import Dropdown from '../styles/Dropdown'
import Loading from '../styles/Loading'
import ItemAutocomplete from './ItemAutocomplete'

interface Props {
  searchFilterValues: SearchFilterValues
  setSearchFilterValues: (searchFilterValues: SearchFilterValues) => void
  searchOrderValues: SearchOrderValues
  setSearchOrderValues: (searchOrderValues: SearchOrderValues) => void
  initialOpen: boolean
  search: () => void
  searchInProgress: boolean
}

const SearchFilter: FunctionComponent<Props> = ({
  searchFilterValues,
  setSearchFilterValues,
  searchOrderValues,
  setSearchOrderValues,
  initialOpen,
  search,
  searchInProgress,
}) => {
  const [theme] = useObservable(themeStore)

  const [user] = useObservable(userStore)
  const [inventory] = useObservable(inventoryStore)

  const [filterOpen, setFilterOpen] = useState(initialOpen)

  const clearFilter = () => {
    setSearchFilterValues(createDefaultSearchFilter())
  }

  return (
    <div className='px-4 mx-auto max-w-6xl sm:px-6 lg:px-8'>
      <div className='bg-wt-surface-dark rounded-lg'>
        <div
          className='flex justify-between p-2 hover:bg-wt-hover rounded-lg cursor-pointer'
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Image
            src={`/assets/svgs/expand_${filterOpen ? 'less' : 'more'}/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
            height='20px'
            width='20px'
            alt='Dropdown Item Icon'
          />
          <p className='font-semibold'>Filter</p>
          <Image
            src={`/assets/svgs/expand_${filterOpen ? 'less' : 'more'}/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
            height='20px'
            width='20px'
            alt='Dropdown Item Icon'
          />
        </div>
        {filterOpen && (
          <div className='flex flex-col items-center p-2'>
            <ItemAutocomplete
              item={searchFilterValues.item}
              setItem={(item) =>
                setSearchFilterValues({ ...searchFilterValues, item })
              }
            />
            {!searchFilterValues.item && (
              <>
                <div className='flex flex-wrap justify-center'>
                  <div className='m-1' style={{ width: '220px' }}>
                    <p className='mb-1'>Character</p>
                    <Dropdown
                      selectedValue={searchFilterValues.itemCharacter}
                      setValue={(itemCharacter) =>
                        setSearchFilterValues({
                          ...searchFilterValues,
                          itemCharacter,
                        })
                      }
                      values={itemCharacterValues}
                    />
                  </div>
                  <div className='m-1' style={{ width: '220px' }}>
                    <p className='mb-1'>Slot</p>
                    <Dropdown
                      selectedValue={searchFilterValues.itemSlot}
                      setValue={(itemSlot) =>
                        setSearchFilterValues({
                          ...searchFilterValues,
                          itemSlot,
                        })
                      }
                      values={itemSlotValues}
                    />
                  </div>
                  <div className='m-1' style={{ width: '220px' }}>
                    <p className='mb-1'>Event</p>
                    <Dropdown
                      selectedValue={searchFilterValues.itemEvent}
                      setValue={(itemEvent) =>
                        setSearchFilterValues({
                          ...searchFilterValues,
                          itemEvent,
                        })
                      }
                      values={itemEventValues}
                    />
                  </div>
                  <div className='m-1' style={{ width: '220px' }}>
                    <p className='mb-1'>Rarity</p>
                    <Dropdown
                      selectedValue={searchFilterValues.itemRarity}
                      setValue={(itemRarity) =>
                        setSearchFilterValues({
                          ...searchFilterValues,
                          itemRarity,
                        })
                      }
                      values={tradeableItemRarityValues}
                    />
                  </div>
                </div>
                {inventory.id && (
                  <>
                    <div className='m-1' style={{ width: '220px' }}>
                      <p className='mb-1'>Inventory</p>
                      <Dropdown
                        selectedValue={searchFilterValues.inventory}
                        setValue={(inventory) =>
                          setSearchFilterValues({
                            ...searchFilterValues,
                            inventory,
                          })
                        }
                        values={inventoryValues}
                      />
                    </div>
                  </>
                )}
                {user.id && (
                  <div className='m-2'>
                    <CheckboxInput
                      placeholder='Only Items on my wishlist'
                      value={searchFilterValues.wishlistOnly}
                      setValue={(wishlistOnly) =>
                        setSearchFilterValues({
                          ...searchFilterValues,
                          wishlistOnly,
                        })
                      }
                    />
                  </div>
                )}
                <div className='flex flex-wrap justify-center'>
                  <div className='m-1' style={{ width: '220px' }}>
                    <p className='mb-1'>Order by</p>
                    <Dropdown
                      selectedValue={searchOrderValues.orderBy}
                      setValue={(orderBy) =>
                        setSearchOrderValues({ ...searchOrderValues, orderBy })
                      }
                      values={tradeableOrderByValues}
                    />
                  </div>
                  <div className='m-1' style={{ width: '220px' }}>
                    <p className='mb-1'>Show in</p>
                    <Dropdown
                      selectedValue={searchOrderValues.orderDirection}
                      setValue={(orderDirection) =>
                        setSearchOrderValues({
                          ...searchOrderValues,
                          orderDirection,
                        })
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
              </>
            )}
            <div className='mt-2'>
              {(!searchInProgress && (
                <ActionButton type='success' onClick={() => search()}>
                  <Image
                    src='/assets/svgs/search.svg'
                    height='24px'
                    width='24px'
                    alt='Search'
                  />
                  Search
                </ActionButton>
              )) || <Loading text='Searching...' />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFilter
