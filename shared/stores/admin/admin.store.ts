import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { AdminUser } from './admin.model';

export interface AdminState extends EntityState<AdminUser> { }

@StoreConfig({
  name: 'admin',
  idKey: 'id'
})
export class AdminStore extends EntityStore<AdminState> {

  constructor() {
    super();
  }

}

export const adminStore = new AdminStore();
