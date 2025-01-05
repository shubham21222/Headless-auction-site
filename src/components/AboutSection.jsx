'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';

const AboutSection = () => {
    const [sectionOneImage, setSectionOneImage] = useState('');
    const [sectionTwoImage, setSectionTwoImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const wpURL = 'https://auction.nyelizabeth.com';
                const username = 'auctionnyelizabeth';
                const password = '^s)mBdEeOY$ESrr%)A';

                // Authenticate to get JWT token
                const tokenResponse = await axios.post(`${wpURL}/wp-json/jwt-auth/v1/token`, {
                    username,
                    password,
                });
                const token = tokenResponse.data.token;

                // Fetch media for specific categories
                const [section1Response, section2Response] = await Promise.all([
                    axios.get(`${wpURL}/wp-json/wp/v2/media`, {
                        headers: { Authorization: `Bearer ${token}` },
                        params: {
                            search: 'Section 1 – Landing Page',
                            per_page: 1,
                        },
                    }),
                    axios.get(`${wpURL}/wp-json/wp/v2/media`, {
                        headers: { Authorization: `Bearer ${token}` },
                        params: {
                            search: 'Section 2 – Landing Page',
                            per_page: 1,
                        },
                    }),
                ]);

                if (section1Response.data.length > 0) {
                    setSectionOneImage(section1Response.data[0].source_url);
                }
                if (section2Response.data.length > 0) {
                    setSectionTwoImage(section2Response.data[0].source_url);
                }
            } catch (err) {
                console.error('Error fetching images:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const defaultSection1Image = 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-min.webp';
    const defaultSection2Image = 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-1-min.webp';

    return (
        <div className="bg-gradient-to-b from-white to-gray-50">
            {/* First Section */}
            <section className="w-full py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Image with creative styling */}
                        <motion.div 
                            className="flex-1 w-full"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative h-[600px] w-full">
                                {/* Decorative elements */}
                                <div className="absolute top-8 right-8 w-4/5 h-4/5 bg-yellow-500/20 rounded-tr-[100px] rounded-bl-[100px]" />
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-500/30 rounded-full" />
                                
                                {/* Main image container */}
                                <div className="absolute inset-0 w-[90%] h-[90%] group">
                                    {/* Border frame */}
                                    <div className="absolute inset-0 border-8 border-white shadow-2xl rounded-tr-[80px] rounded-bl-[80px] z-10" />
                                    
                                    {/* Main image */}
                                    <div className="relative w-full h-full overflow-hidden rounded-tr-[80px] rounded-bl-[80px] shadow-2xl">
                                    <Image
                                            src="https://auction.nyelizabeth.com/wp-content/uploads/2025/01/194542321_1_x.webp"
                                            alt="Section 1 Landing Page"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/20 transition-colors duration-300" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Content */}
                        <motion.div 
                            className="flex-1 lg:pl-12"
                            {...fadeInUp}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-5xl font-bold text-gray-900 mb-4">About NY Elizabeth</h2>
                                    <div className="h-1.5 w-24 bg-yellow-500 rounded-full mb-8"></div>
                                </div>
                                <h3 className="text-3xl font-semibold text-gray-700">Established 1956</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    NY Elizabeth was established in 1956 as an art gallery, and is now a leading
                                    international online auction house with locations worldwide, including the United
                                    States, United Kingdom, and Sweden.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    You can bid live from our app, track, follow, and place absentee and live bids through
                                    your mobile phone. Download our app from the bottom of the page and register to bid
                                    live.
                                </p>
                                <Link href="https://www.liveauctioneers.com/auctioneer/6177/ny-elizabeth/">
                                <button className="mt-6 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                                   View Auctions
                                </button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Second Section */}
            <section className="w-full py-20 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                        {/* Right Image with creative styling */}
                        <motion.div 
                            className="flex-1 w-full"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative h-[600px] w-full">
                                {/* Decorative pattern */}
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <div className="absolute top-4 left-4 w-32 h-32 border-8 border-yellow-500/20 rounded-tl-[40px]" />
                                    <div className="absolute bottom-4 right-4 w-32 h-32 border-8 border-yellow-500/20 rounded-br-[40px]" />
                                </div>
                                
                                {/* Main image container */}
                                <div className="absolute inset-0 w-[90%] h-[90%] ml-auto group">
                                    {/* Floating accent */}
                                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-900/10 rounded-full blur-lg z-0" />
                                    
                                    {/* Main image */}
                                    <div className="relative w-full h-full overflow-hidden rounded-tl-[80px] rounded-br-[80px] shadow-2xl">
                                        <Image
                                            src="https://auction.nyelizabeth.com/wp-content/uploads/2024/12/10756617.jpeg"
                                            alt="Street View"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Custom overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Left Content */}
                        <motion.div 
                            className="flex-1 lg:pr-12"
                            {...fadeInUp}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Legacy</h2>
                                    <div className="h-1.5 w-24 bg-yellow-500 rounded-full mb-8"></div>
                                </div>
                                <h3 className="text-3xl font-semibold text-gray-700">A Digital Revolution</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    NY Elizabeth was established in 1956 as an art gallery, and is now a leading
                                    international online auction house with locations worldwide, including the United
                                    States, United Kingdom, and Sweden.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    You can bid live from our app, track, follow, and place absentee and live bids through
                                    your mobile phone. Download our app from the bottom of the page and register to bid
                                    live.
                                </p>
                               
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;