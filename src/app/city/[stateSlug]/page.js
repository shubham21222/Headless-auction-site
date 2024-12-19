"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const CityPage = () => {
  const params = useParams();
  const stateSlug = params?.stateSlug?.toLowerCase().replace("-", " ");

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stateSlug) return;

    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/cities?state=${encodeURIComponent(stateSlug)}`);
        if (!response.ok) throw new Error("Failed to fetch cities");

        const citiesData = await response.json();
        setCities(citiesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [stateSlug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-6">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="p-6 container mx-auto max-w-screen-2xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span className="capitalize text-gray-700">{stateSlug}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-4 capitalize">{stateSlug} Cities</h1>
        <div className="h-1 w-16 bg-yellow-500 mx-auto lg:mx-0 mb-6"></div>

        {cities.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city, index) => (
              <div
                key={index}
                className="bg-blue-100 p-3 rounded-lg shadow-md hover:bg-blue-200 transition-colors"
              >
                {city}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No cities found for {stateSlug}.</p>
        )}
      </section>
      <Footer />
    </>
  );
};

export default CityPage;
