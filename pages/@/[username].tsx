import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { firstValueFrom } from 'rxjs';
import CustomHeader from '../../components/core/CustomHeader';
import PageHeader from '../../components/styles/PageHeader';
import { createMarket, Market } from '../../shared/stores/markets/market.model';
import { createUserInfo, UserInfo } from '../../shared/stores/user/user.model';
import { userService } from '../../shared/stores/user/user.service';

interface Props {
  profile: UserInfo;
  market: Market;
}

const Profile: NextPage<Props> = ({ profile, market }) => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <CustomHeader
        title={profile.username ? `WitchTrade | ${profile.displayName}` : `${username} does not exist`}
        description={profile.username ? `${profile.displayName} has ${market.offers.length} offers available on their market.` : `${username} does not exist`}
        url={`https://witchtrade.org/@/${username}`}
      />
      {profile.username &&
        <div>
          <PageHeader title={profile.displayName} />
        </div>
      }
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const username = context.query.username;
  console.log(username);
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
