import { useState } from 'react'
import { Item } from '../stores/items/item.model'

const ItemsHandler = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item>()

  const openItemDetails = (item: Item) => {
    setSelectedItem(item)
    setDialogOpen(true)
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return {
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails,
    capitalizeFirstLetter,
  }
}

export default ItemsHandler
