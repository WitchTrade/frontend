import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'
import { firstValueFrom } from 'rxjs'
import CustomHeader from '../components/core/CustomHeader'
import Divider from '../components/styles/Divider'
import PageHeader from '../components/styles/PageHeader'
import TextInput from '../components/styles/TextInput'
import Tooltip from '../components/styles/Tooltip'
import Verified from '../components/styles/VerifiedSvg'
import ProfilesHandler from '../shared/handlers/profiles.handler'
import {
  getItemRarities,
  itemRarityToColor,
} from '../shared/stores/items/items.store'
import {
  createPreviewMarket,
  PreviewMarket,
} from '../shared/stores/markets/market.model'
import { marketsService } from '../shared/stores/markets/markets.service'
import type { NextPage } from 'next'

interface Props {
  profiles: PreviewMarket[]
}

const Profiles: NextPage<Props> = ({ profiles }) => {
  const {
    loadedProfiles,
    loadMoreProfiles,
    hasMoreProfiles,
    searchValue,
    setSearchValue,
  } = ProfilesHandler(
    profiles.sort((a, b) => {
      let sortValue = b.offerCount - a.offerCount
      sortValue = a.verified === b.verified ? sortValue : a.verified ? -1 : 1
      return sortValue
    })
  )

  return (
    <>
      <CustomHeader
        title='WitchTrade | Profiles'
        description={`There are ${profiles.length} users with offers on WitchTrade.`}
        url='https://witchtrade.org/profiles'
      />
      <PageHeader title='Profiles' />
      <div className='flex justify-center mb-2'>
        <TextInput
          type='text'
          placeholder='Search for user'
          required={false}
          value={searchValue}
          setValue={setSearchValue}
          clearOption={true}
        />
      </div>
      <InfiniteScroll
        className='flex flex-wrap justify-center px-4 pb-10 mx-auto max-w-7xl sm:px-6 lg:px-8'
        dataLength={loadedProfiles.length}
        next={loadMoreProfiles}
        hasMore={hasMoreProfiles()}
        loader={<p></p>}
      >
        {loadedProfiles.map((profile, i) => (
          <Link key={i} href={`/@/${profile.username}`}>
            <a>
              <div className='flex flex-col justify-between px-2 pt-1 pb-2 m-2 w-56 text-center bg-wt-surface-dark rounded-lg border border-wt-accent shadow-lg transition duration-100 hover:scale-105 cursor-pointer'>
                <div className='flex justify-center items-center'>
                  <p className='text-lg font-bold text-center text-wt-accent'>
                    {profile.displayName}
                  </p>
                  {profile.verified && (
                    <Tooltip text='Verified'>
                      <div className='flex items-center ml-1 w-5 h-5'>
                        <Verified />
                      </div>
                    </Tooltip>
                  )}
                </div>
                <div className='my-1 mx-4'>
                  <Divider />
                </div>
                <p>{profile.offerCount} offers</p>
                <div className='flex flex-wrap justify-center mt-1'>
                  {profile.offers
                    .slice()
                    .sort((a, b) => {
                      return (
                        getItemRarities().indexOf(b.rarity) -
                        getItemRarities().indexOf(a.rarity)
                      )
                    })
                    .map((offer) => (
                      <div
                        key={offer.rarity}
                        className='flex justify-center items-center px-1 mr-1 text-center rounded-full'
                        style={{
                          minWidth: '25px',
                          height: '25px',
                          backgroundColor: itemRarityToColor(offer.rarity),
                        }}
                      >
                        <p className='text-xs font-bold text-wt-dark'>
                          {offer.count}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </InfiniteScroll>
    </>
  )
}

export async function getServerSideProps() {
  const profiles = await fetchProfiles()
  return { props: { profiles } }
}

const fetchProfiles = async () => {
  let profiles = createPreviewMarket({})

  const profilesRes = await firstValueFrom(marketsService.fetchAllMarkets())
  profiles = await profilesRes.json()

  return profiles
}

export default Profiles
