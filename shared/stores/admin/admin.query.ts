import { QueryEntity } from '@datorama/akita';
import { AdminState, adminStore, AdminStore } from './admin.store';

export class AdminQuery extends QueryEntity<AdminState> {

  constructor(protected store: AdminStore) {
    super(store);
  }
}

export const adminQuery = new AdminQuery(adminStore);
