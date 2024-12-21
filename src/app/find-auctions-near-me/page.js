'use client';

import React, { useState, useEffect } from 'react';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import CategoryCountry from '@/components/CategoryCountry';
import CategoryList from '@/components/CategoryList';
import Image from 'next/image';
import ImageShowcase from '@/components/ImageShowcase';
import Link from 'next/link';
import TopProducts from '@/components/TopProducts';
import dynamic from 'next/dynamic';

const AuctionsMap = dynamic(() => import('@/components/AuctionsMap'), {
    ssr: false, // Optional: if the component is client-side only
    loading: () => <p>Loading...</p>, // Optional: fallback content while loading
  });
  

const Page = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Example image data - replace with your actual images
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
            <div className="bg-gray-50 px-4 container mx-auto max-w-screen-2xl">
                <section className="flex flex-col md:flex-row items-center justify-center gap-10 py-16">
                    <motion.div
                        className="w-full md:w-1/2 space-y-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                            Find out Auctions Nearby
                        </h1>

                        <div className="w-16 h-1 bg-yellow-500 mt-2"></div>
                        <div className="w-full md:w-2/3 mt-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Location"
                                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    className="btn absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='mb-10'>
                        <AuctionsMap/>
                        </div>
                        <p className="text-gray-600 text-lg md:text-xl">
                            Explore local auctions to find incredible deals on antiques, collectibles, and more. With auctions happening near you, there{''}s always something new to discover. From estate sales to car auctions, uncover hidden gems in your area today.
                        </p>
                        <p className="text-gray-600 text-lg md:text-xl">
                            Auctions provide a unique opportunity to bid on a wide variety of items, offering both excitement and value. Stay informed about the latest auctions and never miss a chance to grab a great deal near you!
                        </p>
                        <Link href="https://beta.nyelizabeth.com/" target="_blank" rel="noopener noreferrer">
                            <button className="btn mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                                View Auctions
                            </button>
                        </Link>

                    </motion.div>

                    <motion.div
                        className="w-full md:w-1/2 mt-8 md:mt-0 relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
                            <div
                                className="flex transition-transform duration-500 ease-in-out h-full"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative min-w-full h-full"
                                    >
                                        <Image
                                            src={image.url}
                                            alt={image.alt}
                                            fill
                                            className="object-contain"
                                            quality={100} // Ensures the highest quality rendering
                                            priority // Makes the images load faster
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Dots indicator */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {images.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </section>
            </div>
            <TopProducts/>
            <ImageShowcase />
            <AboutSection />
            <CategoryCountry />
            <CategoryList />
            <Footer />
        </>
    );
};

export default Page;
