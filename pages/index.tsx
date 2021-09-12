import type { NextPage } from 'next';
import CustomHeader from '../components/core/CustomHeader';

const Home: NextPage = () => {
  return (
    <div>
      <CustomHeader />
      <p className="text-4xl font-bold text-center">Index page</p>
    </div>
  );
};

export default Home;
