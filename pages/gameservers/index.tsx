import type { NextPage } from 'next';
import Image from 'next/image';
import CustomHeader from '../../components/core/CustomHeader';
import Region from '../../components/gameservers/region';
import GameServerNav from '../../components/navs/GameServerNav';
import ActionButton from '../../components/styles/ActionButton';
import Divider from '../../components/styles/Divider';
import Loading from '../../components/styles/Loading';
import PageHeader from '../../components/styles/PageHeader';
import TextInput from '../../components/styles/TextInput';
import WTDialog from '../../components/styles/WTDialog';
import useGameserverHandler from '../../shared/handlers/gameserver.handler';
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick';
import useThemeProvider from '../../shared/providers/theme.provider';
import useUserProvider from '../../shared/providers/user.provider';

const Gameservers: NextPage = () => {
  const { theme } = useThemeProvider();
  const { user } = useUserProvider();

  const { show, nodeRef, toggleRef } = useDetectOutsideClick(false);

  const {
    euServers,
    hkServers,
    usServers,
    loading,
    steamSyncLoading,
    getGameServers,
    watchlist,
    ownPlayer,
    syncSteamFriends,
    clearWatchlist,
    addPlayer,
    removePlayer,
    dialogOpen,
    setDialogOpen,
    dialogName,
    setDialogName
  } = useGameserverHandler();

  return (
    <div>
      <WTDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-md p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-success">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-2xl font-medium leading-6">Add player</p>
              <p className="text-sm my-2">Added players will be highlighted in the game server list.</p>
            </div>
            <TextInput type="text" placeholder="Player name" required={false} value={dialogName} setValue={setDialogName} />
            <div className="mt-4 flex justify-evenly pb-2">
              <ActionButton type="proceed" onClick={() => {
                if (dialogName) {
                  addPlayer(dialogName);
                  setDialogName('');
                }
              }}>
                Add player
              </ActionButton>
              <ActionButton type="cancel" onClick={() => setDialogOpen(false)}>
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      </WTDialog>
      <CustomHeader
        title="WitchTrade | Gameservers"
        description="View the Witch It Servers live on WitchTrade"
        url="https://witchtrade.org/gameservers"
      />
      <GameServerNav />
      <PageHeader title="Witch It Game Servers" />
      <div className="flex justify-center">
        <div className="flex flex-col bg-wt-surface-dark border-2 border-wt-accent rounded-lg p-2 m-2" style={{ width: '750px' }}>
          <p className="text-lg text-center">Player watchlist</p>
          {!steamSyncLoading &&
            <div>
              <div className="flex flex-wrap justify-center pt-2">
                <div className="m-1">
                  <ActionButton type="proceed" onClick={() => setDialogOpen(true)}>
                    <Image src="/assets/svgs/add/white.svg" height="24px" width="24px" alt="Add player" />
                    Add player
                  </ActionButton>
                </div>
                {user && user.steamProfileLink && !steamSyncLoading &&
                  <div className="m-1">
                    <ActionButton type="accent" onClick={syncSteamFriends}>
                      <Image src="/assets/svgs/sync.svg" height="24px" width="24px" alt="Sync Steam Friends" />
                      Sync Steam Friends
                    </ActionButton>
                  </div>
                }
                <div className="m-1">
                  <ActionButton type="cancel" onClick={clearWatchlist}>
                    <Image src="/assets/svgs/bin/white.svg" height="24px" width="24px" alt="Remove all" />
                    Remove all
                  </ActionButton>
                </div>
              </div>
              <div className="relative mt-2">
                <div className={`flex justify-between p-1 px-2 cursor-pointer border-wt-accent-light ${show ? 'rounded-t-md border-l-2 border-t-2 border-r-2' : 'rounded-md border'}`} ref={toggleRef}>
                  <div className="w-6 h-6">
                    <Image src={`/assets/svgs/expand_${show ? 'less' : 'more'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="24px" width="24px" alt="Dropdown Item Icon" />
                  </div>
                  <p>Player watchlist | {watchlist.length} players</p>
                  <div className="w-6 h-6">
                    <Image src={`/assets/svgs/expand_${show ? 'less' : 'more'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="24px" width="24px" alt="Dropdown Item Icon" />
                  </div>
                </div>
                {show &&
                  <div ref={nodeRef} className="absolute top-8 left-0 bg-wt-surface-dark rounded-b-md border-l-2 border-b-2 border-r-2 border-wt-accent-light z-50 p-2 px-3 w-full overflow-y-auto" style={{ maxHeight: '400px' }}>
                    <div className="mx-5 my-1">
                      <Divider />
                    </div>
                    <div className="flex flex-wrap justify-center">
                      {watchlist.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).map((player, i) => (
                        <div key={i} className="w-52 flex justify-between align-middle border border-wt-accent-light rounded-md p-1 m-1">
                          <div className="flex items-center">
                            <p className="text-sm ml-1">{player}</p>
                          </div>
                          <ActionButton type="cancel" onClick={() => removePlayer(player)}>
                            <Image src={`/assets/svgs/bin/white.svg`} height="24px" width="24px" alt="Dropdown Item Icon" />
                          </ActionButton>
                        </div>
                      ))}
                    </div>
                    {watchlist.length === 0 &&
                      <p className="text-center text-wt-error">No players added to the watchlist yet</p>
                    }
                  </div>
                }
              </div>
            </div>
          }
          {steamSyncLoading &&
            <Loading text="Syncing steam friends" />
          }
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <ActionButton type="proceed" onClick={getGameServers} disabled={loading}>
          <Image src="/assets/svgs/refresh.svg" height="24px" width="24px" alt="Refresh" />
          Refresh
        </ActionButton>
      </div>
      <div className="flex flex-wrap justify-center pb-2">
        <Region regionShort="eu" servers={euServers} loading={loading} watchlist={watchlist} ownPlayer={ownPlayer} addPlayer={addPlayer} />
        <Region regionShort="hk" servers={hkServers} loading={loading} watchlist={watchlist} ownPlayer={ownPlayer} addPlayer={addPlayer} />
        <Region regionShort="us" servers={usServers} loading={loading} watchlist={watchlist} ownPlayer={ownPlayer} addPlayer={addPlayer} />
      </div>
    </div>
  );
};

export default Gameservers;
