import { useEffect, useState } from 'react';
import { PreviewMarket } from '../stores/markets/market.model';

const ProfilesHandler = (profiles: PreviewMarket[]) => {

  const [loadedProfiles, setLoadedProfiles] = useState<PreviewMarket[]>([]);

  useEffect(() => {
    setLoadedProfiles(profiles.slice(0, 50));
  }, [profiles]);

  const loadMoreProfiles = () => {
    setLoadedProfiles(profiles.slice(0, loadedProfiles.length + 50));
  };

  const hasMoreProfiles = () => {
    return profiles.length > loadedProfiles.length;
  };

  return {
    loadedProfiles,
    loadMoreProfiles,
    hasMoreProfiles
  };
};

export default ProfilesHandler;
