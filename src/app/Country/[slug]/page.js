"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const CountryStatesPage = () => {
  const params = useParams();
  const country = params.slug.toLowerCase().replace("-", " ");

  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/countries?country=${encodeURIComponent(country)}`);
        if (!response.ok) throw new Error("Failed to fetch states");

        const statesData = await response.json();
        setStates(statesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    

    fetchStates();
  }, [country]);

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
          / <span className="capitalize text-gray-700">{country}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-4 capitalize">{country} States</h1>
        <div className="h-1 w-16 bg-yellow-500 mx-auto lg:mx-0 mb-6"></div>

        {states.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {states.map((state, index) => (
            <Link
              key={index}
              href={`/${params.slug}/${state.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="bg-blue-100 p-3 rounded-lg shadow-md hover:bg-blue-200 transition-colors cursor-pointer">
                {state}
              </div>
            </Link>
          ))}
        </div>
        
        ) : (
          <p className="text-gray-600 text-center">No states found for {country}.</p>
        )}
      </section>
      <Footer />
    </>
  );
};

export default CountryStatesPage;
