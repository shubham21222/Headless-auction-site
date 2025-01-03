"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Header2 from "@/components/Header2";
import DynamicAboutSection from "@/components/DynamicAboutSection";
import { FaHome } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import Link from "next/link";
import AuctionSection2 from "@/components/AboutSection2";
import AuctionSection3 from "@/components/AuctionSection3";

export default function CityPage() {
  const { slug, statename, cityname } = useParams();

  const decodeCityName = (name) => {
    return decodeURIComponent(name)
      .replace(/-/g, ' ')
      .replace(/'s?/g, "'") // Fixes apostrophes and plural
      .replace(/\b(?:auction|auctions)\b/i, '') // Removes "auction" or "auctions"
      .trim();
  };
    
  
  // const displaycity = decodeURIComponent(params.statename)
  // .replace(/-/g, " ")
  // .replace(" auctions", "");


  // Update the formatting:
  const formattedCityName = decodeCityName(cityname);
  const formattedStateName = decodeCityName(statename);
  const formattedCountryName = decodeCityName(slug);


  return (
    <>
      <Header2 />
      <main className="container mx-auto px-4 py-8 mt-[80px]">
        <div className="min-h-screen bg-gray-50">

          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 py-4">
              {/* Home Link */}
              <Link
                href="/"
                className="flex items-center hover:text-blue-600 transition duration-200 space-x-1"
              >
                <FaHome className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <HiChevronRight className="text-gray-400 mx-2" />

              {/* Country Link */}
              <Link
                href={`/Country/${slug}`}
                className="hover:text-blue-600 transition duration-200 capitalize"
              >
                {formattedCountryName}
              </Link>
              <HiChevronRight className="text-gray-400 mx-2" />

              {/* State */}
              <Link
                href={`/${slug}/${statename}`}
                className="hover:text-blue-600 transition duration-200 capitalize"
              >
                {formattedStateName}
              </Link>
              <HiChevronRight className="text-gray-400 mx-2" />

              {/* City */}
              <span className="text-gray-700 font-semibold capitalize">
                {formattedCityName}
              </span>
            </nav>

            {/* About Section */}
            <AuctionSection2  country={formattedCityName}/>

            <DynamicAboutSection country={formattedCityName} />
            <AuctionSection3  country={formattedCityName} />


            <main className="container mx-auto px-4 py-8 mt-6">
              {/* SEO-friendly Title */}
              <h1 className="text-3xl font-bold mb-4 text-gray-800 capitalize max-w-2xl">
                Explore {formattedCityName} Auctions
              </h1>
              <p className="text-gray-600 max-w-3xl">
                Welcome to {formattedCityName}, located in the beautiful state of {formattedStateName}, {formattedCountryName}. Discover exciting auctions, events, and more in this charming city.
              </p>

              {/* City-Specific Content */}
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">About {formattedCityName}</h2>
                <p className="text-gray-700 leading-relaxed mt-2">
                  {formattedCityName} is known for its vibrant community, rich history, and diverse range of events. Whether you{''}re a local or a visitor, there{''}s always something new to explore.
                </p>
              </div>
            </main>
          </div>
        </div>
      </main>
      <Footer />

    </>
  );
}
