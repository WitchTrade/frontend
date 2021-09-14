import { useEffect, useState } from 'react';
import { Gameserver } from '../models/gameserver.model';

const useGameserverHandler = () => {
    const [euServers, setEuServers] = useState<Gameserver[]>([]);
    const [hkServers, setHkServers] = useState<Gameserver[]>([]);
    const [usServers, setUsServers] = useState<Gameserver[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getGameServers();
    }, []);

    const getGameServers = async () => {
        setLoading(true);

        const gameServersFormServer = await fetchGameServers();

        setLoading(false);

        setEuServers(gameServersFormServer.filter(server => server.name.startsWith('EU')));
        setHkServers(gameServersFormServer.filter(server => server.name.startsWith('HK')));
        setUsServers(gameServersFormServer.filter(server => server.name.startsWith('US')));
    };

    const fetchGameServers = async (): Promise<Gameserver[]> => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/gameservers`);
        const data = await res.json();
        return data;
    };

    return {
        euServers,
        hkServers,
        usServers,
        loading,
        getGameServers
    };
};

export default useGameserverHandler;