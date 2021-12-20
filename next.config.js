/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  async redirects() {
    return [
      {
        source: '/user/settings',
        destination: '/user/settings/customization',
        permanent: true,
      },
      {
        source: '/items/odd_mushroom',
        destination: '/items?tradeableOnly=true&itemCharacter=3&itemSlot=2-3-4-5-11&itemRarity=5-6-7',
        permanent: false,
      },
      {
        source: '/items/rusty_nails',
        destination: '/items?tradeableOnly=true&itemCharacter=2&itemSlot=3-4-5-7-8-9-10&itemRarity=5-6-7',
        permanent: false,
      },
      {
        source: '/items/shell',
        destination: '/items?tradeableOnly=true&itemSlot=2-3-4-5-6-7-8-9-10-11&itemEvent=10&itemRarity=5-6-7',
        permanent: false,
      },
      {
        source: '/items/ectoplasm',
        destination: '/items?tradeableOnly=true&itemSlot=2-3-4-5-6-7-8-9-10-11&itemEvent=3-4-5-6&itemRarity=5-6-7',
        permanent: false,
      },
      {
        source: '/items/red_string',
        destination: '/items?tradeableOnly=true&itemSlot=2-3-4-5-6-7-8-9-10-11&itemEvent=11&itemRarity=5-6-7',
        permanent: false,
      },
      {
        source: '/items/coin',
        destination: '/items?tradeableOnly=true&itemSlot=2-3-4-5-6-7-8-9-10-11&itemEvent=8&itemRarity=5-6-7',
        permanent: false,
      },
      {
        source: '/items/candy_cane',
        destination: '/items?tradeableOnly=true&itemSlot=2-3-4-5-6-7-8-9-10-11&itemEvent=12-13-14-15-16&itemRarity=5-6-7',
        permanent: false,
      },
      {
        source: '/items/morgaryll_flower',
        destination: '/items?tradeableOnly=true&itemSlot=2-3-4-5-6-7-8-9-10-11&itemEvent=18&itemRarity=5-6-7',
        permanent: false,
      },
      {
        source: '/items/scarab',
        destination: '/items?tradeableOnly=true&itemSlot=2-3-4-5-6-7-8-9-10-11&itemEvent=7&itemRarity=5-6-7',
        permanent: false,
      }
    ];
  },
  images: {
    domains: ['www.witchit.com']
  }
};
