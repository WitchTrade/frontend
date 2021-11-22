import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ServerNotification } from './server-notification.model';

export interface ServerNotificationState extends EntityState<ServerNotification> { }

@StoreConfig({
  name: 'serverNotification',
  idKey: 'id',
  resettable: true
})
export class ServerNotificationStore extends EntityStore<ServerNotificationState> {

  constructor() {
    super();
  }

}

export const serverNotificationStore = new ServerNotificationStore();
