import Head from 'next/head';
import { FunctionComponent } from 'react';

const DefaultHeader: FunctionComponent = () => {
    return (
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name="theme-color" content="#1F2937" />

            <meta property="og:type" content="website" />

            <meta property="twitter:card" content="summary" />

            <link rel="manifest" href="/manifest.json" />

            <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
    );
};

export default DefaultHeader;