import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/core/Layout';

function WitchTrade({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default WitchTrade;
