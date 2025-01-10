import React from "react";
import Image from "next/image";

const brands = [
  {
    name: "Rolex",
    logo: "https://beta.nyelizabeth.com/wp-content/uploads/2024/03/Group-5.png",
  },
  {
    name: "Hermès Paris",
    logo: "https://beta.nyelizabeth.com/wp-content/uploads/2024/03/Hermes-1.png",
  },
  {
    name: "Patek Philippe",
    logo: "https://beta.nyelizabeth.com/wp-content/uploads/2024/03/i.webp",
  },
  {
    name: "Louis Vuitton",
    logo: "https://beta.nyelizabeth.com/wp-content/uploads/2024/03/Louis_Vuitton_logo-1.png",
  },
];

const TrendingBrands = () => {
  return (
    <section className="py-10 px-4 container mx-auto max-w-screen-2xl">
      <div className="text-start mb-6">
        <h2 className="text-3xl font-bold">Trending Brands</h2>
        <div className="w-16 h-1 bg-yellow-500 mt-2"></div>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-gray-100 shadow rounded-lg p-4 flex items-center justify-center"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={150}
              height={100}
              className="object-contain"
              style={{
                width: "auto", // Ensures the image keeps its aspect ratio
                height: "auto",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingBrands;
