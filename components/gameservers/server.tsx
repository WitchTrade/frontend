import { FunctionComponent } from 'react';
import Image from 'next/image';
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick';
import { Gameserver } from '../../shared/models/gameserver.model';
import dayjs from 'dayjs';
import Divider from '../styles/Divider';
import { useObservable } from '@ngneat/react-rxjs';
import { themeStore } from '../../shared/stores/theme/theme.store';

interface Props {
  server: Gameserver;
  watchlist: string[];
  ownPlayer: string;
  addPlayer: (playerName: string) => void;
  removePlayer: (playerName: string) => void;
};

const Server: FunctionComponent<Props> = ({ server, watchlist, ownPlayer, addPlayer, removePlayer }) => {
  const [theme] = useObservable(themeStore);

  const { show, nodeRef, toggleRef } = useDetectOutsideClick(false);

  return (
    <div className="relative w-full">
      <div className={`flex justify-between p-1 px-2 cursor-pointer border-wt-accent-light ${show ? 'rounded-t-md border-l-2 border-t-2 border-r-2' : 'rounded-md border'}`} ref={toggleRef}>
        <p><span className="font-bold">{server.name}</span> | <span className="text-sm">{server.gameMode}</span></p>
        <div className="flex items-center">
          {(server.players &&
            <>
              {ownPlayer && server.players.find(player => player.name === ownPlayer) &&
                <div className="rounded-full text-center flex justify-center items-center mr-1 px-1 bg-wt-accent-light" style={{ minWidth: '20px', height: '20px' }}>
                  <p className="font-bold text-sm text-wt-light">!</p>
                </div>}
              {server.players.find(player => watchlist.includes(player.name)) &&
                <div className="rounded-full text-center flex justify-center items-center mr-1 px-1 bg-wt-accent" style={{ minWidth: '20px', height: '20px' }}>
                  <p className="font-bold text-sm text-wt-light">{server.players.filter(player => watchlist.includes(player.name)).length}</p>
                </div>}
            </>) ||
            <div className="rounded-full text-center flex justify-center items-center mr-1 px-1 bg-wt-error" style={{ minWidth: '20px', height: '20px' }}>
              <p className="font-bold text-sm text-wt-light">!</p>
            </div>
          }
          <p className={`${server.playerCount === server.maxPlayers ? 'text-wt-warning' : server.playerCount >= 10 ? 'text-wt-success' : ''}`}>{server.playerCount}/{server.maxPlayers}</p>
          <div className="w-6 h-6">
            <Image src={`/assets/svgs/expand_${show ? 'less' : 'more'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="24px" width="24px" alt="Dropdown Item Icon" />
          </div>
        </div>
      </div>
      {show &&
        <div ref={nodeRef} className="absolute top-8 left-0 bg-wt-surface-dark rounded-b-md border-l-2 border-b-2 border-r-2 border-wt-accent-light z-40 p-2 px-3 w-full">
          <div className="mx-5 my-1">
            <Divider />
          </div>
          {server.players &&
            <>
              <p className="text-wt-accent-light text-center">Playing</p>
              {server.players && server.players.map((player, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center">
                    {!watchlist.includes(player.name) && ownPlayer !== player.name &&
                      <button className="hover:bg-wt-hover rounded-full flex items-center" onClick={() => addPlayer(player.name)}>
                        <Image src={`/assets/svgs/add/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="20px" width="20px" alt="Add player" />
                      </button>
                    }
                    {watchlist.includes(player.name) && ownPlayer !== player.name &&
                      <button className="hover:bg-wt-hover rounded-full flex items-center" onClick={() => removePlayer(player.name)}>
                        <Image src={`/assets/svgs/remove/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="20px" width="20px" alt="Add player" />
                      </button>
                    }
                    <p className={`text-sm ${watchlist.includes(player.name) ? 'text-wt-accent' : ownPlayer === player.name ? 'text-wt-accent-light ml-5' : ''}`}>{player.name}</p>
                  </div>
                  <p className="text-sm">{Math.floor(dayjs.duration(player.playingFor, 's').asHours()) > 0 ? `${Math.floor(dayjs.duration(player.playingFor, 's').asHours())}h ` : ''}{dayjs.duration(player.playingFor, 's').minutes()} min</p>
                </div>
              ))}
            </>
          }
          {!server.players &&
            <>
              <p className="text-center text-wt-error">Error while fetching the player list</p>
            </>
          }
        </div>
      }
    </div>
  );
};

export default Server;
