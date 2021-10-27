import { useEffect, useState } from 'react';
import { createSyncSettings, SyncSettings } from '../stores/user/syncSettings.model';
import { syncSettingsQuery } from '../stores/user/syncSettings.query';

const useSyncSettingsProvider = () => {
  const [syncSettings, setSyncSettings] = useState<SyncSettings>(createSyncSettings({}));

  useEffect(() => {
    const syncSettingsSub = syncSettingsQuery.select().subscribe(setSyncSettings);

    return (() => {
      syncSettingsSub.unsubscribe();
    });
  }, []);

  return { syncSettings };
};

export default useSyncSettingsProvider;
