import { NextPage, NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useRouter } from 'next/dist/client/router';
import { firstValueFrom } from 'rxjs';
import ReactMarkdown from 'react-markdown';
import CustomHeader from '../../components/core/CustomHeader';
import { createMarket, Market } from '../../shared/stores/markets/market.model';
import { createUserInfo, UserInfo } from '../../shared/stores/user/user.model';
import { userService } from '../../shared/stores/user/user.service';
import Tooltip from '../../components/styles/Tooltip';
import ProfileHandler from '../../shared/handlers/profile.handler';
import MarketNav from '../../components/navs/MarketNav';
import FilterHandler from '../../shared/handlers/filter.handler';
import { MARKET_TYPE } from '../../shared/handlers/market.handler';
import ItemFilter from '../../components/items/ItemFilter';
import InfiniteScroll from 'react-infinite-scroll-component';
import TradeView, { TRADE_TYPE } from '../../components/market/TradeView';
import ItemDetailDialog from '../../components/items/ItemDetailDialog';
import ItemsHandler from '../../shared/handlers/items.handler';
import Verified from '../../components/styles/VerifiedSvg';
import { useObservable } from '@ngneat/react-rxjs';
import { themeStore } from '../../shared/stores/theme/theme.store';
import { FILTER_TYPE } from '../../shared/static/filterValues';
import { emojified, MarkdownComponents } from '../../shared/static/markdownComponents';

interface Props {
  profile: UserInfo;
  market: Market;
}

const Profile: NextPage<Props> = ({ profile, market }) => {
  const router = useRouter();
  const { username } = router.query;

  const [theme] = useObservable(themeStore);

  const oneMonthAgo = new Date().setDate(new Date().getDate() - 30);

  const {
    copyDiscordTag,
    type,
    setType
  } = ProfileHandler();

  const {
    inventory,
    totalItemCount,
    filteredItems,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues
  } = FilterHandler(FILTER_TYPE.MARKET, 50, type === MARKET_TYPE.OFFER ? market.offers : market.wishes, type, setType);

  const {
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails,
    capitalizeFirstLetter
  } = ItemsHandler();

  const getLastUpdated = () => {
    // don't execute this before the app service has loaded
    if (typeof dayjs().to !== 'function') {
      return '';
    }
    return dayjs().to(dayjs(market.lastUpdated));
  };

  return (
    <>
      <CustomHeader
        title={profile.username ? `WitchTrade | ${profile.displayName}` : `${username} does not exist`}
        description={profile.username ? `${profile.displayName} has ${market.offers.length} offer${market.offers.length === 1 ? '' : 's'} available on their market.` : `${username} does not exist`}
        url={`https://witchtrade.org/@/${username}`}
      />
      {profile.username &&
        <>
          <ItemDetailDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} item={selectedItem} inventory={inventory} capitalizeFirstLetter={capitalizeFirstLetter} />
          <div className="flex flex-col justify-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex justify-center items-center pt-3">
              <p className="text-center text-3xl font-bold text-wt-accent">{profile.displayName}</p>
              {profile.verified &&
                <Link href="/faq">
                  <a className="flex items-center">
                    <Tooltip text="Verified">
                      <div className="ml-1 h-6 w-6 flex items-center">
                        <Verified />
                      </div>
                    </Tooltip>
                  </a>
                </Link>
              }
            </div>
            <p className="text-center text-sm -mt-1">@{profile.username}</p>
            <div className="flex flex-wrap justify-center items-stretch mt-2">
              {profile.badges && profile.badges.length > 0 &&
                <div className="flex flex-col justify-evenly rounded-lg border border-wt-accent p-2 m-1 bg-wt-surface-dark">
                  <p className="text-center font-bold">Badges</p>
                  <div className="flex flex-wrap justify-center items-center">
                    {profile.badges.map(badge => (
                      <Tooltip key={badge.id} text={badge.description}>
                        <div className="m-1 h-9 w-9">
                          <Image src={`/assets/svgs/badges/${badge.id}.svg`} height={36} width={36} alt={badge.description} />
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              }
              <div className="flex flex-col justify-evenly rounded-lg border border-wt-accent p-2 m-1 bg-wt-surface-dark">
                <p className="text-center font-bold">Steam</p>
                <div className="flex flex-wrap justify-center items-center">
                  {profile.steamProfileLink &&
                    <div className="flex flex-col items-center my-1 mx-2">
                      <Tooltip text="Click to open">
                        <Link href={profile.steamProfileLink}>
                          <a target="_blank" rel="noreferrer">
                            <div className="h-9 w-9 rounded-full bg-wt-surface p-1 hover:bg-wt-accent transition duration-100 transform hover:scale-110 cursor-pointer">
                              <Image src={`/assets/svgs/steam/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height={36} width={36} alt="Steam Profile Link" />
                            </div>
                          </a>
                        </Link>
                      </Tooltip>
                      <div className="flex mt-1">
                        <p className="text-sm">Profile</p>
                        {profile.verifiedSteamProfileLink &&
                          <div className="flex items-center h-5 w-5 ml-1">
                            <div className="h-4 w-4">
                              <Verified />
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  }
                  {profile.steamTradeLink &&
                    <div className="flex flex-col items-center my-1 mx-2">
                      <Tooltip text="Click to open">
                        <Link href={profile.steamTradeLink}>
                          <a target="_blank" rel="noreferrer">
                            <div className="h-9 w-9 rounded-full bg-wt-surface p-1 hover:bg-wt-accent transition duration-100 transform hover:scale-110 cursor-pointer">
                              <Image src={`/assets/svgs/steam/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height={36} width={36} alt="Steam Trade link" />
                            </div>
                          </a>
                        </Link>
                      </Tooltip>
                      <p className="text-sm mt-1">Trade link</p>
                    </div>
                  }
                </div>
                <div className="flex justify-center items-center">
                  {profile.usingSteamGuard &&
                    <Image src="/assets/svgs/booleanIcons/lock.svg" height={14} width={14} alt="Lock" />
                    ||
                    <Image src="/assets/svgs/booleanIcons/warning.svg" height={14} width={14} alt="Warning" />
                  }
                  <p className="text-center text-sm ml-1">{profile.usingSteamGuard ? 'Uses Steam Guard' : 'Doesn\'t use Steam Guard'}</p>
                </div>
              </div>
              {profile.discordTag &&
                <div className="flex flex-col justify-evenly rounded-lg border border-wt-accent p-2 m-1 bg-wt-surface-dark">
                  <p className="text-center font-bold">Discord Tag</p>
                  <div className="flex flex-wrap justify-center items-center">
                    <div className="flex flex-col items-center m-1">
                      <Tooltip text="Click to copy">
                        <div className="h-9 w-9 rounded-full bg-wt-surface p-1 hover:bg-wt-accent transition duration-100 transform hover:scale-110 cursor-pointer" onClick={() => copyDiscordTag(profile.discordTag)}>
                          <Image src={`/assets/svgs/discord/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height={36} width={36} alt="Steam Profile" />
                        </div>
                      </Tooltip>
                      <p className="text-sm mt-1">{profile.discordTag}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
            {profile.hidden &&
              <div className="rounded-lg bg-wt-error mt-2 p-1">
                <p className="text-2xl font-bold text-center">Hidden profile</p>
                <p className="text-xl text-center">{profile.displayName} has hidden their profile and is probably not trading at the moment.</p>
              </div>
            }
            {new Date(market.lastUpdated).getTime() < oneMonthAgo &&
              <div className="rounded-lg bg-wt-warning mt-2 p-1">
                <p className="text-2xl font-bold text-center">Outdated offers</p>
                <p className="text-xl text-center">{profile.displayName} has not updated their market for over 30 days.</p>
              </div>
            }
            <p className="text-center mt-4 mb-1">Market updated: <span className="text-wt-accent">{getLastUpdated()}</span></p>
            <MarketNav market={market} type={type} setType={setType} />
            {((type === MARKET_TYPE.OFFER && market.offerlistNote) || (type === MARKET_TYPE.WISH && market.wishlistNote)) &&
              <div className="rounded-lg bg-wt-surface-dark mt-2 border-2 border-wt-accent p-1">
                <ReactMarkdown className="markdown-content break-words" components={MarkdownComponents}>{type === MARKET_TYPE.OFFER ? emojified(market.offerlistNote) : emojified(market.wishlistNote)}</ReactMarkdown>
              </div>
            }
          </div>
          <div className="w-full my-2">
            <ItemFilter itemFilterValues={itemFilterValues} setItemFilterValues={setItemFilterValues} initialOpen={false} type={FILTER_TYPE.MARKET} />
          </div>
          <p className="text-center mt-2">
            <span className="text-wt-accent font-bold">
              {totalItemCount}
            </span> {type === MARKET_TYPE.OFFER ? 'offer' : 'wishlist item'}
            {totalItemCount === 1 ? '' : 's'}
            {totalItemCount !== filteredItems.length ? (
              <> in total, <span className="text-wt-accent font-bold">
                {filteredItems.length}
              </span> filtered</>) : ''}
          </p>
          <InfiniteScroll
            className="flex flex-row flex-wrap justify-center py-2 h-full mx-6"
            dataLength={loadedItems.length}
            next={loadMoreItems}
            hasMore={hasMoreItems()}
            loader={<p></p>}
          >
            {loadedItems.map((item) => (
              <TradeView key={item.id} type={type === MARKET_TYPE.OFFER ? TRADE_TYPE.PROFILE_OFFER : TRADE_TYPE.PROFILE_WISH} trade={item} inventory={inventory} openItemDetails={openItemDetails} />
            ))}
          </InfiniteScroll>
        </>
        ||
        <div className="flex flex-col items-center">
          <p className="text-center text-xl font-bold pt-3">User <span className="text-wt-accent">{username}</span> does not exist</p>
          <div>
            <Image src="/assets/images/userNotFound.gif" height={173} width={635} alt="THL GIF" />
          </div>
        </div>
      }
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const username = context.query.username;
  const { profile, market } = await fetchProfile(username as string);
  return { props: { profile, market } };
}

const fetchProfile = async (username: string) => {
  let profile = createUserInfo({});
  let market = createMarket({});

  const profileRes = await firstValueFrom(userService.fetchProfile(username));
  profile = await profileRes.json();

  const marketRes = await firstValueFrom(userService.fetchProfileMarket(username));
  market = await marketRes.json();

  return { profile, market };
};

export default Profile;
