import data from "../../public/countries.json";

export const processCountryData = () => {
  const stateMap = {};

  // Collect all entries for each country
  data["Country , states, citites"].forEach((item) => {
    const countryName = item["Country Name"]
      ? item["Country Name"].toLowerCase().trim()
      : null;

    const stateName = item["Admin/State Name"]
      ? item["Admin/State Name"].trim()
      : null;

    if (countryName) {
      if (!stateMap[countryName]) {
        stateMap[countryName] = new Set();
      }

      if (stateName) {
        stateMap[countryName].add(stateName);
      }
    }
  });

  // Convert sets to arrays for easier manipulation
  const processedMap = {};

  Object.keys(stateMap).forEach((country) => {
    processedMap[country] = Array.from(stateMap[country]).sort();
  });

  return processedMap;
};

export const getStatesByCountry = (countryName) => {
  const processedMap = processCountryData();

  const normalizedCountry = countryName.toLowerCase().trim();
  const matchedCountry = Object.keys(processedMap).find(
    (country) => country === normalizedCountry
  );

  return matchedCountry ? processedMap[matchedCountry] : [];
};
