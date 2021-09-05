import { QueryEntity } from '@datorama/akita';
import { ServerNotificationStore, ServerNotificationState, serverNotificationStore } from './server-notification.store';

export class ServerNotificationQuery extends QueryEntity<ServerNotificationState> {

  constructor(protected store: ServerNotificationStore) {
    super(store);
  }

}

export const serverNotificationQuery = new ServerNotificationQuery(serverNotificationStore);
