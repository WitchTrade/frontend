import { Store, StoreConfig } from '@datorama/akita';
import { SyncSettings } from './syncSettings.model';

@StoreConfig({
  name: 'syncSettings',
  resettable: true
})
export class SyncSettingsStore extends Store<SyncSettings> {

  constructor() {
    super({});
  }

}

export const syncSettingsStore = new SyncSettingsStore();
