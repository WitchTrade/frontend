import Image from 'next/image'
import Link from 'next/link'
import CustomHeader from '../components/core/CustomHeader'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div
      className='px-4 mx-auto sm:px-32 lg:px-48'
      style={{ maxWidth: '1500px' }}
    >
      <CustomHeader />
      <p className='pt-2 text-6xl font-bold text-center'>
        <span className='text-wt-accent'>Witch</span>Trade
      </p>
      <p className='text-center sm:text-xl'>
        WitchTrade is a trading website dedicated to{' '}
        <Link href='https://store.steampowered.com/app/559650/Witch_It/'>
          <a
            className='text-wt-accent hover:underline cursor-pointer'
            target='_blank'
            rel='noreferrer'
          >
            Witch It
          </a>
        </Link>
        , a hide and seek game. It can be used to find and offer cosmetic items.
      </p>
      <div className='flex flex-wrap p-1 my-4 bg-wt-surface-dark rounded-lg border-4 border-wt-accent'>
        <div className='flex justify-center p-2 w-full sm:w-1/2'>
          <Image
            className='rounded-xl'
            src='/assets/images/home/itemList.png'
            width={772}
            height={609}
            quality={100}
            alt='Item list'
          />
        </div>
        <div className='flex justify-center items-center w-full sm:w-1/2'>
          <p className='text-xl text-center sm:text-2xl'>
            Browse through all Witch It items
          </p>
        </div>
      </div>
      <div className='flex flex-wrap p-1 my-4 bg-wt-surface-dark rounded-lg border-4 border-wt-accent'>
        <div className='flex justify-center items-center w-full sm:w-1/2'>
          <p className='text-xl text-center sm:text-2xl'>
            Find offers for every item you are looking for in the search view
          </p>
        </div>
        <div className='flex justify-center p-2 w-full sm:w-1/2'>
          <Image
            className='rounded-xl'
            src='/assets/images/home/search.png'
            width={760}
            height={520}
            quality={100}
            alt='Search'
          />
        </div>
      </div>
      <div className='flex flex-wrap p-1 my-4 bg-wt-surface-dark rounded-lg border-4 border-wt-accent'>
        <div className='flex justify-center p-2 w-full sm:w-1/2'>
          <Image
            className='rounded-xl'
            src='/assets/images/home/profile.png'
            width={741}
            height={353}
            quality={100}
            alt='Profile'
          />
        </div>
        <div className='flex justify-center items-center w-full sm:w-1/2'>
          <p className='text-xl text-center sm:text-2xl'>
            Manage your own market where you can offer your items.
          </p>
        </div>
      </div>
      <div className='flex flex-wrap p-1 my-4 bg-wt-surface-dark rounded-lg border-4 border-wt-accent'>
        <div className='flex justify-center items-center w-full sm:w-1/2'>
          <p className='text-xl text-center sm:text-2xl'>
            A filter helps you find exactly the items you desire.
          </p>
        </div>
        <div className='flex justify-center p-2 w-full sm:w-1/2'>
          <Image
            className='rounded-xl'
            src='/assets/images/home/filter.png'
            width={941}
            height={484}
            quality={100}
            alt='Filter'
          />
        </div>
      </div>
      <div className='flex flex-wrap p-1 my-4 bg-wt-surface-dark rounded-lg border-4 border-wt-accent'>
        <div className='flex justify-center p-2 w-full sm:w-1/2'>
          <Image
            className='rounded-xl'
            src='/assets/images/home/inventory.png'
            width={484}
            height={267}
            quality={100}
            alt='Inventory'
          />
        </div>
        <div className='flex justify-center items-center w-full sm:w-1/2'>
          <p className='text-xl text-center sm:text-2xl'>
            Sync your Witch It inventory to unlock the full potential of
            WitchTrade!
          </p>
        </div>
      </div>
      <div className='flex flex-wrap p-1 my-4 bg-wt-surface-dark rounded-lg border-4 border-wt-accent'>
        <div className='flex justify-center items-center w-full sm:w-1/2'>
          <p className='text-xl text-center sm:text-2xl'>
            See your current in-game quests without having to start up the game.
          </p>
        </div>
        <div className='flex justify-center p-2 w-full sm:w-1/2'>
          <Image
            className='rounded-xl'
            src='/assets/images/home/quests.png'
            width={960}
            height={425}
            quality={100}
            alt='Inventory'
          />
        </div>
      </div>
    </div>
  )
}

export default Home
