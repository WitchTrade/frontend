import Image from 'next/image'
import { FunctionComponent } from 'react'
import { Inventory } from '../../shared/stores/inventory/inventory.model'
import { Item } from '../../shared/stores/items/item.model'

interface Props {
  item: Item
  inventory: Inventory
  openItemDetails: (item: Item) => void
}

const ItemView: FunctionComponent<Props> = ({
  item,
  inventory,
  openItemDetails,
}) => {
  const owned = inventory.inventoryItems.some((ii) => ii.item.id === item.id)
  const inventoryItem = inventory.inventoryItems.find(
    (ii) => ii.item.id === item.id
  )
  let amount = 0
  if (inventoryItem) {
    amount = inventoryItem.amount
  }

  return (
    <div
      className='flex flex-col justify-between m-1 w-28 text-center bg-wt-surface-dark rounded-lg shadow-md transition duration-75 hover:scale-105 cursor-pointer md:w-36'
      style={{ borderColor: `#${item.rarityColor}`, borderWidth: '6px' }}
      onClick={() => openItemDetails(item)}
    >
      <Image
        className='rounded-t-lg'
        src={item.iconUrl}
        height={132}
        width={132}
        alt={item.name}
      />
      <p className='p-1 text-sm font-semibold break-words'>{item.name}</p>
      <div>
        {item.new && <p className='text-sm text-wt-light bg-wt-success'>New</p>}
        {!item.tradeable && (
          <p className='text-sm text-wt-light bg-wt-error'>Not tradeable</p>
        )}
        {owned && (
          <p className='text-sm text-wt-text bg-wt-accent'>
            Owned{' '}
            <span className='whitespace-nowrap'>
              {amount > 1
                ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + 'x'
                : ''}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default ItemView
