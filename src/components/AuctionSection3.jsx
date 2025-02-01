import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const fadeInUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AuctionSection3 = ({ country }) => {

  const [showAll, setShowAll] = useState(false);

  const handleViewAll = () => {
    setShowAll(true);
  };

  const features = [
    {
      title: "Incredible Savings",
      description: `Auctions often feature items at prices far below retail value.`
    },
    {
      title: "Unique Finds",
      description: `Discover one-of-a-kind items such as vintage cars, rare antiques, and exclusive properties.`
    },
    {
      title: "Transparent Process",
      description: `Auctions in ${country} are conducted with clear terms and conditions, ensuring fair bidding.`
    },
    {
      title: "Local & National Access",
      description: `Choose from auctions in ${country} or expand to other regions.`
    }
  ];

  const categories = [
    {
      title: "Antique Auctions",
      slug: "antique-auctions",
      description: `Discover timeless treasures, from vintage decor to rare collectibles, at antique auctions. Start your collection in ${country}.`
    },
    {
      title: "Coin & Currency",
      slug: "coin-currency",
      description: `Find rare coins and historical currency to enhance your collection. Invest in valuable numismatics in ${country}.`
    },
    {
      title: "Jewelry",
      slug: "jewelry-auctions",
      description: `From dazzling diamonds to elegant timepieces, jewelry auctions offer timeless elegance. Enhance your style in ${country}.`
    },
 
    {
      title: "Brand Watches",
      slug: "brand-watches",
      description: `Bid on luxury brand watches that combine craftsmanship and elegance. Perfect your timekeeping style in ${country}.`
    },
    {
      title: "Paintings",
      slug: "paintings",
      description: `Acquire exquisite paintings that add sophistication to any space. Own timeless art in ${country}.`
    },
    {
      title: "Decorative Art",
      slug: "decorative-art",
      description: `Enhance your living spaces with decorative art that blends style and personality. Elevate your decor in ${country}.`
    },
    {
      title: "Islamic Art",
      slug: "islamic-art",
      description: `Discover intricate Islamic art pieces that celebrate heritage and culture. Experience spiritual beauty in ${country}.`
    },
    {
      title: "Ancient Art",
      slug: "ancient-art",
      description: `Own a piece of history with ancient art that speaks of civilizations past. Bring history to life in ${country}.`
    },
    {
      title: "Designer Hand Bags",
      slug: "designer-hand-bags",
      description: `Shop luxury designer handbags that define fashion and elegance. Carry your style statement in ${country}.`
    },
    {
      title: "Diamonds",
      slug: "diamonds",
      description: `Bid on exquisite diamonds that capture brilliance and beauty. Elevate your jewelry collection in ${country}.`
    },
    {
      title: "Gold Coins",
      slug: "gold-coins",
      description: `Invest in valuable gold coins that combine beauty and worth. Strengthen your collection in ${country}.`
    },
    {
      title: "Gold Bars",
      slug: "gold-bars",
      description: `Secure your wealth with gold bars of premium quality. Build a solid investment in ${country}.`
    }
  ];
  

  const steps = [
    {
      title: "Register on Our Platform",
      description: `Sign up for free and explore the wide range of auctions in ${country}.`,
      image: "/assets/image1.jpeg",
    },
    {
      title: "Browse Auctions",
      description: `Use advanced filters to find auctions by category, location, or price range in ${country}.`,
      image: "/assets/image2.jpeg",
    },
    {
      title: "Place Your Bid",
      description: `Submit your bids in real-time or set auto-bids to stay competitive in ${country}.`,
      image: "/assets/image3.jpeg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-4 md:p-8 text-white mb-8"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Discover Amazing Auctions in {country}
        </motion.h1>

        <motion.div
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

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
          Popular Auction Categories in {country}
        </motion.h2>

        <motion.div
          variants={stagger}
          className="grid sm:grid-cols-2 gap-4 md:gap-6"
        >
          {(showAll ? categories : categories.slice(0, 4)).map((category, i) => (
            <Link href={`/category/${category.title.replace(/\s+/g, '-').toLowerCase()}`} key={i}>
              <motion.div
                variants={fadeInUp}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-2xl md:text-3xl font-bold mb-6 text-center"
        >
          How to Participate in Auctions in {country}
        </motion.h2>

        <motion.div
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-center"
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
      </motion.div>

    </div>
  );
};

export default AuctionSection3;