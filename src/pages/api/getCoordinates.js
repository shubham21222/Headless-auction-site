import fetch from 'node-fetch';

const API_KEY = "da06ed928b8046e98c2d574d27ea6b16"; // OpenCage API Key

export default async function handler(req, res) {
  try {
    const { states, country } = req.body; // Expect `states` and `country` in the request body

    if (!states || !Array.isArray(states) || !country) {
      return res.status(400).json({ error: "Invalid request. Provide states and country." });
    }

    // Fetch coordinates for each state
    const coordinatesPromises = states.map(async (state) => {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(state + ", " + country)}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { name: state, latitude: lat, longitude: lng };
      }
      return null;
    });

    const coordinates = await Promise.all(coordinatesPromises);

    // Filter out any null results (failed geocoding)
    const filteredCoordinates = coordinates.filter(coord => coord !== null);

    return res.status(200).json(filteredCoordinates);
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
