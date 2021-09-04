import type { NextPage } from 'next';
import CustomHeader from '../components/core/CustomHeader';

const Home: NextPage = () => {
  return (
    <div>
      <CustomHeader
        title="WitchTrade"
        description="A Witch It trading website."
        url="https://witchtrade.org"
        image="https://imgur.com/WmcszU3.png"
      />
      <p className="text-4xl text-wt-5 font-bold">Index page</p>
    </div>
  );
};

export default Home;
