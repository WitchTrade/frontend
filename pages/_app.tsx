import '../styles/global.scss';

import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/core/Layout';
import themeService from '../shared/services/themeService';

function WitchTrade({ Component, pageProps }: AppProps) {
  useEffect(() => {
    themeService.init();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default WitchTrade;
