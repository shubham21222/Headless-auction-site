import path from "path";
import fs from "fs/promises";

export default async function handler(req, res) {
  const { country } = req.query;

  try {
    // Load the JSON file from the public directory
    const filePath = path.join(process.cwd(), "public", "countries.json");
    const data = await fs.readFile(filePath, "utf-8");
    const countryData = JSON.parse(data);

    // Replace hyphens with spaces and normalize the search query
    const normalizedSearchQuery = country
      .replace(/-/g, " ") // Replace hyphens with spaces
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " "); // Replace multiple spaces with single space

    // Helper function to normalize country names for comparison
    const normalizeCountryName = (name) => {
      return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
    };

    // Find the matching country using flexible matching
    const matchedCountry = Object.keys(countryData).find(key => {
      const normalizedKey = normalizeCountryName(key);

      // Normalize both the query and key for comparison
      const normalizedKeyWithoutSuffix = normalizedKey.replace(" auctions", "");
      const normalizedQueryWithoutSuffix = normalizedSearchQuery.replace(" auctions", "");

      return (
        normalizedKey == normalizedSearchQuery || // Exact match
        normalizedKeyWithoutSuffix == normalizedQueryWithoutSuffix // Match without auction suffix
      );
    });

    if (!matchedCountry) {
      // Log for debugging
      console.log("Search query:", normalizedSearchQuery);
      console.log("Available countries:", Object.keys(countryData).map(normalizeCountryName));
      return res.status(404).json({
        error: `No data found for country: ${country}`,
        searchedFor: normalizedSearchQuery
      });
    }

    const states = Object.keys(countryData[matchedCountry]);
    res.status(200).json(states);
  } catch (error) {
    console.error("Error reading JSON:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}