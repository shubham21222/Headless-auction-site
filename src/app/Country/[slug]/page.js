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
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet"; // Fixed Marker import
import "leaflet/dist/leaflet.css"; // Added Leaflet CSS
import { Icon } from 'leaflet'; // Added for custom marker icon
import { FaHome } from "react-icons/fa";
import DynamicAboutSection from "@/components/DynamicAboutSection";
import AboutSection from "@/components/AboutSection";
import AuctionSection2 from "@/components/AboutSection2";
import AuctionSection3 from "@/components/AuctionSection3";


const defaultIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
});
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
  const findCoordinates = (searchCountry) => {
    // Normalize the search term for better matching
    const cleanSearchTerm = searchCountry
      .replace(/-auction/i, '') // Remove '-auction' suffix
      .replace(/-/g, ' ') // Replace dashes with spaces
      .trim()
      .toLowerCase();

    // Search for coordinates regardless of case and spacing
    const coordinatesEntry = Object.entries(coordinates).find(([key]) => {
      const cleanKey = key
        .replace(/-auction/i, '') // Remove '-auction' suffix
        .replace(/-/g, ' ') // Replace dashes with spaces
        .trim()
        .toLowerCase();
      return cleanKey === cleanSearchTerm;
    });

    // Return found coordinates or fallback to a default location
    return coordinatesEntry ? coordinatesEntry[1] : { lat: 0, lng: 0 };
  };


  const countryCoordinates = findCoordinates(country);


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
      <section className="p-6 container mx-auto mt-[80px] max-w-screen-2xl px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4 flex items-center space-x-2">
          <Link
            href="/"
            className="hover:text-blue-600 transition duration-200 flex items-center space-x-1"
          >
            <FaHome className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="capitalize text-gray-700 font-semibold">
            {country.replace(/-/g, " ")}
          </span>
        </nav>

        <DynamicAboutSection country={country} />
        <AuctionSection2 country={country} /> 
        <AuctionSection3  country={country} />

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
              <div className="h-[400px] w-full relative">
                <MapContainer
                  center={[countryCoordinates.lat, countryCoordinates.lng]}
                  zoom={5}
                  style={{ height: "100%", width: "100%" }}
                  className="rounded-lg shadow-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[countryCoordinates.lat, countryCoordinates.lng]}
                    icon={defaultIcon}
                  >
                    <Popup>
                      {country.replace(/-auction/i, '').replace(/-/g, ' ')}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
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
                <div className="bg-gray-900 hover:bg-gray-800 font-semibold text-white p-3 rounded-lg shadow-md  transition-colors cursor-pointer">
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
