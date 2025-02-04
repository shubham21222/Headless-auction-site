"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Header2 from "@/components/Header2";
import { FaHome } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import DynamicAboutSection from "@/components/DynamicAboutSection";
import AuctionSectionWithCountry from "@/components/AuctionSectionWithCountry";
import AuctionSection2 from "@/components/AboutSection2";
import AuctionSection3 from "@/components/AuctionSection3";
import CategoryCountry from "@/components/CategoryCountry";
import CountryMap from "@/components/CountryMap";
import CountryMap2 from "@/components/CountryMap2";
import CountryMapCities from "@/components/CountryMap2";

const StateCitiesPage = () => {
  const params = useParams();
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);

        const normalizedState = params.statename
          .replace(/%C4%AB/g, 'i')  // Replace ī
          .replace(/%E1%B8%A9/g, 'h')  // Replace ḩ
          .replace(/%C4%81/g, 'a')  // Replace ā
          .replace(/-auctions$/, '')  // Remove trailing -auctions
          .toLowerCase();

        // Normalize the country name
        const normalizedCountry = params.slug
          .replace(/-auction$/, '')  // Remove trailing -auction
          .toLowerCase();

        const response = await fetch(
          `/api/cities?country=${normalizedCountry}-auction&state=${normalizedState}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch cities");
        }

        setCities(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error("Error fetching cities:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [params.slug, params.statename]);

  // Format display strings - keep special characters for display
  const displayCountry = params.slug.replace(/-/g, " ").replace(" auction", "");
  const displayState = decodeURIComponent(params.statename)
    .replace(/-/g, " ")
    .replace(" auctions", "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header2 />
      <main className="container mx-auto px-4 py-8 mt-[80px]">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          {/* Home Link */}
          <Link href="/" className="flex items-center hover:text-blue-600 transition duration-200 space-x-1">
            <FaHome className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <HiChevronRight className="text-gray-400 mx-2" />

          {/* Country Link */}
          <Link
            href={`/Country/${params.slug}`}
            className="hover:text-blue-600 transition duration-200 capitalize"
          >
            {displayCountry}
          </Link>
          <HiChevronRight className="text-gray-400 mx-2" />

          {/* Current State */}
          <span className="text-gray-700 font-semibold capitalize">
            {displayState}
          </span>
        </nav>

        {/* <AuctionSectionWithCountry country={displayState} /> */}

        <AuctionSection2 country={displayState} />

        <DynamicAboutSection country={displayState} />
        <AuctionSection3 country={displayState} />

        {/* <h2 className="text-3xl font-bold mb-4 capitalize">City Auctions</h2>
        <div className="h-1 w-16 bg-yellow-500  lg:mx-0 mb-6"></div> */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 capitalize">
            Auctions in {displayState}
          </h1>
          <p className="text-gray-600 capitalize">
            {displayCountry}
          </p>
          <div className="h-1 w-16 bg-yellow-500 mt-4"></div>
        </div>

        <CountryMapCities countryName={displayCountry} stateName={displayState} />

        {/* Page Header */}
        {/* Cities Grid */}
        {cities.length > 0 ? (
          <div className="flex flex-wrap gap-4 mt-8">
            {cities.map((city, index) => (
              <Link
                key={index}
                href={`/${params.slug}/${params.statename}/${encodeURIComponent(city.toLowerCase().replace(/\s+/g, "-"))}`}
              >
                <div className="text-sm font-bold px-4 py-2 rounded-full  px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                  <h3 className="text-white capitalize">{city}</h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600">
              No cities found for {displayState}, {displayCountry}.
            </p>
          </div>
        )}
      </main>
      <CategoryCountry />

      <Footer />
    </div>
  );
};

export default StateCitiesPage;