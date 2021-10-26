import Head from 'next/head';
import { FunctionComponent } from 'react';

type Props = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

const CustomHeader: FunctionComponent<Props> = ({ title = 'WitchTrade', description = 'A Witch It trading website.', url = 'https://witchtrade.org', image = 'https://i.imgur.com/7xoVxLR.png' }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default CustomHeader;
