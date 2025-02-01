import { getServerSideSitemap } from 'next-sitemap'
import keywordsData from '../../../public/keywords.json'

export default async function handler(req, res) {
  try {
    const baseUrl = 'https://auction.nyelizabeth.com'
    const fields = []

    // Add static/main pages
    fields.push({
      loc: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    })

    // Add country-state-city pages
    const countries = [
      'united-states-auction',
      'canada-auction',
      // Add all your countries here
    ]

    // Add country level pages
    for (const country of countries) {
      // Add country page
      fields.push({
        loc: `${baseUrl}/Country/${country}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.9,
      })

      try {
        // Fetch states for each country
        const normalizedCountry = country.replace(/-auction$/, '').toLowerCase()
        const statesResponse = await fetch(
          `${baseUrl}/api/countries?country=${encodeURIComponent(normalizedCountry)}`
        )
        const states = await statesResponse.json()

        // Add state level pages
        for (const state of states) {
          const stateSlug = state.toLowerCase().replace(/\s+/g, '-')
          fields.push({
            loc: `${baseUrl}/${country}/${stateSlug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.8,
          })

          // Fetch cities for each state
          try {
            const citiesResponse = await fetch(
              `${baseUrl}/api/cities?country=${country}&state=${stateSlug}`
            )
            const cities = await citiesResponse.json()

            // Add city level pages
            if (Array.isArray(cities)) {
              for (const city of cities) {
                const citySlug = encodeURIComponent(city.toLowerCase().replace(/\s+/g, '-'))
                fields.push({
                  loc: `${baseUrl}/${country}/${stateSlug}/${citySlug}`,
                  lastmod: new Date().toISOString(),
                  changefreq: 'daily',
                  priority: 0.7,
                })
              }
            }
          } catch (error) {
            console.error(`Error fetching cities for ${state}:`, error)
          }
        }
      } catch (error) {
        console.error(`Error fetching states for ${country}:`, error)
      }
    }

    // Add category pages and their keywords
    for (const [category, keywords] of Object.entries(keywordsData)) {
      // Add category page
      const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
      fields.push({
        loc: `${baseUrl}/category/${categorySlug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.8,
      })

      // Add keyword pages
      for (const keyword of keywords) {
        const keywordSlug = keyword.toLowerCase().replace(/\s+/g, '-')
        fields.push({
          loc: `${baseUrl}/products/${keywordSlug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.6,
        })
      }
    }

    // Handle special characters in URLs
    const normalizeUrl = (url) => {
      return url
        .replace(/%C4%AB/g, 'i')  // Replace ī
        .replace(/%E1%B8%A9/g, 'h')  // Replace ḩ
        .replace(/%C4%81/g, 'a')  // Replace ā
    }

    // Normalize all URLs
    fields.forEach(field => {
      field.loc = normalizeUrl(field.loc)
    })

    return getServerSideSitemap(req, res, fields)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).json({ error: 'Error generating sitemap' })
  }
}

// Prevent next.js from trying to execute this on build
export const getServerSideProps = async () => {
  return {
    props: {},
  }
}