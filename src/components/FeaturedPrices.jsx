'use client';
import React from 'react';
import Image from 'next/image';

const FeaturedPrices = () => {
  // Example data (you can replace this with API data)
  const featuredItems = [
    {
      id: 1,
      title: 'Chippendale Slant front desk',
      price: '$410.00',
      image: 'https://www.auctionzip.com/cgi-bin/showimage.cgi?type=rt&iid=54461&in=1', // Replace with actual image paths
    },
    {
      id: 2,
      title: 'watson auction',
      price: '$8,000.00',
      image: 'https://www.auctionzip.com/cgi-bin/showimage.cgi?type=rt&iid=54273&in=1',
    },
    {
      id: 3,
      title: '3 Bedroom mobile home w/3 acres &...',
      price: '$253,000.00',
      image: 'https://www.auctionzip.com/cgi-bin/showimage.cgi?type=rt&iid=54273&in=1',
    },
    {
      id: 4,
      title: '1967 Chevrolet El-Camino',
      price: '$11,500.00',
      image: 'https://www.auctionzip.com/cgi-bin/showimage.cgi?type=rt&iid=54273&in=1',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Heading Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
        <h2 className="text-2xl font-bold">Featured Prices Realized</h2>
        <div className="h-1 w-16 bg-yellow-500 mx-auto lg:mx-0 mb-6"></div>
        </div>
        <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <div
            key={item.id}
            className="border rounded shadow hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="w-full h-48 relative">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t"
              />
            </div>

            {/* Details */}
            <div className="p-4 text-center">
              <h3 className="text-blue-600 font-medium">{item.title}</h3>
              <p className="text-gray-800 font-bold text-lg">{item.price}</p>
            </div>

            {/* Button */}
            <div className="p-4">
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
