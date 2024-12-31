/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['www.auctionzip.com','auction.nyelizabeth.com','beta.nyelizabeth.com'], // Add other domains if needed
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
  