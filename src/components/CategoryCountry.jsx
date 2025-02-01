'use client'
import Link from "next/link";
import dynamic from "next/dynamic";
import data from "../assets/Countries.json"; // Path to your JSON file

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const transformData = (data) => {
  const countries = new Set();
  data["Country , states, citites"].forEach((item) => {
    if (item["Country Name"]) {
      countries.add(item["Country Name"]);
    }
  });
  return Array.from(countries);
};

const countryCoordinates = {
  "Luxembourg auction": { lat: 49.8153, lng: 6.1296 },
  "Macao auction": { lat: 22.1987, lng: 113.5439 },
  "Ireland auction": { lat: 53.4129, lng: -8.2439 },
  "Singapore auction": { lat: 1.3521, lng: 103.8198 },
  "Qatar auction": { lat: 25.3548, lng: 51.1839 },
  "United Arab Emirates auction": { lat: 23.4241, lng: 53.8478 },
  "Switzerland auction": { lat: 46.8182, lng: 8.2275 },
  "Norway auction": { lat: 60.472, lng: 8.4689 },
  "United States auction": { lat: 37.0902, lng: -95.7129 },
  "Brunei auction": { lat: 4.5353, lng: 114.7277 },
  "Hong Kong auction": { lat: 22.3193, lng: 114.1694 },
  "San Marino auction": { lat: 43.9336, lng: 12.4508 },
  "Iceland auction": { lat: 64.9631, lng: -19.0208 },
  "Denmark auction": { lat: 56.2639, lng: 9.5018 },
  "Australia auction": { lat: -25.2744, lng: 133.7751 },
  "Netherlands auction": { lat: 52.1326, lng: 5.2913 },
  "Austria auction": { lat: 47.5162, lng: 14.5501 },
  "Sweden auction": { lat: 60.1282, lng: 18.6435 },
  "Germany auction": { lat: 51.1657, lng: 10.4515 },
  "Belgium auction": { lat: 50.8503, lng: 4.3517 },
  "Finland auction": { lat: 61.9241, lng: 25.7482 },
  "Canada auction": { lat: 56.1304, lng: -106.3468 },
  "France auction": { lat: 46.6034, lng: 1.8883 },
  "United Kingdom auction": { lat: 55.3781, lng: -3.436 },
  "New Zealand auction": { lat: -40.9006, lng: 174.886 },
  "Japan auction": { lat: 36.2048, lng: 138.2529 },
  "Israel auction": { lat: 31.0461, lng: 34.8516 },
  "Italy auction": { lat: 41.8719, lng: 12.5674 },
  "South Korea auction": { lat: 35.9078, lng: 127.7669 },
  "Spain auction": { lat: 40.4637, lng: -3.7492 },
  "Malta auction": { lat: 35.8997, lng: 14.5146 },
  "Czechia auction": { lat: 49.8175, lng: 15.473 },
  "Portugal auction": { lat: 39.3999, lng: -8.2245 },
  "Slovakia auction": { lat: 48.669, lng: 19.699 },
  "Lithuania auction": { lat: 55.1694, lng: 23.8813 },
  "Slovenia auction": { lat: 46.1512, lng: 14.9955 },
  "Latvia auction": { lat: 56.8796, lng: 24.6032 },
  "Estonia auction": { lat: 58.5953, lng: 25.0136 },
  "Poland auction": { lat: 51.9194, lng: 19.1451 },
  "Hungary auction": { lat: 47.1625, lng: 19.5033 },
  "Greece auction": { lat: 39.0742, lng: 21.8243 },
  "Cyprus auction": { lat: 35.1264, lng: 33.4299 },
  "Croatia auction": { lat: 45.1, lng: 15.2 },
  "Turkey auction": { lat: 38.9637, lng: 35.2433 },
  "Chile auction": { lat: -35.6751, lng: -71.543 },
  "Malaysia auction": { lat: 4.2105, lng: 101.9758 },
  "Thailand auction": { lat: 15.870, lng: 100.992 },
  "Argentina auction": { lat: -38.4161, lng: -63.6167 },
  "China auction": { lat: 35.8617, lng: 104.1954 },
  "South Africa auction": { lat: -30.5595, lng: 22.9375 },
  "Uruguay auction": { lat: -32.5228, lng: -55.7658 },
  "Romania auction": { lat: 45.9432, lng: 24.9668 },
  "Mexico auction": { lat: 23.6345, lng: -102.5528 },
  "Kazakhstan auction": { lat: 48.0196, lng: 66.9237 },
  "Bulgaria auction": { lat: 42.7339, lng: 25.4858 },
  "Panama auction": { lat: 8.538, lng: -80.7821 },
  "Costa Rica auction": { lat: 9.7489, lng: -83.7534 }
};


const countries = transformData(data);

const CategoryCountry = () => {
  return (
    <div className="w-full bg-black py-8">
      <section className="p-6 mx-auto max-w-screen-2xl">
        {/* Heading Section */}
        <div className="text-start mx-auto">
          <h2 className="font-bold text-2xl mb-4 text-white">NY Elizabeth Auctions</h2>
          <div className="h-1 w-16 bg-yellow-500 mb-6"></div>
        </div>

        {/* Map */}
        <div className="w-full bg-gray-900 rounded-lg overflow-hidden mb-8">
          <Map coordinates={countryCoordinates} />
        </div>

        {/* Country Links */}
        <div className="flex flex-wrap gap-4">
          {countries.map((country) => (
            <Link
              key={country}
              href={`/Country/${country.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-sm font-bold px-4 py-2 rounded-full  px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl${
                country.toLowerCase() === "united states auction"
                  ? "bg-gray-900 hover:bg-gray-800 font-semibold"
                  : "text-gray-300 bg-gray-900 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {country}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryCountry;