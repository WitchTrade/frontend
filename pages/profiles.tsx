import type { NextPage, } from 'next';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { firstValueFrom } from 'rxjs';
import CustomHeader from '../components/core/CustomHeader';
import Divider from '../components/styles/Divider';
import PageHeader from '../components/styles/PageHeader';
import TextInput from '../components/styles/TextInput';
import Tooltip from '../components/styles/Tooltip';
import Verified from '../components/styles/VerifiedSvg';
import ProfilesHandler from '../shared/handlers/profiles.handler';
import { getItemRarities, itemRarityToColor } from '../shared/stores/items/items.store';
import { createPreviewMarket, PreviewMarket } from '../shared/stores/markets/market.model';
import { marketsService } from '../shared/stores/markets/markets.service';

interface Props {
  profiles: PreviewMarket[];
}

const Profiles: NextPage<Props> = ({ profiles }) => {

  const {
    loadedProfiles,
    loadMoreProfiles,
    hasMoreProfiles,
    searchValue,
    setSearchValue
  } = ProfilesHandler(profiles.sort((a, b) => {
    let sortValue = b.offerCount - a.offerCount;
    sortValue = (a.verified === b.verified) ? sortValue : a.verified ? -1 : 1;
    return sortValue;
  }));

  return (
    <>
      <CustomHeader
        title="WitchTrade | Profiles"
        description={`There are ${profiles.length} users with offers on WitchTrade.`}
        url="https://witchtrade.org/profiles"
      />
      <PageHeader title="Profiles" />
      <div className="flex justify-center mb-2">
        <TextInput type="text" placeholder="Search for user" required={false} value={searchValue} setValue={setSearchValue} clearOption={true} />
      </div>
      <InfiniteScroll
        className="flex flex-wrap justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10"
        dataLength={loadedProfiles.length}
        next={loadMoreProfiles}
        hasMore={hasMoreProfiles()}
        loader={<p></p>}
      >
        {loadedProfiles.map((profile, i) => (
          <Link key={i} href={`/@/${profile.username}`}>
            <a>
              <div className="flex flex-col justify-between text-center bg-wt-surface-dark border border-wt-accent m-2 pt-1 pb-2 px-2 rounded-lg w-56 transition duration-100 transform hover:scale-105 cursor-pointer shadow-lg">
                <div className="flex justify-center items-center">
                  <p className="text-center text-lg font-bold text-wt-accent">{profile.displayName}</p>
                  {profile.verified &&
                    <Tooltip text="Verified">
                      <div className="ml-1 h-5 w-5 flex items-center">
                        <Verified />
                      </div>
                    </Tooltip>
                  }
                </div>
                <div className="mx-4 my-1">
                  <Divider />
                </div>
                <p>{profile.offerCount} offers</p>
                <div className="flex flex-wrap justify-center mt-1">
                  {profile.offers.slice().sort((a, b) => {
                    return getItemRarities().indexOf(b.rarity) - getItemRarities().indexOf(a.rarity);
                  }).map((offer) => (
                    <div key={offer.rarity} className="rounded-full text-center flex justify-center items-center mr-1 px-1" style={{ minWidth: '25px', height: '25px', backgroundColor: itemRarityToColor(offer.rarity) }}>
                      <p className="font-bold text-xs text-wt-dark">{offer.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </InfiniteScroll>
    </>
  );
};

export async function getServerSideProps() {
  const profiles = await fetchProfiles();
  return { props: { profiles } };
}

const fetchProfiles = async () => {
  let profiles = createPreviewMarket({});

  const profilesRes = await firstValueFrom(marketsService.fetchAllMarkets());
  profiles = await profilesRes.json();

  return profiles;
};

export default Profiles;
