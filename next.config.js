// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/dashboard',
          destination: '/',
          permanent: true,
        },
      ];
    },
  };
  