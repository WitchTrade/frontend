import type { NextPage } from 'next';
import CustomHeader from '../components/core/CustomHeader';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div className="mx-auto px-4 sm:px-32 lg:px-48" style={{ maxWidth: '1500px' }}>
      <CustomHeader />
      <p className="text-6xl font-bold text-center pt-2"><span className="text-wt-accent">Witch</span>Trade</p>
      <p className="sm:text-xl text-center">WitchTrade is a trading website dedicated to Witch It, a hide and seek game. It can be used to find and offer cosmetic items.</p>
      <div className="flex flex-wrap my-4 rounded-lg border-4 border-wt-accent p-1 bg-wt-surface-dark">
        <div className="w-full sm:w-1/2 p-2 flex justify-center">
          <Image className="rounded-3xl" src="/assets/images/home/itemList.png" width={762} height={603} quality={100} alt="Item list" />
        </div>
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <p className="text-xl sm:text-2xl text-center">Browse through all Witch It items</p>
        </div>
      </div>
      <div className="flex flex-wrap my-4 rounded-lg border-4 border-wt-accent p-1 bg-wt-surface-dark">
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <p className="text-xl sm:text-2xl text-center">Find offers for every item you are looking for in the search view</p>
        </div>
        <div className="w-full sm:w-1/2 p-2 flex justify-center">
          <Image className="rounded-3xl" src="/assets/images/home/search.png" width={760} height={520} quality={100} alt="Search" />
        </div>
      </div>
      <div className="flex flex-wrap my-4 rounded-lg border-4 border-wt-accent p-1 bg-wt-surface-dark">
        <div className="w-full sm:w-1/2 p-2 flex justify-center">
          <Image className="rounded-3xl" src="/assets/images/home/profile.png" width={620} height={400} quality={100} alt="Profile" />
        </div>
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <p className="text-xl sm:text-2xl text-center">Manage your own market where you can offer your items.</p>
        </div>
      </div>
      <div className="flex flex-wrap my-4 rounded-lg border-4 border-wt-accent p-1 bg-wt-surface-dark">
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <p className="text-xl sm:text-2xl text-center">A filter helps you find exactly the items you desire.</p>
        </div>
        <div className="w-full sm:w-1/2 p-2 flex justify-center">
          <Image className="rounded-3xl" src="/assets/images/home/filter.png" width={941} height={484} quality={100} alt="Filter" />
        </div>
      </div>
      <div className="flex flex-wrap my-4 rounded-lg border-4 border-wt-accent p-1 bg-wt-surface-dark">
        <div className="w-full sm:w-1/2 p-2 flex justify-center">
          <Image className="rounded-3xl" src="/assets/images/home/inventory.png" width={471} height={189} quality={100} alt="Inventory" />
        </div>
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <p className="text-xl sm:text-2xl text-center">Sync your Steam Witch It inventory to unlock the full potential of WitchTrade!</p>
        </div>
      </div>
      <div className="flex flex-wrap my-4 rounded-lg border-4 border-wt-accent p-1 bg-wt-surface-dark">
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <p className="text-xl sm:text-2xl text-center">Look up all the official servers of Witch It and see if your friends are currently playing!</p>
        </div>
        <div className="w-full sm:w-1/2 p-2 flex justify-center">
          <Image className="rounded-3xl" src="/assets/images/home/gameServers.png" width={331} height={275} quality={100} alt="Game servers" />
        </div>
      </div>
      <div className="flex flex-wrap my-4 rounded-lg border-4 border-wt-accent p-1 bg-wt-surface-dark">
        <div className="w-full sm:w-1/2 p-2 flex justify-center">
          <Image className="rounded-3xl" src="/assets/images/home/gameServerStats.png" width={401} height={408} quality={100} alt="Game server stats" />
        </div>
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <p className="text-xl sm:text-2xl text-center">Have a look at detailed stats of the witch it game servers and see what gamemodes are trending!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
