import { selectAllEntities } from '@ngneat/elf-entities'
import { useObservable } from '@ngneat/react-rxjs'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { FunctionComponent, useEffect, useState } from 'react'
import { SearchOffer, SEARCH_VIEW } from '../../shared/handlers/search.handler'
import {
  itemCharacterValues,
  itemEventValues,
  itemSlotValues,
} from '../../shared/static/filterValues'
import { Inventory } from '../../shared/stores/inventory/inventory.model'
import { Item } from '../../shared/stores/items/item.model'
import { itemsStore } from '../../shared/stores/items/items.store'
import { pricesStore } from '../../shared/stores/prices/prices.store'
import { searchService } from '../../shared/stores/search/search.service'
import SearchTradeView from '../search/SearchTradeView'
import ActionButton from '../styles/ActionButton'
import Chip from '../styles/Chip'
import Divider from '../styles/Divider'
import Loading from '../styles/Loading'
import WTDialog from '../styles/WTDialog'

interface Props {
  dialogOpen: boolean
  setDialogOpen: (dialogOpen: boolean) => void
  item?: Item
  inventory: Inventory
  capitalizeFirstLetter: (text: string) => string
}

const ItemDetailDialog: FunctionComponent<Props> = ({
  dialogOpen,
  setDialogOpen,
  item,
  inventory,
  capitalizeFirstLetter,
}) => {
  const router = useRouter()
  const [items] = useObservable(itemsStore.pipe(selectAllEntities()))
  const [prices] = useObservable(pricesStore.pipe(selectAllEntities()))

  const [searchOffer, setSearchOffer] = useState<SearchOffer | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSearchOffer(undefined)
    if (dialogOpen && item && item.tradeable) {
      setLoading(true)
      searchService
        .search({
          itemId: item.id,
          character: 'any',
          slot: 'any',
          event: 'any',
          rarity: 'any',
          inventoryType: 'any',
          onlyWishlistItems: false,
        })
        .subscribe(async (res) => {
          if (res.ok) {
            const result = await res.json()
            const itemoffer = result.offers.find(
              (o: SearchOffer) => o.id === item.id
            )
            if (itemoffer) {
              setSearchOffer(itemoffer)
            }
          }
          setLoading(false)
        })
    }
  }, [dialogOpen, item])

  useEffect(() => {
    if (dialogOpen) {
      setDialogOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <WTDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      closeOnOutsideClick={true}
    >
      {item && (
        <div
          className='inline-block overflow-auto py-6 px-1 max-w-lg text-center align-middle bg-wt-surface-dark rounded-2xl border-4 shadow-xl transition-all'
          style={{
            borderColor: `#${item.rarityColor}`,
            borderWidth: '6px',
            width: '512px',
          }}
        >
          <div className='flex flex-col justify-between h-full'>
            <p className='mb-4 text-2xl font-bold'>{item.name}</p>
            <div className='self-center w-80 h-80'>
              <Image
                className='rounded-t-lg'
                src={item.iconUrl}
                height={320}
                width={320}
                quality={100}
                alt={item.name}
              />
            </div>
            <p className='my-2'>
              {item.description ? item.description : 'No description'}
            </p>
            <div className='my-2 mx-5'>
              <Divider />
            </div>
            <div className='flex flex-wrap justify-center'>
              {(item.tradeable && <Chip title='Tradable' text='Yes' />) || (
                <Chip title='Tradable' text='No' />
              )}
              <Chip
                title='Rarity'
                text={capitalizeFirstLetter(item.tagRarity)}
              />
              {item.tagCharacter && (
                <Chip
                  title='Character'
                  text={
                    itemCharacterValues.find(
                      (iev) => iev.key === item.tagCharacter
                    )?.displayName
                  }
                />
              )}
              <Chip
                title='Slot'
                text={
                  itemSlotValues.find((iev) => iev.key === item.tagSlot)
                    ?.displayName
                }
              />
              {item.tagEvent && (
                <Chip
                  title='Event'
                  text={
                    itemEventValues.find((iev) => iev.key === item.tagEvent)
                      ?.displayName
                  }
                />
              )}
            </div>
            {(searchOffer && item.tradeable && (
              <div className='flex justify-center mt-2'>
                <SearchTradeView
                  trade={searchOffer}
                  items={items}
                  prices={prices}
                  type={SEARCH_VIEW.OFFERS}
                  inventory={inventory}
                />
              </div>
            )) ||
              (!loading && item.tradeable && (
                <div className='flex justify-center mt-2'>
                  <p>
                    No offers for{' '}
                    <span className='text-wt-accent'>{item.name}</span> found.
                  </p>
                </div>
              )) ||
              (item.tradeable && <Loading text='Loading offers' />)}
            <div className='self-center mt-4'>
              <ActionButton type='info' onClick={() => setDialogOpen(false)}>
                Close
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </WTDialog>
  )
}

export default ItemDetailDialog
