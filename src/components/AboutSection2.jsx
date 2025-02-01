'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Timer, Award, Shield, TrendingUp } from 'lucide-react';
import axios from 'axios';

const AuctionSection2 = ({ country }) => {
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = 'auctionnyelizabeth';
  const password = '^s)mBdEeOY$ESrr%)A';
  const wpURL = 'https://auction.nyelizabeth.com';

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Step 1: Authenticate to get the JWT token
        const tokenResponse = await axios.post(`${wpURL}/wp-json/jwt-auth/v1/token`, {
          username,
          password,
        });

        const token = tokenResponse.data.token;

        // Step 2: Fetch hero image using media category ID
        const categoryID = 32896; // Replace with your category ID
        const response = await axios.get(`${wpURL}/wp-json/wp/v2/media`, {
          headers: { Authorization: `Bearer ${token}` }, // Pass token here
          params: {
            media_category: categoryID, // Use the correct parameter
            per_page: 1, // Fetch only one image
          },
        });

        if (response.data.length > 0) {
          setHeroImage(response.data[0]); // Store the entire image object
        } else {
          throw new Error('No images found for the specified category');
        }
      } catch (err) {
        console.error('Error fetching image:', err);
        setError(err.message || 'An error occurred while fetching the hero image');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  const defaultHeroImage = 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-min.webp';

  const formattedCountry = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();


  return (
    <div className="bg-gradient-to-b container mx-auto max-w-screen-2xl from-gray-50 to-white text-gray-900 py-16 px-4 sm:px-8 md:px-20 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text Section */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800">
            {formattedCountry} – Discover the Best Deals Near You
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            Looking for the best auctions in {formattedCountry}? Explore incredible opportunities featuring cars, real estate, electronics, antiques, and more. Whether you’re a first-time bidder or a seasoned expert, auctions in {formattedCountry} offer unmatched deals and a seamless experience.
          </p>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Timer className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              <span className="text-sm sm:text-base text-gray-700">
                Real-time bidding with live updates in {formattedCountry}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              <span className="text-sm sm:text-base text-gray-700">
                Secure transactions with buyer protection in {formattedCountry}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              <span className="text-sm sm:text-base text-gray-700">
                Smart bidding strategies and alerts in {formattedCountry}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Auction Showcase */}
        <div className="space-y-4 sm:space-y-6">
          <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            {loading ? (
              // Skeleton Loader
              <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
            ) : heroImage ? (
              <Image
                src={heroImage.source_url || defaultHeroImage} // Ensure source_url exists
                alt={heroImage.alt_text || "Featured auction item"}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                style={{
                  width: "100%", // Make the image responsive
                  height: "auto", // Maintain the aspect ratio
                }}
                sizes="(max-width: 768px) 100vw, 
                            (max-width: 1200px) 50vw, 
                            33vw"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                {error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <p>No Image Available</p>
                )}
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
              <div className="text-white">
                <p className="text-xs sm:text-sm font-semibold">Featured Auction</p>
                <h3 className="text-lg sm:text-xl font-bold">Vintage Collector{''}s Edition in {formattedCountry}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 sm:mt-16 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Why Choose Auctions in {formattedCountry}?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Award className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Unparalleled Variety</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Access auctions across diverse categories, from automobiles to rare collectibles in {formattedCountry}.
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Timer className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Convenient Online Platform</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Participate in live and timed auctions from the comfort of your home in {formattedCountry}.
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Secure Transactions</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Advanced security measures ensuring safe transactions and user privacy protection in {formattedCountry}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AuctionSection2;