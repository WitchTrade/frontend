import { useObservable } from '@ngneat/react-rxjs'
import dayjs from 'dayjs'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReactMarkdown from 'react-markdown'
import { firstValueFrom } from 'rxjs'
import CustomHeader from '../../components/core/CustomHeader'
import ItemDetailDialog from '../../components/items/ItemDetailDialog'
import ItemFilter from '../../components/items/ItemFilter'
import TradeView, { TRADE_TYPE } from '../../components/market/TradeView'
import MarketNav from '../../components/navs/MarketNav'
import Tooltip from '../../components/styles/Tooltip'
import Verified from '../../components/styles/VerifiedSvg'
import FilterHandler from '../../shared/handlers/filter.handler'
import ItemsHandler from '../../shared/handlers/items.handler'
import { MARKET_TYPE } from '../../shared/handlers/market.handler'
import ProfileHandler from '../../shared/handlers/profile.handler'
import { FILTER_TYPE } from '../../shared/static/filterValues'
import {
  emojified,
  MarkdownComponents,
} from '../../shared/static/markdownComponents'
import { createMarket, Market } from '../../shared/stores/markets/market.model'
import { themeStore } from '../../shared/stores/theme/theme.store'
import { createUserInfo, UserInfo } from '../../shared/stores/user/user.model'
import { userService } from '../../shared/stores/user/user.service'

interface Props {
  profile: UserInfo
  market: Market
}

const Profile: NextPage<Props> = ({ profile, market }) => {
  const router = useRouter()
  const { username } = router.query

  const [theme] = useObservable(themeStore)

  const oneMonthAgo = new Date().setDate(new Date().getDate() - 30)

  const { copyDiscordTag, copyWitchItUserId, type, setType } = ProfileHandler()

  const {
    inventory,
    totalItemCount,
    filteredItems,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues,
  } = FilterHandler(
    FILTER_TYPE.MARKET,
    50,
    type === MARKET_TYPE.OFFER ? market.offers : market.wishes,
    type,
    setType
  )

  const {
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails,
    capitalizeFirstLetter,
  } = ItemsHandler()

  const getLastUpdated = () => {
    // don't execute this before the app service has loaded
    if (typeof dayjs().to !== 'function') {
      return ''
    }
    return dayjs().to(dayjs(market.lastUpdated))
  }

  return (
    <>
      <CustomHeader
        title={
          profile.username
            ? `WitchTrade | ${profile.displayName}`
            : `${username} does not exist`
        }
        description={
          profile.username
            ? `${profile.displayName} has ${market.offers.length} offer${
                market.offers.length === 1 ? '' : 's'
              } available on their market.`
            : `${username} does not exist`
        }
        url={`https://witchtrade.org/@/${username}`}
      />
      {(profile.username && (
        <>
          <ItemDetailDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            item={selectedItem}
            inventory={inventory}
            capitalizeFirstLetter={capitalizeFirstLetter}
          />
          <div className='flex flex-col justify-center py-2 px-4 mx-auto max-w-3xl sm:px-6 lg:px-8'>
            <div className='flex justify-center items-center pt-3'>
              <p className='text-3xl font-bold text-center text-wt-accent'>
                {profile.displayName}
              </p>
              {profile.verified && (
                <Link href='/faq'>
                  <a className='flex items-center'>
                    <Tooltip text='Verified'>
                      <div className='flex items-center ml-1 w-6 h-6'>
                        <Verified />
                      </div>
                    </Tooltip>
                  </a>
                </Link>
              )}
            </div>
            <p className='-mt-1 text-sm text-center'>@{profile.username}</p>
            <div className='flex flex-wrap justify-center items-stretch mt-2'>
              {profile.badges && profile.badges.length > 0 && (
                <div className='flex flex-col justify-evenly p-2 m-1 bg-wt-surface-dark rounded-lg border border-wt-accent'>
                  <p className='font-bold text-center'>Badges</p>
                  <div className='flex flex-wrap justify-center items-center'>
                    {profile.badges.map((badge) => (
                      <Tooltip key={badge.id} text={badge.description}>
                        <div className='m-1 w-9 h-9'>
                          <Image
                            src={`/assets/svgs/badges/${badge.id}.svg`}
                            height={36}
                            width={36}
                            alt={badge.description}
                          />
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )}
              {profile.steamProfileLink && (
                <div className='flex flex-col justify-evenly p-2 m-1 bg-wt-surface-dark rounded-lg border border-wt-accent'>
                  <p className='font-bold text-center'>Steam</p>
                  <div className='flex flex-wrap justify-center items-center'>
                    <div className='flex flex-col items-center my-1 mx-2'>
                      <Tooltip text='Click to open'>
                        <Link href={profile.steamProfileLink}>
                          <a target='_blank' rel='noreferrer'>
                            <div className='p-1 w-9 h-9 bg-wt-surface hover:bg-wt-accent rounded-full transition duration-100 hover:scale-110 cursor-pointer'>
                              <Image
                                src={`/assets/svgs/steam/${
                                  theme?.type === 'light' ? 'black' : 'white'
                                }.svg`}
                                height={36}
                                width={36}
                                alt='Steam Profile Link'
                              />
                            </div>
                          </a>
                        </Link>
                      </Tooltip>
                      <div className='flex mt-1'>
                        <p className='text-sm'>Profile</p>
                        {profile.verifiedSteamProfileLink && (
                          <div className='flex items-center ml-1 w-5 h-5'>
                            <div className='w-4 h-4'>
                              <Verified />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {profile.witchItUserId && (
                <div className='flex flex-col justify-evenly p-2 m-1 bg-wt-surface-dark rounded-lg border border-wt-accent'>
                  <p className='font-bold text-center'>Witch It Id</p>
                  <div className='flex flex-wrap justify-center items-center'>
                    <div className='flex flex-col items-center m-1'>
                      <Tooltip text='Click to copy'>
                        <div
                          className='p-1 w-9 h-9 bg-wt-surface hover:bg-wt-accent rounded-full transition duration-100 hover:scale-110 cursor-pointer'
                          onClick={() =>
                            copyWitchItUserId(profile.witchItUserId)
                          }
                        >
                          <Image
                            src={`/assets/svgs/userbadge/${
                              theme?.type === 'light' ? 'black' : 'white'
                            }.svg`}
                            height={36}
                            width={36}
                            alt='Witch It Id'
                          />
                        </div>
                      </Tooltip>
                      <p className='mt-1 font-mono text-xs'>
                        {profile.witchItUserId}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {profile.discordTag && (
                <div className='flex flex-col justify-evenly p-2 m-1 bg-wt-surface-dark rounded-lg border border-wt-accent'>
                  <p className='font-bold text-center'>Discord Username</p>
                  <div className='flex flex-wrap justify-center items-center'>
                    <div className='flex flex-col items-center m-1'>
                      <Tooltip text='Click to copy'>
                        <div
                          className='p-1 w-9 h-9 bg-wt-surface hover:bg-wt-accent rounded-full transition duration-100 hover:scale-110 cursor-pointer'
                          onClick={() => copyDiscordTag(profile.discordTag)}
                        >
                          <Image
                            src={`/assets/svgs/discord/${
                              theme?.type === 'light' ? 'black' : 'white'
                            }.svg`}
                            height={36}
                            width={36}
                            alt='Steam Profile'
                          />
                        </div>
                      </Tooltip>
                      <p className='mt-1 text-sm'>{profile.discordTag}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {profile.hidden && (
              <div className='p-1 mt-2 bg-wt-error rounded-lg'>
                <p className='text-2xl font-bold text-center'>Hidden profile</p>
                <p className='text-xl text-center'>
                  {profile.displayName} has hidden their profile and is probably
                  not trading at the moment.
                </p>
              </div>
            )}
            {new Date(market.lastUpdated).getTime() < oneMonthAgo && (
              <div className='p-1 mt-2 bg-wt-warning rounded-lg'>
                <p className='text-2xl font-bold text-center'>
                  Outdated offers
                </p>
                <p className='text-xl text-center'>
                  {profile.displayName} has not updated their market for over 30
                  days.
                </p>
              </div>
            )}
            <p className='mt-4 mb-1 text-center'>
              Market updated:{' '}
              <span className='text-wt-accent'>{getLastUpdated()}</span>
            </p>
            <MarketNav market={market} type={type} setType={setType} />
            {((type === MARKET_TYPE.OFFER && market.offerlistNote) ||
              (type === MARKET_TYPE.WISH && market.wishlistNote)) && (
              <div className='p-1 mt-2 bg-wt-surface-dark rounded-lg border-2 border-wt-accent'>
                <ReactMarkdown
                  className='break-words markdown-content'
                  components={MarkdownComponents}
                >
                  {type === MARKET_TYPE.OFFER
                    ? emojified(market.offerlistNote)
                    : emojified(market.wishlistNote)}
                </ReactMarkdown>
              </div>
            )}
          </div>
          <div className='my-2 w-full'>
            <ItemFilter
              itemFilterValues={itemFilterValues}
              setItemFilterValues={setItemFilterValues}
              initialOpen={false}
              type={FILTER_TYPE.MARKET}
            />
          </div>
          <p className='mt-2 text-center'>
            <span className='font-bold text-wt-accent'>{totalItemCount}</span>{' '}
            {type === MARKET_TYPE.OFFER ? 'offer' : 'wishlist item'}
            {totalItemCount === 1 ? '' : 's'}
            {totalItemCount !== filteredItems.length ? (
              <>
                {' '}
                in total,{' '}
                <span className='font-bold text-wt-accent'>
                  {filteredItems.length}
                </span>{' '}
                filtered
              </>
            ) : (
              ''
            )}
          </p>
          <InfiniteScroll
            className='flex flex-row flex-wrap justify-center py-2 mx-6 h-full'
            dataLength={loadedItems.length}
            next={loadMoreItems}
            hasMore={hasMoreItems()}
            loader={<p></p>}
          >
            {loadedItems.map((item) => (
              <TradeView
                key={item.id}
                type={
                  type === MARKET_TYPE.OFFER
                    ? TRADE_TYPE.PROFILE_OFFER
                    : TRADE_TYPE.PROFILE_WISH
                }
                trade={item}
                inventory={inventory}
                openItemDetails={openItemDetails}
              />
            ))}
          </InfiniteScroll>
        </>
      )) || (
        <div className='flex flex-col items-center'>
          <p className='pt-3 text-xl font-bold text-center'>
            User <span className='text-wt-accent'>{username}</span> does not
            exist
          </p>
          <div>
            <Image
              src='/assets/images/userNotFound.gif'
              height={173}
              width={635}
              alt='THL GIF'
            />
          </div>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const username = context.query.username
  const { profile, market } = await fetchProfile(username as string)
  return { props: { profile, market } }
}

const fetchProfile = async (username: string) => {
  let profile = createUserInfo({})
  let market = createMarket({})

  const profileRes = await firstValueFrom(userService.fetchProfile(username))
  profile = await profileRes.json()

  const marketRes = await firstValueFrom(
    userService.fetchProfileMarket(username)
  )
  market = await marketRes.json()

  return { profile, market }
}

export default Profile
