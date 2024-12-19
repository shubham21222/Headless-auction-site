import path from "path";
import fs from "fs/promises";

export default async function handler(req, res) {
  const { country, state } = req.query;

  if (!country || !state) {
    return res.status(400).json({
      error: "Both country and state parameters are required."
    });
  }

  try {
    // Load the JSON file from the public directory
    const filePath = path.join(process.cwd(), "public", "countries.json");
    const data = await fs.readFile(filePath, "utf-8");
    const countryData = JSON.parse(data);

    // Helper function to normalize strings for comparison
    const normalizeString = (str) => {
      return str
        .toLowerCase()
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .replace(" auctions", "")
        .trim()
        // Remove diacritical marks
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    };

    // Normalize the search queries
    const normalizedCountryQuery = normalizeString(country);
    const normalizedStateQuery = normalizeString(state);

    // Find the matching country
    const matchedCountry = Object.keys(countryData).find(key => {
      return normalizeString(key) === normalizedCountryQuery;
    });

    if (!matchedCountry) {
      // Log for debugging
      console.log("Searching for country:", normalizedCountryQuery);
      console.log("Available countries:", Object.keys(countryData).map(normalizeString));
      
      return res.status(404).json({
        error: `No data found for country: ${country}`,
        searchedFor: normalizedCountryQuery
      });
    }

    // Find the matching state in the country
    const matchedState = Object.keys(countryData[matchedCountry]).find(key => {
      // Log for debugging
      console.log("Comparing:", {
        normalized: normalizeString(key),
        query: normalizedStateQuery
      });
      
      return normalizeString(key) == normalizedStateQuery;
    });

    if (!matchedState) {
      // Log available states for debugging
      console.log("Searching for state:", normalizedStateQuery);
      console.log("Available states:", Object.keys(countryData[matchedCountry]).map(normalizeString));
      
      return res.status(404).json({
        error: `No data found for state: ${state} in country: ${country}`,
        searchedFor: {
          country: normalizedCountryQuery,
          state: normalizedStateQuery
        },
        availableStates: Object.keys(countryData[matchedCountry])
      });
    }

    // Get the cities for the matched state
    const cities = countryData[matchedCountry][matchedState];

    // Return the sorted list of cities
    res.status(200).json(
      Array.isArray(cities) ? cities.sort() : []
    );

  } catch (error) {
    console.error("Error reading JSON:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}