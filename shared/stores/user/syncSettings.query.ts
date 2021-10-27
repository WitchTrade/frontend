import { Query } from '@datorama/akita';
import { SyncSettings } from './syncSettings.model';
import { syncSettingsStore, SyncSettingsStore } from './syncSettings.store';

export class SyncSettingsQuery extends Query<SyncSettings> {

  constructor(protected store: SyncSettingsStore) {
    super(store);
  }

}

export const syncSettingsQuery = new SyncSettingsQuery(syncSettingsStore);
