import React from 'react';
import Image from "next/image";
import { Timer, Award, Shield, TrendingUp } from "lucide-react";

export default function AuctionSection() {
  return (
    <div className="bg-gradient-to-b container mx-auto max-w-screen-2xl from-gray-50 to-white text-gray-900 py-16 px-8 md:px-20 lg:px-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800">
            Discover Exclusive Auctions - Where Luxury Meets Opportunity
          </h1>
          <p className="text-lg text-gray-700">
            Step into a world of premium auctions where exceptional items find their perfect match. From rare collectibles to luxury items, every auction tells a unique story of value and prestige.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Timer className="w-6 h-6 text-amber-600" />
              <span className="text-gray-700">Real-time bidding with live updates</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-amber-600" />
              <span className="text-gray-700">Secure transactions with buyer protection</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-amber-600" />
              <span className="text-gray-700">Smart bidding strategies and alerts</span>
            </div>
          </div>
        </div>

        {/* Featured Auction Showcase */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            <Image
              src="/api/placeholder/600/400"
              alt="Featured auction item"
              width={600}
              height={400}
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="text-white">
                <p className="text-sm font-semibold">Featured Auction</p>
                <h3 className="text-xl font-bold">Vintage Collector's Edition</h3>
                {/* <p className="text-amber-400 font-bold">Current Bid: $5,280</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Auction Platform?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Award className="w-12 h-12 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
            <p className="text-gray-600">
              Curated collection of authentic items, verified by experts for quality assurance.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Timer className="w-12 h-12 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Bidding</h3>
            <p className="text-gray-600">
              Experience the thrill of real-time auctions with instant bid updates and notifications.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Shield className="w-12 h-12 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-600">
              Advanced security measures ensuring safe transactions and user privacy protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}