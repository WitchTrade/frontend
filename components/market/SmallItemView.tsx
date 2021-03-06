import Image from 'next/image'
import { FunctionComponent } from 'react'
import { Inventory } from '../../shared/stores/inventory/inventory.model'
import { Item } from '../../shared/stores/items/item.model'

interface Props {
  item: Item
  inventory: Inventory
  selectItem: (item: Item) => void
  selected?: boolean
}

const SmallItemView: FunctionComponent<Props> = ({
  item,
  inventory,
  selectItem,
  selected,
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
      className={`flex w-28 flex-col justify-between rounded-lg bg-wt-surface-dark text-center m-1 shadow-md cursor-pointer transition duration-75 transform hover:scale-105${
        selected ? ' bg-wt-success' : ''
      }`}
      style={{ borderColor: `#${item.rarityColor}`, borderWidth: '4px' }}
      onClick={() => selectItem(item)}
    >
      <Image
        className='rounded-t-lg'
        src={item.iconUrl}
        height={112}
        width={112}
        alt={item.name}
      />
      <p className='p-1 text-xs break-words'>{item.name}</p>
      <div>
        {inventory.showInTrading && owned && (
          <p className='text-sm text-wt-light bg-wt-success-dark'>
            You own{' '}
            <span className='whitespace-nowrap'>
              {amount > 1
                ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + 'x'
                : `${amount}x`}
            </span>
          </p>
        )}
        {inventory.showInTrading && !owned && (
          <div className='flex justify-center items-center bg-wt-error-dark'>
            <p className='text-xs text-wt-light'>
              You don&apos;t own this item
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SmallItemView
