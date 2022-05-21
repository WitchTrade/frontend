import { createState, Store } from '@ngneat/elf'
import { withEntities } from '@ngneat/elf-entities'
import { ServerNotification } from './server-notification.model'

const { state, config } = createState(withEntities<ServerNotification>())

export const serverNotificationStore = new Store({
  name: 'serverNotification',
  state,
  config,
})
