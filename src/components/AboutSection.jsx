'use client'
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutSection = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
    };

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
                                            src="https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-min.webp"
                                            alt="Street View"
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
                                <button className="mt-6 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                                    Download Our App
                                </button>
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
                                            src="https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-1-min.webp"
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
                                <div className="flex gap-4 mt-6">
                                    <button className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                                        Explore Gallery
                                    </button>
                                    <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;