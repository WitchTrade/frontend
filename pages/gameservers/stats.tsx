import type { NextPage } from 'next';
import { useState } from 'react';
import CustomHeader from '../../components/core/CustomHeader';
import GameServerNav from '../../components/navs/GameServerNav';
import PageHeader from '../../components/styles/PageHeader';
import useStatsHandler from '../../shared/handlers/stats.handler';

const Stats: NextPage = () => {
  const [now] = useState(new Date());

  const {
    playerDistRegion,
    playerDistMode,
    playerCountTotal,
    playerCountRegion,
    playerCountMode
  } = useStatsHandler();

  return (
    <div>
      <CustomHeader
        title="WitchTrade | Server Stats"
        description="View statistics of Witch It servers on WitchTrade"
        url="https://witchtrade.org/gameservers/stats"
      />
      <GameServerNav />
      <PageHeader title="Game Server Stats" description="Statistics of Witch It servers" />
      <p className="text-center mb-4">All times on this site are UTC. Current UTC time: <b>{now.getUTCHours()}:{now.getUTCMinutes() >= 10 ? now.getUTCMinutes() : `0${now.getUTCMinutes()}`}</b></p>
      <p className="text-2xl text-center font-bold">Players</p>
      <p className="text-center">Average players in the last week</p>
      <div className="flex flex-wrap justify-center align-middle mx-2">
        <div className="bg-wt-chartbg rounded-lg p-3 shadow-xl w-full m-2" style={{ maxWidth: '625px', maxHeight: '424px' }}>
          <canvas ref={playerCountTotal} height="1000" width="1500"></canvas>
        </div>
      </div>
      <p className="text-2xl text-center font-bold">Regions</p>
      <p className="text-center">Average distribution of players among regions in the last 24h</p>
      <div className="flex flex-wrap justify-center align-middle mx-2">
        <div className="bg-wt-chartbg rounded-lg p-3 shadow-xl w-full m-2" style={{ maxWidth: '424px', maxHeight: '424px' }}>
          <canvas ref={playerDistRegion} height="1000" width="1500"></canvas>
        </div>
        <div className="bg-wt-chartbg rounded-lg p-3 shadow-xl w-full m-2" style={{ maxWidth: '625px', maxHeight: '424px' }}>
          <canvas ref={playerCountRegion} height="1000" width="1500"></canvas>
        </div>
      </div>
      <p className="text-2xl text-center font-bold">Game modes</p>
      <p className="text-center">Average distribution of players among game modes in the last 24h</p>
      <div className="flex flex-wrap justify-center align-middle mx-2">
        <div className="bg-wt-chartbg rounded-lg p-3 shadow-xl w-full m-2" style={{ maxWidth: '424px', maxHeight: '424px' }}>
          <canvas ref={playerDistMode} height="1000" width="1500"></canvas>
        </div>
        <div className="bg-wt-chartbg rounded-lg p-3 shadow-xl w-full m-2" style={{ maxWidth: '625px', maxHeight: '424px' }}>
          <canvas ref={playerCountMode} height="1000" width="1500"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Stats;
