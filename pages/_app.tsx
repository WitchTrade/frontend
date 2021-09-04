import '../styles/global.scss';

import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/core/Layout';
import themeManager from '../shared/managers/themeManager';

function WitchTrade({ Component, pageProps }: AppProps) {
  useEffect(() => {
    themeManager.init();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default WitchTrade;
