import { useObservable } from '@ngneat/react-rxjs'
import Image from 'next/image'
import CustomHeader from '../../components/core/CustomHeader'
import WitchItNav from '../../components/navs/WitchItNav'
import ActionButton from '../../components/styles/ActionButton'
import Divider from '../../components/styles/Divider'
import Loading from '../../components/styles/Loading'
import PageHeader from '../../components/styles/PageHeader'
import TextInput from '../../components/styles/TextInput'
import WTDialog from '../../components/styles/WTDialog'
import Region from '../../components/witchit/region'
import useGameserverHandler from '../../shared/handlers/gameserver.handler'
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick'
import { themeStore } from '../../shared/stores/theme/theme.store'
import { userStore } from '../../shared/stores/user/user.store'
import type { NextPage } from 'next'

const Gameservers: NextPage = () => {
  const [theme] = useObservable(themeStore)
  const [user] = useObservable(userStore)

  const { show, nodeRef, toggleRef } = useDetectOutsideClick(false)

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
    setDialogName,
  } = useGameserverHandler()

  return (
    <div>
      <WTDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        closeOnOutsideClick={true}
      >
        <div className='inline-block overflow-auto p-6 my-8 max-w-md text-left align-middle bg-wt-surface-dark rounded-2xl border-4 border-wt-success shadow-xl transition-all'>
          <div className='flex flex-col justify-between h-full'>
            <div>
              <p className='text-2xl font-medium leading-6'>Add player</p>
              <p className='my-2 text-sm'>
                Added players will be highlighted in the game server list.
              </p>
            </div>
            <TextInput
              type='text'
              placeholder='Player name'
              required={false}
              value={dialogName}
              setValue={setDialogName}
            />
            <div className='flex justify-evenly pb-2 mt-4'>
              <ActionButton
                type='success'
                onClick={() => {
                  if (dialogName) {
                    addPlayer(dialogName)
                  }
                }}
              >
                Add player
              </ActionButton>
              <ActionButton type='cancel' onClick={() => setDialogOpen(false)}>
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      </WTDialog>
      <CustomHeader
        title='WitchTrade | Gameservers'
        description='View the Witch It Servers live on WitchTrade'
        url='https://witchtrade.org/witchit/gameservers'
      />
      <WitchItNav />
      <PageHeader title='Witch It Game Servers' />
      <div className='flex justify-center'>
        <div
          className='flex flex-col p-2 m-2 bg-wt-surface-dark rounded-lg border-2 border-wt-accent'
          style={{ width: '750px' }}
        >
          <p className='text-lg text-center'>Player watchlist</p>
          {!steamSyncLoading && (
            <div>
              <div className='flex flex-wrap justify-center pt-2'>
                <div className='m-1'>
                  <ActionButton
                    type='success'
                    onClick={() => setDialogOpen(true)}
                  >
                    <Image
                      src='/assets/svgs/add/white.svg'
                      height='24px'
                      width='24px'
                      alt='Add player'
                    />
                    Add player
                  </ActionButton>
                </div>
                {user && user.steamProfileLink && !steamSyncLoading && (
                  <div className='m-1'>
                    <ActionButton type='info' onClick={syncSteamFriends}>
                      <Image
                        src='/assets/svgs/sync.svg'
                        height='24px'
                        width='24px'
                        alt='Sync Steam Friends'
                      />
                      Sync Steam Friends
                    </ActionButton>
                  </div>
                )}
                <div className='m-1'>
                  <ActionButton type='cancel' onClick={clearWatchlist}>
                    <Image
                      src='/assets/svgs/bin/white.svg'
                      height='24px'
                      width='24px'
                      alt='Remove all'
                    />
                    Remove all
                  </ActionButton>
                </div>
              </div>
              <div className='relative mt-2'>
                <div
                  className={`flex justify-between p-1 px-2 cursor-pointer border-wt-accent-light ${
                    show
                      ? 'rounded-t-md border-l-2 border-t-2 border-r-2'
                      : 'rounded-md border'
                  }`}
                  ref={toggleRef}
                >
                  <div className='w-6 h-6'>
                    <Image
                      src={`/assets/svgs/expand_${show ? 'less' : 'more'}/${
                        theme?.type === 'light' ? 'black' : 'white'
                      }.svg`}
                      height='24px'
                      width='24px'
                      alt='Dropdown Item Icon'
                    />
                  </div>
                  <p>Player watchlist | {watchlist.length} players</p>
                  <div className='w-6 h-6'>
                    <Image
                      src={`/assets/svgs/expand_${show ? 'less' : 'more'}/${
                        theme?.type === 'light' ? 'black' : 'white'
                      }.svg`}
                      height='24px'
                      width='24px'
                      alt='Dropdown Item Icon'
                    />
                  </div>
                </div>
                {show && (
                  <div
                    ref={nodeRef}
                    className='overflow-y-auto absolute top-8 left-0 z-40 p-2 px-3 w-full bg-wt-surface-dark rounded-b-md border-x-2 border-b-2 border-wt-accent-light'
                    style={{ maxHeight: '400px' }}
                  >
                    <div className='my-1 mx-5'>
                      <Divider />
                    </div>
                    <div className='flex flex-wrap justify-center'>
                      {watchlist
                        .sort((a, b) =>
                          a.toLowerCase().localeCompare(b.toLowerCase())
                        )
                        .map((player, i) => (
                          <div
                            key={i}
                            className='flex justify-between p-1 m-1 w-52 align-middle rounded-md border border-wt-accent-light'
                          >
                            <div className='flex items-center'>
                              <p className='ml-1 text-sm'>{player}</p>
                            </div>
                            <ActionButton
                              type='cancel'
                              onClick={() => removePlayer(player)}
                            >
                              <Image
                                src={`/assets/svgs/bin/white.svg`}
                                height='24px'
                                width='24px'
                                alt='Dropdown Item Icon'
                              />
                            </ActionButton>
                          </div>
                        ))}
                    </div>
                    {watchlist.length === 0 && (
                      <p className='text-center text-wt-error'>
                        No players added to the watchlist yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {steamSyncLoading && <Loading text='Syncing steam friends' />}
        </div>
      </div>
      <div className='flex justify-center pt-2'>
        <ActionButton
          type='success'
          onClick={getGameServers}
          disabled={loading}
        >
          <Image
            src='/assets/svgs/refresh.svg'
            height='24px'
            width='24px'
            alt='Refresh'
          />
          Refresh
        </ActionButton>
      </div>
      <div className='flex flex-wrap justify-center pb-2'>
        <Region
          regionShort='eu'
          servers={euServers}
          loading={loading}
          watchlist={watchlist}
          ownPlayer={ownPlayer}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
        />
        <Region
          regionShort='hk'
          servers={hkServers}
          loading={loading}
          watchlist={watchlist}
          ownPlayer={ownPlayer}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
        />
        <Region
          regionShort='us'
          servers={usServers}
          loading={loading}
          watchlist={watchlist}
          ownPlayer={ownPlayer}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
        />
      </div>
    </div>
  )
}

export default Gameservers
