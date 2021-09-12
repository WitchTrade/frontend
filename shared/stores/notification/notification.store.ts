import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Notification } from './notification.model';

export interface NotificationState extends EntityState<Notification> { }

@StoreConfig({
  name: 'notification',
  idKey: 'id'
})
export class NotificationStore extends EntityStore<NotificationState> {

  constructor() {
    super();
  }

}

export const notificationStore = new NotificationStore();
