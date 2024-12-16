'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

// WooCommerce API Configuration
const WooCommerceAPI = axios.create({
  baseURL: 'https://auction.nyelizabeth.com/wp-json/wc/v3',
  auth: {
    username: 'ck_37074d045f3fa4a2752997506f65e0b24729b04e',
    password: 'cs_c71086823b1ee0b6d069d4d981108627c948321d',
  },
});

// Skeleton Card Component
const SkeletonCard = () => {
  return (
    <div className="flex flex-col border rounded-lg shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
      <div className="p-4 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

const FeaturedPrices = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await WooCommerceAPI.get('/products', {
          params: { 
            // featured: true, // Only fetch featured products
            // per_page: 8 // Limit to 8 products
          },
        });
        setFeaturedItems(response.data);
      } catch (error) {
        console.error('Error fetching WooCommerce products:', error);
        setError(error);
        setFeaturedItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Skeleton Loading State
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto md:mx-0 mb-4"></div>
            <div className="h-1 w-16 bg-yellow-500 mx-auto md:mx-0"></div>
          </div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Oops! </strong>
          <span className="block sm:inline">Unable to load featured prices. Please try again later.</span>
        </div>
      </div>
    );
  }

  // No Items State
  if (featuredItems.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">No featured items available at the moment.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Featured Prices Realized</h2>
          <div className="h-1 w-16 bg-yellow-500 mx-auto md:mx-0 mb-6"></div>
        </div>
        <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col border rounded-lg shadow hover:shadow-xl transition h-full group"
          >
            <div className="w-full h-48 relative overflow-hidden rounded-t-lg">
              <Image
                src={item.images?.[0]?.src || '/placeholder.jpg'}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col flex-grow p-4 text-center">
              <h3 className="text-blue-600 font-medium min-h-[3rem] flex items-center justify-center">
                {item.name}
              </h3>
              <p
                className="text-gray-800 font-bold text-lg mb-4"
                dangerouslySetInnerHTML={{ __html: item.price_html }}
              ></p>
            </div>
            <div className="p-4 mt-auto">
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Upcoming Auctions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPrices;