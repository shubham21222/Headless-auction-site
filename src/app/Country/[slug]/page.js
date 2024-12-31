"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import AuctionImg from "../../../assets/auctions.webp"
import Header2 from "@/components/Header2";
import coordinates from "@/data/coordinates";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import { Marker } from "leaflet";


// WooCommerce API Configuration
const WooCommerceAPI = axios.create({
  baseURL: "https://auction.nyelizabeth.com/wp-json/wc/v3",
  auth: {
    username: "ck_37074d045f3fa4a2752997506f65e0b24729b04e",
    password: "cs_c71086823b1ee0b6d069d4d981108627c948321d",
  },
});

const CountryStatesPage = () => {
  const params = useParams();
  const country = params.slug.toLowerCase().replace("-", " ");
  const router = useRouter();

  const [states, setStates] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const countryCoordinates = coordinates[country] || { lat: 0, lng: 0 }; // Default to (0,0) if not found


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch states
        const statesResponse = await fetch(`/api/countries?country=${encodeURIComponent(country)}`);
        if (!statesResponse.ok) throw new Error("Failed to fetch states");
        const statesData = await statesResponse.json();
        setStates(statesData);

        // Fetch products if United States
        if (country == "united states-auction") {
          try {
            const productsResponse = await WooCommerceAPI.get("/products");
            console.log("Products API Response:", productsResponse.data); // Debug log
            setProducts(productsResponse.data);
          } catch (error) {
            console.error("Error fetching products:", error.message);
          }
        }
      } catch (err) {
        console.error("Error fetching states or products:", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [country]);


  const handleViewProduct = (slug) => {
    router.push(`..//Products/${slug}`);
  };

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
      <Header2 />
      <section className="p-6 container mx-auto mt-[80px] max-w-screen-2xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span className="capitalize text-gray-700">{country}</span>
        </nav>

        <div className="bg-gray-50 px-4 container mx-auto max-w-screen-2xl">
          <section className="flex flex-col md:flex-row items-center justify-center gap-10 py-16 ">
            <motion.div
              className="w-full md:w-1/2 space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                Discover Auctions Near You
              </h1>
              <div className="w-16 h-1 bg-yellow-500 mt-2"></div>

              <p className="text-gray-600 text-lg md:text-xl">
                Explore local auctions to find incredible deals on antiques, collectibles, and more. With auctions happening near you, there{''}s always something new to discover. From estate sales to car auctions, uncover hidden gems in your area today.
              </p>
              <p className="text-gray-600 text-lg md:text-xl">
                Auctions provide a unique opportunity to bid on a wide variety of items, offering both excitement and value. Stay informed about the latest auctions and never miss a chance to grab a great deal near you!
              </p>
              <button className="btn mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                Learn More
              </button>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 mt-8 md:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
               {countryCoordinates.lat != 0 && countryCoordinates.lng != 0 ? (
                <MapContainer
                  center={[countryCoordinates.lat, countryCoordinates.lng]}
                  zoom={5}
                  style={{ height: "400px", width: "100%" }}
                  className="rounded-lg shadow-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[countryCoordinates.lat, countryCoordinates.lng]}>
                    <Popup>{country.replace("-", " ")}</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <p className="text-center text-gray-500">Map data not available for {country}</p>
              )}
            </motion.div>
          </section>
        </div>

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
