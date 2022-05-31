import { useObservable } from '@ngneat/react-rxjs'
import dayjs from 'dayjs'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick'
import { Gameserver } from '../../shared/models/gameserver.model'
import { themeStore } from '../../shared/stores/theme/theme.store'
import Divider from '../styles/Divider'

interface Props {
  server: Gameserver
  watchlist: string[]
  ownPlayer: string
  addPlayer: (playerName: string) => void
  removePlayer: (playerName: string) => void
}

const Server: FunctionComponent<Props> = ({
  server,
  watchlist,
  ownPlayer,
  addPlayer,
  removePlayer,
}) => {
  const [theme] = useObservable(themeStore)

  const { show, nodeRef, toggleRef } = useDetectOutsideClick(false)

  return (
    <div className='relative w-full'>
      <div
        className={`flex justify-between p-1 px-2 cursor-pointer border-wt-accent-light ${
          show
            ? 'rounded-t-md border-l-2 border-t-2 border-r-2'
            : 'rounded-md border'
        }`}
        ref={toggleRef}
      >
        <p>
          <span className='font-bold'>
            {server.name.replace('Anniversary', '🎂')}
          </span>{' '}
          | <span className='text-sm'>{server.gameMode}</span>
        </p>
        <div className='flex items-center'>
          {(server.players && (
            <>
              {ownPlayer &&
                server.players.find((player) => player.name === ownPlayer) && (
                  <div
                    className='flex justify-center items-center px-1 mr-1 text-center bg-wt-accent-light rounded-full'
                    style={{ minWidth: '20px', height: '20px' }}
                  >
                    <p className='text-sm font-bold text-wt-light'>!</p>
                  </div>
                )}
              {server.players.find((player) =>
                watchlist.includes(player.name)
              ) && (
                <div
                  className='flex justify-center items-center px-1 mr-1 text-center bg-wt-accent rounded-full'
                  style={{ minWidth: '20px', height: '20px' }}
                >
                  <p className='text-sm font-bold text-wt-light'>
                    {
                      server.players.filter((player) =>
                        watchlist.includes(player.name)
                      ).length
                    }
                  </p>
                </div>
              )}
            </>
          )) || (
            <div
              className='flex justify-center items-center px-1 mr-1 text-center bg-wt-error rounded-full'
              style={{ minWidth: '20px', height: '20px' }}
            >
              <p className='text-sm font-bold text-wt-light'>!</p>
            </div>
          )}
          <p
            className={`${
              server.playerCount === server.maxPlayers
                ? 'text-wt-warning'
                : server.playerCount >= 10
                ? 'text-wt-success'
                : ''
            }`}
          >
            {server.playerCount}/{server.maxPlayers}
          </p>
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
      </div>
      {show && (
        <div
          ref={nodeRef}
          className='absolute top-8 left-0 z-40 p-2 px-3 w-full bg-wt-surface-dark rounded-b-md border-x-2 border-b-2 border-wt-accent-light'
        >
          <div className='my-1 mx-5'>
            <Divider />
          </div>
          {server.players && (
            <>
              <p className='text-center text-wt-accent-light'>Playing</p>
              {server.players &&
                server.players.map((player, i) => (
                  <div key={i} className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      {!watchlist.includes(player.name) &&
                        ownPlayer !== player.name && (
                          <button
                            className='flex items-center hover:bg-wt-hover rounded-full'
                            onClick={() => addPlayer(player.name)}
                          >
                            <Image
                              src={`/assets/svgs/add/${
                                theme?.type === 'light' ? 'black' : 'white'
                              }.svg`}
                              height='20px'
                              width='20px'
                              alt='Add player'
                            />
                          </button>
                        )}
                      {watchlist.includes(player.name) &&
                        ownPlayer !== player.name && (
                          <button
                            className='flex items-center hover:bg-wt-hover rounded-full'
                            onClick={() => removePlayer(player.name)}
                          >
                            <Image
                              src={`/assets/svgs/remove/${
                                theme?.type === 'light' ? 'black' : 'white'
                              }.svg`}
                              height='20px'
                              width='20px'
                              alt='Add player'
                            />
                          </button>
                        )}
                      <p
                        className={`text-sm ${
                          watchlist.includes(player.name)
                            ? 'text-wt-accent'
                            : ownPlayer === player.name
                            ? 'text-wt-accent-light ml-5'
                            : ''
                        }`}
                      >
                        {player.name}
                      </p>
                    </div>
                    <p className='text-sm'>
                      {Math.floor(
                        dayjs.duration(player.playingFor, 's').asHours()
                      ) > 0
                        ? `${Math.floor(
                            dayjs.duration(player.playingFor, 's').asHours()
                          )}h `
                        : ''}
                      {dayjs.duration(player.playingFor, 's').minutes()} min
                    </p>
                  </div>
                ))}
            </>
          )}
          {!server.players && (
            <>
              <p className='text-center text-wt-error'>
                Error while fetching the player list
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Server
