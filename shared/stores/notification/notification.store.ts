import { createState, Store } from '@ngneat/elf'
import { withEntities } from '@ngneat/elf-entities'
import { Notification } from './notification.model'

const { state, config } = createState(withEntities<Notification>())

export const notificationStore = new Store({
  name: 'notification',
  state,
  config,
})
