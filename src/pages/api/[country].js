// pages/api/location/[country].js
import countries from '../../../public/structured_countries.json';

// Helper function to delay between requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get coordinates for a location
async function getCoordinates(stateName, countryName) {
  // Remove 'auctions' from state name for better geocoding
  const cleanStateName = stateName.replace(' auctions', '');
  // Create search query with country context
  const query = `${cleanStateName}, ${countryName.replace(' auction', '')}`;
  
  const nominatimUrl = `https://nominatim.openstreetmap.org/search?` + 
    new URLSearchParams({
      q: query,
      format: 'json',
      limit: '1',
      addressdetails: '1'
    }).toString();

  console.log('Fetching coordinates for:', query);

  const response = await fetch(nominatimUrl, {
    headers: {
      'User-Agent': 'YourApp/1.0 (your@email.com)', // Replace with your contact
      'Accept-Language': 'en'
    }
  });

  const data = await response.json();
  
  if (data && data.length > 0) {
    return {
      coordinates: {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      },
      display_name: data[0].display_name,
      type: data[0].type
    };
  }
  
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { country } = req.query;
    
    // Normalize the search term
    const searchTerm = decodeURIComponent(country)
      .replace(/-/g, ' ')
      .trim()
      .toLowerCase();

    console.log('Searching for:', searchTerm);

    // Find the country data
    let countryData = null;

    for (let i = 0; i < Object.keys(countries).length; i++) {
      const entry = countries[i];
      const countryName = Object.keys(entry)[0].toLowerCase();
      
      if (countryName === searchTerm) {
        countryData = entry;
        break;
      }
    }

    if (!countryData) {
      return res.status(404).json({ 
        message: 'Country not found',
        requestedCountry: searchTerm
      });
    }

    // Get the country name and states data
    const countryName = Object.keys(countryData)[0];
    const statesData = countryData[countryName];
    
    // Process each state and get coordinates
    const processedStates = [];
    for (const stateObj of statesData) {
      const [[stateName, cities]] = Object.entries(stateObj);
      
      // Get coordinates for the state
      const stateLocation = await getCoordinates(stateName, countryName);
      
      // Wait 1 second between requests to respect Nominatim's rate limit
      await delay(1000);
      
      processedStates.push({
        name: stateName,
        location: stateLocation,
        cities: cities
      });
    }

    return res.status(200).json({
      country: countryName,
      states: processedStates
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message
    });
  }
}