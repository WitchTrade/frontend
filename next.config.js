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
    ];
  },
  images: {
    domains: ['www.witchit.com']
  },
  future: { webpack5: true }
};
