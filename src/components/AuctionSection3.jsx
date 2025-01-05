import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
      title: "Car Auctions",
      description: `Find pre-owned, salvaged, and vintage vehicles at unbeatable prices in ${country}. Discover exciting deals on automobiles with unmatched value in ${country}.`
    },
    {
      title: "Property Auctions",
      description: `Explore real estate opportunities, including foreclosures, commercial properties, and land in ${country}. Unlock your next investment in ${country}.`
    },
    {
      title: "Electronics Auctions",
      description: `Bid on the latest gadgets, including smartphones, laptops, and gaming consoles in ${country}. Stay ahead in technology in ${country}.`
    },
    {
      title: "Art & Antiques",
      description: `Acquire rare artworks, furniture, and collectibles with historical significance in ${country}. Bring home a piece of history in ${country}.`
    },
    {
      title: "Antique Auctions",
      description: `Discover timeless treasures, from vintage decor to rare collectibles, at antique auctions. Start your collection in ${country}.`
    },
    {
      title: "Automobile Auctions",
      description: `From luxury cars to utility vehicles, automobile auctions offer the best deals in ${country}. Experience the thrill of bidding in ${country}.`
    },
    {
      title: "Coin & Currency",
      description: `Find rare coins and historical currency to enhance your collection. Invest in valuable numismatics in ${country}.`
    },
    {
      title: "Commercial Auctions",
      description: `Explore opportunities to acquire office supplies, machinery, and commercial equipment. Grow your business in ${country}.`
    },
    {
      title: "Doll Auctions",
      description: `Bid on collectible dolls, vintage pieces, and rare finds for enthusiasts of all ages. Add charm to your collection in ${country}.`
    },
    {
      title: "Ephemera Auctions",
      description: `Discover a wide range of historical documents, photographs, and paper collectibles that tell unique stories in ${country}.`
    },
    {
      title: "Farm Auctions",
      description: `Find agricultural equipment, tools, and livestock at farm auctions in ${country}. Revolutionize your farm in ${country}.`
    },
    {
      title: "Guns & Weaponry",
      description: `Explore a collection of historical firearms, hunting gear, and military artifacts available at auctions. Secure your piece of history in ${country}.`
    },
    {
      title: "Heavy Equipment",
      description: `Bid on industrial machinery, construction tools, and heavy-duty equipment at unbeatable prices. Strengthen your operations in ${country}.`
    },
    {
      title: "Hummel Auctions",
      description: `Collect exquisite Hummel figurines that captivate collectors worldwide. Add artistic charm in ${country}.`
    },
    {
      title: "Jewelry Auctions",
      description: `From dazzling diamonds to elegant timepieces, jewelry auctions offer timeless elegance. Enhance your style in ${country}.`
    },
    {
      title: "Liquidation Auctions",
      description: `Acquire surplus stock, office furniture, and more from liquidation sales. Unlock great deals in ${country}.`
    },
    {
      title: "Militaria Auctions",
      description: `Own military memorabilia, vintage uniforms, and war collectibles that tell heroic tales in ${country}.`
    },
    {
      title: "Real Estate Auctions",
      description: `Secure properties ranging from urban apartments to sprawling estates. Invest wisely in ${country}.`
    },
    {
      title: "Restaurant Equipment",
      description: `Equip your kitchen with high-quality tools, furniture, and appliances from restaurant auctions. Upgrade your space in ${country}.`
    },
    {
      title: "Sports Memorabilia",
      description: `Discover jerseys, signed gear, and rare memorabilia from your favorite sports. Celebrate your passion in ${country}.`
    },
    {
      title: "Storage Unit Auctions",
      description: `Unlock hidden treasures with storage unit auctions. Explore unexpected finds in ${country}.`
    },
    {
      title: "Toy Auctions",
      description: `From vintage toys to modern collectibles, toy auctions delight enthusiasts of all ages. Play into nostalgia in ${country}.`
    },
    {
      title: "Train Auctions",
      description: `Bid on model trains, railway memorabilia, and vintage locomotives. Build your dream railway collection in ${country}.`
    },
    {
      title: "Vintage Clothing",
      description: `Rediscover fashion from bygone eras with vintage clothing auctions. Elevate your wardrobe in ${country}.`
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
              <div className="mb-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={200}
                  height={200}
                  className="rounded-md mx-auto"
                />
              </div>
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