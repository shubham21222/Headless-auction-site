'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';

const DynamicKeywordSection = ({ keyword, country }) => {


    const [sectionOneImage, setSectionOneImage] = useState('');
    const [sectionTwoImage, setSectionTwoImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



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

                // Function to fetch image by category ID
                const fetchImageByCategory = async (categoryID) => {
                    try {
                        const response = await axios.get(`${wpURL}/wp-json/wp/v2/media`, {
                            headers: { Authorization: `Bearer ${token}` },
                            params: {
                                media_category: categoryID, // Use the media category ID
                                per_page: 1, // Fetch only one image
                            },
                        });

                        if (response.data.length > 0) {
                            return response.data[0].source_url; // Return the image URL
                        } else {
                            throw new Error(`No images found for category ID: ${categoryID}`);
                        }
                    } catch (err) {
                        console.error(`Error fetching image for category ID ${categoryID}:`, err);
                        throw err;
                    }
                };

                // Fetch images for specific categories
                const [section1Image, section2Image] = await Promise.all([
                    fetchImageByCategory(32897), // Numeric ID for Section 1
                    fetchImageByCategory(32898), // Numeric ID for Section 2
                ]);

                setSectionOneImage(section1Image);
                setSectionTwoImage(section2Image);
            } catch (err) {
                console.error('Error fetching images:', err);
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const defaultSection1Image = 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-min.webp';
    const defaultSection2Image = 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-1-min.webp';



    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
    };

    const formattedCountry = country
        .replace(/\s+auction\s*$/i, '')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    const formattedKeyword = keyword
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    // Dynamic content based on the keyword and country
    const dynamicContent = {
        default: {
            section1: {
                title: `${formattedKeyword} & Fine Art Sales in ${formattedCountry}`,
                subTitle: `Leading Local & International Auction House in ${formattedCountry}`,
                description1: `Explore exclusive ${formattedKeyword.toLowerCase()} in ${formattedCountry} with NY Elizabeth, your trusted auction house since 1956. We specialize in fine art, antiques, and luxury collectibles, connecting sellers with global buyers.`,
                description2: `Experience real-time auctions in ${formattedCountry} featuring authenticated ${formattedKeyword.toLowerCase()} and competitive pricing. Download our app for seamless bidding and expert appraisals.`,
                image: "https://auction.nyelizabeth.com/wp-content/uploads/2025/01/194542321_1_x.webp",
            },
            section2: {
                title: `Rare ${formattedKeyword} & Luxury Collectibles in ${formattedCountry}`,
                subTitle: `Professional Valuations & Trusted Appraisals`,
                description1: `Join ${formattedCountry}'s premier auction community. Our experts ensure transparent valuations and authentic ${formattedKeyword.toLowerCase()} listings.`,
                description2: `From estate liquidations to fine art and ${formattedKeyword.toLowerCase()}, connect with verified buyers and sellers in ${formattedCountry}. Discover unique pieces backed by our guarantee.`,
                image: "https://auction.nyelizabeth.com/wp-content/uploads/2024/12/10756617.jpeg",
            },
        },
    };

    const content = dynamicContent.default;

    return (
        <div className="bg-gradient-to-b from-white to-gray-50">
            {/* First Section */}
            <section className="w-full py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Image */}
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
                                            src={sectionOneImage || defaultSection1Image}
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
                                        View Auctions
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
                        {/* Right Image */}
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
                                            src={sectionTwoImage || defaultSection2Image}
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
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DynamicKeywordSection;
