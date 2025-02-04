import React, { useState, useEffect } from 'react';
import { motion, stagger } from 'framer-motion';
import { MapPin, Award, Shield, Check, Star, FileText, Users, Clock } from 'lucide-react';
import Image from 'next/image';
import TopProducts from './TopProducts';
import DynamicAboutSection from './DynamicAboutSection';
import Link from 'next/link';

const AuctionSection = ({ slug }) => {
    const [location, setLocation] = useState({
        city: '',
        state: '',
        country: '',
        loading: true,
        error: null
    });

    const [showAll, setShowAll] = useState(false);

    const handleViewAll = () => {
        setShowAll(true);
    };

    useEffect(() => {
        const getLocation = async () => {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude, longitude } = position.coords;
                const response = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const data = await response.json();

                setLocation({
                    city: data.city || 'Nearby',
                    state: data.principalSubdivision || 'your state',
                    country: data.countryName || 'your country',
                    loading: false,
                    error: null
                });
            } catch (error) {
                setLocation(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Location access denied. Please enable location services.'
                }));
            }
        };

        getLocation();
    }, []);

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const fadeInUp = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6 }
    };


    const formatKeyword = (slug) => {
        return slug.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const locationText = location.loading
    ? 'Loading location...'
    : location.error
        ? 'Nearby'
        : `${location.city || 'Nearby'}, ${location.state || ''}, ${location.country || ''}`;


    const whyChooseUs = [
        {
            icon: Star,
            title: 'Exceptional Variety',
            description: `From rare finds to everyday essentials, ${formatKeyword(slug)} auctions in ${location.city || 'Nearby'} cater to every taste and budget.`
        },
        {
            icon: Shield,
            title: 'Trusted Sellers',
            description: `Every auction in ${location.city || 'Nearby'} features verified sellers, ensuring quality and authenticity.`
        },
        {
            icon: Award,
            title: 'Unmatched Value',
            description: `Find premium ${formatKeyword(slug)} at prices far below market value in ${location.city || 'Nearby'}.`
        },
        {
            icon: Clock,
            title: 'Convenient Online Bidding',
            description: `Bid in real-time from anywhere, with auctions tailored for users in ${location.city || 'Nearby'}.`
        }
    ];

    const expectations = [
        {
            title: 'Unique Collections',
            description: `${formatKeyword(slug)} auctions in ${location.city || 'Nearby'} feature one-of-a-kind items, including limited editions and hard-to-find pieces.`
        },
        {
            title: 'Authenticity Guaranteed',
            description: `Every ${formatKeyword(slug)} sold in ${location.city || 'Nearby'} comes with detailed descriptions and certificates of authenticity.`
        },
        {
            title: 'Diverse Bidding Options',
            description: `Participate in live auctions, timed auctions, or "Buy Now" listings in ${location.city || 'Nearby'}.`
        },
        {
            title: 'Accessible for Everyone',
            description: `Whether you're a seasoned bidder or a newcomer, auctions in ${location.city || 'Nearby'} make bidding simple and rewarding.`
        }
    ];

    const howToJoin = [
        {
            title: 'Register for Free',
            description: `Create an account to access the best ${formatKeyword(slug)} auctions in ${location.city || 'Nearby'}.`
        },
        {
            title: 'Browse Active Listings',
            description: `Use filters to find ${formatKeyword(slug)} that match your preferences in ${location.city || 'Nearby'}.`
        },
        {
            title: 'Place Your Bid',
            description: 'Bid confidently with secure payment options and user-friendly tools.'
        },
        {
            title: 'Claim Your Winning Bid',
            description: `Complete the transaction and enjoy your new ${formatKeyword(slug)} from ${location.city || 'Nearby'}.`
        }
    ];

    const popularCategories = [
        {
            title: 'Jewelry Auctions',
            description: 'Elegant necklaces, rings, bracelets, and more.'
        },
        {
            title: 'Car Auctions',
            description: 'Vintage, luxury, and pre-owned vehicles at unbeatable prices.'
        },
        {
            title: 'Painting Auctions',
            description: 'From famous artists to local talents, find masterpieces to suit your style.'
        },
        {
            title: 'Antique Auctions',
            description: 'Rare artifacts, furniture, and collectibles for enthusiasts.'
        }
    ];

    const steps = [
        {
            title: "Register on Our Platform",
            description: `Sign up for free and explore the wide range of auctions in ${location.city || 'Nearby'}.`,
            image: "/assets/image1.jpeg",
        },
        {
            title: "Browse Auctions",
            description: `Use advanced filters to find auctions by category, location, or price range in ${location.city || 'Nearby'}.`,
            image: "/assets/image2.jpeg",
        },
        {
            title: "Place Your Bid",
            description: `Submit your bids in real-time or set auto-bids to stay competitive in ${location.city || 'Nearby'}.`,
            image: "/assets/image3.jpeg",
        },
    ];


    const categories = [
        {
            title: "Antique Auctions",
            slug: "antique-auctions",
            description: `Discover timeless treasures, from vintage decor to rare collectibles, at antique auctions. Start your collection in ${location.city || 'Nearby'}.`
        },
        {
            title: "Coin & Currency",
            slug: "coin-currency",
            description: `Find rare coins and historical currency to enhance your collection. Invest in valuable numismatics in ${location.city || 'Nearby'}.`
        },
        {
            title: "Jewelry",
            slug: "jewelry-auctions",
            description: `From dazzling diamonds to elegant timepieces, jewelry auctions offer timeless elegance. Enhance your style in ${location.city || 'Nearby'}.`
        },
        
        {
            title: "Brand Watches",
            slug: "brand-watches",
            description: `Bid on luxury brand watches that combine craftsmanship and elegance. Perfect your timekeeping style in ${location.city || 'Nearby'}.`
        },
        {
            title: "Paintings",
            slug: "paintings",
            description: `Acquire exquisite paintings that add sophistication to any space. Own timeless art in ${location.city || 'Nearby'}.`
        },
        {
            title: "Decorative Art",
            slug: "decorative-art",
            description: `Enhance your living spaces with decorative art that blends style and personality. Elevate your decor in ${location.city || 'Nearby'}.`
        },
        {
            title: "Islamic Art",
            slug: "islamic-art",
            description: `Discover intricate Islamic art pieces that celebrate heritage and culture. Experience spiritual beauty in ${location.city || 'Nearby'}.`
        },
        {
            title: "Ancient Art",
            slug: "ancient-art",
            description: `Own a piece of history with ancient art that speaks of civilizations past. Bring history to life in ${location.city || 'Nearby'}.`
        },
        {
            title: "Designer Hand Bags",
            slug: "designer-hand-bags",
            description: `Shop luxury designer handbags that define fashion and elegance. Carry your style statement in ${location.city || 'Nearby'}.`
        },
        {
            title: "Diamonds",
            slug: "diamonds",
            description: `Bid on exquisite diamonds that capture brilliance and beauty. Elevate your jewelry collection in ${location.city || 'Nearby'}.`
        },
        {
            title: "Gold Coins",
            slug: "gold-coins",
            description: `Invest in valuable gold coins that combine beauty and worth. Strengthen your collection in ${location.city || 'Nearby'}.`
        },
        {
            title: "Gold Bars",
            slug: "gold-bars",
            description: `Secure your wealth with gold bars of premium quality. Build a solid investment in ${location.city || 'Nearby'}.`
        }
    ];


    return (
        <>
            {/* <DynamicAboutSection country={location.city}/> */}

            <div className="py-16 text-black ">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            className="inline-block mb-6 p-2 bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 rounded-lg"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="flex items-center gap-2 px-4 py-2 rounded-md">
                                <MapPin className="text-blue-400" size={24} />
                                <span className="text-gray-900 font-semibold">
                                    {locationText}
                                </span>
                            </div>
                        </motion.div>

                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                            Best {formatKeyword(slug)}  in {location.city || 'Nearby'} – Exclusive Deals Await!
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Looking for the best {formatKeyword(slug)} in {location.city || 'Nearby'}? Discover premium collections
                            of {formatKeyword(slug)}, from unique pieces to incredible bargains. Whether you{""}re a collector or
                            a first-time bidder, {location.city || 'Nearby'} offers top-notch {formatKeyword(slug)}  with unbeatable deals.
                        </p>
                    </motion.div>

                    {/* Why Choose Us Section */}
                    <motion.section className="mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Why Choose {formatKeyword(slug)}  in {location.city || 'Nearby'}?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {whyChooseUs.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="mb-4 p-3 bg-blue-100 rounded-lg w-fit">
                                        <item.icon className="text-blue-600 w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* What to Expect Section */}
                    <motion.section className="mb-16 bg-gray-50 p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            What to Expect at {formatKeyword(slug)}  in {location.city || 'Nearby'}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {expectations.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0">
                                        <Check className="text-green-500 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* How to Join Section */}
                    <motion.section className="mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            How to Join {formatKeyword(slug)} in {location.city || 'Nearby'}
                        </h2>

                    </motion.section>

                    <motion.div
                        variants={stagger}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-center mb-10"
                    >
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg flex flex-col items-center"
                            >
                                <div className="text-3xl font-bold text-gray-900 mb-3">{i + 1}</div>
                                <div className="mb-4">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        width={250}
                                        height={250}
                                        className="rounded-md"
                                        style={{ width: '250px', height: '250px' }}
                                    />

                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-center">{step.title}</h3>
                                <p className="text-gray-600 text-center">{step.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <TopProducts />

                    {/* Popular Categories Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-2xl md:text-3xl font-bold mb-6"
                        >
                            Popular Auction Categories in {location.city || 'Nearby'}
                        </motion.h2>

                        <motion.div
                            variants={stagger}
                            className="grid sm:grid-cols-2 gap-4 md:gap-6"
                        >
                            {(showAll ? categories : categories.slice(0, 4)).map((category, i) => (
                                <Link href={`/category/${category.slug}`} key={category.slug} className="block">
                                    <motion.div
                                        variants={{ fadeInUp: { opacity: 0, y: 20 } }}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg"
                                    >
                                        <h3 className="text-xl font-semibold mb-2 text-white">{category.title}</h3>
                                        <p className="text-gray-300">{category.description}</p>
                                    </motion.div>
                                </Link>
                            ))}
                        </motion.div>

                        {!showAll && (
                            <div className="text-center mt-6">
                                <button
                                    onClick={handleViewAll}
                                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors duration-300 shadow-xl hover:shadow-xl px-4 py-2 rounded-lg"
                                >
                                    View All
                                </button>
                            </div>
                        )}
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative p-8 rounded-2xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90" />
                        <div className="relative text-center">
                            <h3 className="text-3xl text-white font-bold mb-4">
                                Start Your Bidding Journey Today
                            </h3>
                            <p className="text-lg mb-8 text-gray-100">
                                Join thousands of successful bidders in {location.city || 'Nearby'} and discover amazing deals.
                            </p>
                            <Link href="https://www.liveauctioneers.com/auctioneer/6177/ny-elizabeth/">
                                <motion.button
                                    className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Explore Active Auctions
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default AuctionSection;