import type { NextPage } from 'next';
import CustomHeader from '../components/core/CustomHeader';
import Region from '../components/gameservers/region';
import ActionButton from '../components/styles/ActionButton';
import useGameserverHandler from '../shared/handlers/gameserver.handler';

const Gameservers: NextPage = () => {
    const {
        euServers,
        hkServers,
        usServers,
        loading,
        getGameServers
    } = useGameserverHandler();

    return (
        <div>
            <CustomHeader
                title="WitchTrade | Gameservers"
                description="Witch It Servers on WitchTrade"
                url="https://witchtrade.org/gameservers"
            />
            <div className="flex flex-wrap justify-center p-2">
                <Region regionShort="eu" servers={euServers} loading={loading} />
                <Region regionShort="hk" servers={hkServers} loading={loading} />
                <Region regionShort="us" servers={usServers} loading={loading} />
            </div>
            {!loading &&
                <div className="flex justify-center">
                    <ActionButton type="proceed" onClick={getGameServers}>Refresh</ActionButton>
                </div>
            }
        </div>
    );
};

export default Gameservers;
