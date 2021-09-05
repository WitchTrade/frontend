import { QueryEntity } from '@datorama/akita';
import { NotificationStore, NotificationState, notificationStore } from './notification.store';

export class NotificationQuery extends QueryEntity<NotificationState> {

  constructor(protected store: NotificationStore) {
    super(store);
  }

}

export const notificationQuery = new NotificationQuery(notificationStore);
