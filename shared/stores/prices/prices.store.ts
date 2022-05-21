import { createState, Store } from '@ngneat/elf'
import { withEntities } from '@ngneat/elf-entities'
import { Price } from './price.model'

const { state, config } = createState(withEntities<Price>())

export const pricesStore = new Store({ name: 'prices', state, config })
