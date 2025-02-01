export default function handler(req, res) {
    res.send(`
      User-agent: *
      Allow: /
      
      Sitemap: https://auction.nyelizabeth.com/sitemap.xml
      Sitemap: https://auction.nyelizabeth.com/api/sitemap.xml
    `)
  }