import React from 'react';
import { motion } from 'framer-motion';

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
      title: "Car Auctions",
      description: `Find pre-owned, salvaged, and vintage vehicles at unbeatable prices in ${country}.`
    },
    {
      title: "Property Auctions",
      description: `Explore real estate opportunities, including foreclosures, commercial properties, and land in ${country}.`
    },
    {
      title: "Electronics Auctions",
      description: `Bid on the latest gadgets, including smartphones, laptops, and gaming consoles in ${country}.`
    },
    {
      title: "Art & Antiques",
      description: `Acquire rare artworks, furniture, and collectibles with historical significance in ${country}.`
    }
  ];

  const steps = [
    {
      title: "Register on Our Platform",
      description: `Sign up for free and explore the wide range of auctions in ${country}.`
    },
    {
      title: "Browse Auctions",
      description: `Use advanced filters to find auctions by category, location, or price range in ${country}.`
    },
    {
      title: "Place Your Bid",
      description: `Submit your bids in real-time or set auto-bids to stay competitive in ${country}.`
    },
    {
      title: "Win and Claim Your Items",
      description: `Complete the transaction securely and enjoy your newly acquired treasures from ${country}.`
    }
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
          {categories.map((category, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.h2 
          variants={fadeInUp}
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          How to Participate in Auctions in {country}
        </motion.h2>
        
        <motion.div 
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg"
            >
              <div className="text-3xl font-bold text-gray-900 mb-3">{i + 1}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuctionSection3;