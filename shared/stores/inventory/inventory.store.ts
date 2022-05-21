import { Store, createState, withProps } from '@ngneat/elf'
import { createInventory, Inventory } from './inventory.model'

const { state, config } = createState(withProps<Inventory>(createInventory({})))

export const inventoryStore = new Store({ name: 'inventory', state, config })
