import { createState, Store } from '@ngneat/elf'
import { withEntities } from '@ngneat/elf-entities'
import { AdminUser } from './admin.model'

const { state, config } = createState(withEntities<AdminUser>())

export const adminStore = new Store({ name: 'admin', state, config })
