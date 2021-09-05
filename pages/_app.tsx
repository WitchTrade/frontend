import '../styles/global.scss';

import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/core/Layout';
import appService from '../shared/services/appService';

function WitchTrade({ Component, pageProps }: AppProps) {
  useEffect(() => {
    appService.init();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default WitchTrade;
