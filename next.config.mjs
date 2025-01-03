/** @type {import('next').NextConfig} */
const nextConfig = {

  async redirects() {
    return [
      {
        source: '/auctions', // The route to be redirected
        destination: '/find-auctions-near-me', // The target route
        permanent: true, // Indicates a 301 (permanent) redirect
      },
    ];
  },
  images: {
    domains: ['www.auctionzip.com', 'auction.nyelizabeth.com', 'beta.nyelizabeth.com', 'images.liveauctioneers.com', 'p1.liveauctioneers.com'], // Add other domains if needed
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'https://auction.nyelizabeth.com/graphql',
      },
    ];
  },
};

export default nextConfig;
