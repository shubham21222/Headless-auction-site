import Link from "next/link";
import data from "../assets/Countries.json"; // Path to your JSON file

// Extract unique country names
const transformData = (data) => {
  const countries = new Set();
  data["Country , states, citites"].forEach((item) => {
    if (item["Country Name"]) {
      countries.add(item["Country Name"]);
    }
  });
  return Array.from(countries);
};

const countries = transformData(data);

const CategoryCountry = () => {
  return (
    <section className="p-6 container mx-auto max-w-screen-2xl">
      <h2 className="font-bold text-2xl mb-4">Category Countries</h2>
      <div className="h-1 w-16 bg-yellow-500 mx-auto lg:mx-0 mb-6"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {countries.map((country) => (
          <Link
            key={country}
            href={`/Country/${country.toLowerCase().replace(/\s+/g, "-")}`}
            className={`${
              country.toLowerCase() == "united states auction"
                ? "text-green-600 font-semibold"
                : "text-blue-600 hover:underline"
            }`}
          >
            {country}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryCountry;
