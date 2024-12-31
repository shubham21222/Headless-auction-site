'use client';

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

const AuctionsMap = dynamic(() => import('@/components/AuctionsMap'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const HeroSection = () => {
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
                    Discover Extraordinary Auctions
                </h1>
                <p className="text-white text-lg md:text-xl">
                    Explore antique collections, live events, and unique treasures.
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
    const [currentIndex, setCurrentIndex] = useState(0);

    // Example image data
    const images = [
        {
            url: "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10763574-300x300.jpeg",
            alt: "Auction items display"
        },
        {
            url: "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10763570-300x300.jpeg",
            alt: "Live auction event"
        },
        {
            url: "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10763566-300x300.jpeg",
            alt: "Antique collection"
        },
        {
            url: "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10757654-300x226.jpeg",
            alt: "Auction items display"
        },
        {
            url: "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558164-300x300.jpeg",
            alt: "Live auction event"
        },
        {
            url: "https://beta.nyelizabeth.com/wp-content/uploads/2024/10/producta7cab4ac4ac8c0c451f13006552fa6f7.webp",
            alt: "Antique collection"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            <Header />
            <HeroSection />
            <TopProducts />
            <AboutSection />
            <AuctionInfoSection/>
            <CategoryList />
            <CategoryCountry />
            <Footer />
        </>
    );
};

export default Page;
