"use client";

import React, { useState, useEffect } from 'react';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import CategoryCountry from '@/components/CategoryCountry';
import CategoryList from '@/components/CategoryList';
import Image from 'next/image';
import Link from 'next/link';
import TopProducts from '@/components/TopProducts';
import dynamic from 'next/dynamic';
import Header2 from '@/components/Header2';
import AuctionInfoSection from '@/components/AuctionInfoSection';
import AuctionSection2 from '@/components/AboutSection2';
import AuctionSection3 from '@/components/AuctionSection3';

const AuctionsMap = dynamic(() => import('@/components/AuctionsMap'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const HeroSection = ({ location }) => {
    return (
        <div className="relative w-full h-screen">
            <Image
                src="https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10763574-300x300.jpeg"
                alt="Auction Hero"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                Explore auctions in {location || "your area"}.
                </h1>
                <p className="text-white text-lg md:text-xl">
                   Explore antiques collections , live events and unique treasures
                </p>
                <Link
                    href="/auctions"
                    className="mt-6 px-6 py-3 bg-white text-black rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                    Browse Auctions
                </Link>
            </div>
        </div>
    );
};

const Page = () => {
    const [location, setLocation] = useState("your area");
    const [error, setError] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Fetch location name from OpenStreetMap's Nominatim API
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();
                        const locationName = `${data.address.city || data.address.town || data.address.village}, ${data.address.state}, ${data.address.country}`;
                        setLocation(locationName);
                    } catch (error) {
                        setError("Failed to fetch location details.");
                    }
                },
                (error) => {
                    if (error.code === 1) {
                        setError("Permission denied. Please allow location access.");
                    } else if (error.code === 2) {
                        setError("Location unavailable.");
                    } else {
                        setError("An unknown error occurred.");
                    }
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    return (
        <>
            <Header />
            <HeroSection location={location} />
            <AuctionSection2  country={location}/>
            <AuctionSection3  country={location} />
            <AuctionInfoSection />
            <CategoryList />
            <TopProducts />
            {/* <AboutSection /> */}
           
            <CategoryCountry />
            <Footer />
        </>
    );
};

export default Page;
