"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const StateCitiesPage = () => {
  const params = useParams();
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        
        // Normalize the state name from the URL
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
  const displayState = params.statename.replace(/-/g, " ").replace(" auctions", "");

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
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span>/</span>
          <Link 
            href={`/${params.slug}`} 
            className="hover:text-gray-700 capitalize"
          >
            {displayCountry}
          </Link>
          <span>/</span>
          <span className="text-gray-700 capitalize">{displayState}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 capitalize">
            Cities in {displayState}
          </h1>
          <p className="text-gray-600 capitalize">
            {displayCountry}
          </p>
          <div className="h-1 w-16 bg-yellow-500 mt-4"></div>
        </div>

        {/* Cities Grid */}
        {cities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city, index) => (
              <Link
                key={index}
                href={`/${params.slug}/${params.statename}/${encodeURIComponent(city.toLowerCase().replace(/\s+/g, "-"))}`}
              >
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <h3 className="text-gray-800 capitalize">{city}</h3>
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
      <Footer />
    </div>
  );
};

export default StateCitiesPage;