import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Gameserver } from '../../shared/models/gameserver.model';
import Loading from '../styles/Loading';
import Server from './server';

interface Props {
  regionShort: string;
  servers: Gameserver[];
  loading: boolean;
  watchlist: string[];
  ownPlayer: string;
  addPlayer: (playerName: string) => void;
  removePlayer: (playerName: string) => void;
};

const Region: FunctionComponent<Props> = ({ regionShort, servers, loading, watchlist, ownPlayer, addPlayer, removePlayer }) => {
  return (
    <div className="w-80 bg-wt-surface-dark rounded-lg border-2 border-wt-accent p-4 m-2">
      <div className="flex justify-center items-center">
        <Image src={`/assets/svgs/flags/${regionShort}.svg`} height="50px" width="50" alt={`${regionShort} region flag`} />
        <p className="ml-2 font-bold text-xl">{regionShort.toUpperCase()} Servers</p>
      </div>
      {loading &&
        <Loading />
      }
      {!loading &&
        <>
          {servers.length > 0 &&
            <p className="text-center"><span className="text-wt-success">{servers.map(server => server.playerCount).reduce((total, playerCount) => total + playerCount)}</span> players online</p>
          }
          {servers.map((server, i) => (
            <div key={i} className="my-1">
              <Server server={server} watchlist={watchlist} ownPlayer={ownPlayer} addPlayer={addPlayer} removePlayer={removePlayer} />
            </div>
          ))
          }
          {servers.length === 0 &&
            <p className="text-center">No players playing in this region</p>
          }
        </>
      }
    </div>
  );
};

export default Region;
