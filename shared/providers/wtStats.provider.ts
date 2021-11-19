import { useEffect, useState } from 'react';

const useWTStatsProvider = () => {
  const [wtStats, setWTStats] = useState({ users: 0, offers: 0 });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    const statsFromServer = await fetchServerStats();

    setWTStats(statsFromServer);
  };

  const fetchServerStats = async (): Promise<any> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/stats/witchtrade`);
    const data = await res.json();
    return data;
  };

  return { wtStats };
};

export default useWTStatsProvider;
