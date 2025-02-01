/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://auction.nyelizabeth.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    generateIndexSitemap: true,
    outDir: 'public',
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://auction.nyelizabeth.com/api/sitemap.xml',
      ],
    },
  }