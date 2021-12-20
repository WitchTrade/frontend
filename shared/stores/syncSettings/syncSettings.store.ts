import { Store, createState, withProps } from '@ngneat/elf';
import { createSyncSettings, SyncSettings } from './syncSettings.model';

const { state, config } = createState(withProps<SyncSettings>(createSyncSettings({})));

export const syncSettingsStore = new Store({ name: 'syncSettings', state, config });
