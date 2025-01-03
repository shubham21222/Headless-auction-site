'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const DynamicAboutSection = ({ country }) => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
    };

    const formattedCountry = country.replace(/\s+auction\s*$/i, '').trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    // Dynamic content based on the country
    const countryContent = {
        default: {
          section1: {
            title: `Luxury Auctions & Fine Art Sales in ${formattedCountry}`,
            subTitle: `Leading Local & International Auction House in ${formattedCountry}`,
            description1: `Discover exclusive auctions and estate sales in ${formattedCountry} with NY Elizabeth, your trusted auction house since 1956. We specialize in fine art, antiques, jewelry, and luxury collectibles, connecting local sellers with global buyers.`,
            description2: `Experience seamless bidding and expert appraisals in ${formattedCountry}. Our mobile app brings real-time auctions to your fingertips, featuring authenticated items and competitive pricing.`,
            image: "https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-min.webp",
          },
          section2: {
            title: `Exclusive Auctions & Rare Collectibles in ${formattedCountry}`,
            subTitle: `Professional Appraisals & Valuations`,
            description1: `Join ${formattedCountry}'s most trusted auction marketplace. Our expert appraisers and auctioneers ensure transparent valuations and authentic listings, specializing in estate liquidations, fine art, and luxury collectibles.`,
            description2: `Connect with verified buyers and sellers in ${formattedCountry}'s premier auction community. From rare antiquities to modern luxury items, discover unique pieces backed by our authentication guarantee.`,
            image: "https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-1-min.webp",
          },
        },
      };

    const content = countryContent[country] || countryContent.default;

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
                                <div className="absolute top-8 right-8 w-4/5 h-4/5 bg-yellow-500/20 rounded-tr-[100px] rounded-bl-[100px]" />
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-500/30 rounded-full" />
                                <div className="absolute inset-0 w-[90%] h-[90%] group">
                                    <div className="absolute inset-0 border-8 border-white shadow-2xl rounded-tr-[80px] rounded-bl-[80px] z-10" />
                                    <div className="relative w-full h-full overflow-hidden rounded-tr-[80px] rounded-bl-[80px] shadow-2xl">
                                        <Image
                                            src={content.section1.image}
                                            alt="Section 1 Image"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Content */}
                        <motion.div className="flex-1 lg:pl-12" {...fadeInUp}>
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                                        {content.section1.title}
                                    </h2>
                                    <div className="h-1.5 w-24 bg-yellow-500 rounded-full mb-8"></div>
                                </div>
                                <h3 className="text-3xl font-semibold text-gray-700">
                                    {content.section1.subTitle}
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {content.section1.description1}
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {content.section1.description2}
                                </p>
                                <Link href="https://www.liveauctioneers.com/auctioneer/6177/ny-elizabeth/">
                                <button className="mt-6 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                                Buy Now
                                </button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Second Section */}
            <section className="w-full py-20 bg-white overflow-hidden">
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
                                <div className="absolute top-4 left-4 w-32 h-32 border-8 border-yellow-500/20 rounded-tl-[40px]" />
                                <div className="absolute bottom-4 right-4 w-32 h-32 border-8 border-yellow-500/20 rounded-br-[40px]" />
                                <div className="absolute inset-0 w-[90%] h-[90%] ml-auto group">
                                    <div className="relative w-full h-full overflow-hidden rounded-tl-[80px] rounded-br-[80px] shadow-2xl">
                                        <Image
                                            src={content.section2.image}
                                            alt="Section 2 Image"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Left Content */}
                        <motion.div className="flex-1 lg:pr-12" {...fadeInUp}>
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                                        {content.section2.title}
                                    </h2>
                                    <div className="h-1.5 w-24 bg-yellow-500 rounded-full mb-8"></div>
                                </div>
                                <h3 className="text-3xl font-semibold text-gray-700">
                                    {content.section2.subTitle}
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {content.section2.description1}
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {content.section2.description2}
                                </p>
                                <div className="flex gap-4 mt-6">
                                    <button className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                                        Explore Gallery
                                    </button>
                                    <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 rounded-full">
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

export default DynamicAboutSection;
