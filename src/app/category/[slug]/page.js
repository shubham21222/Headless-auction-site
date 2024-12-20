"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useParams } from "next/navigation";
import { motion } from 'framer-motion';
import AuctionImg from "../../../assets/auctions.webp"
import Image from "next/image";

const CategoryPage = () => {
  const params = useParams();
  const { slug } = params;

  return (  
    <>
    <Header/>

    <div className="bg-gray-50 px-4 container mx-auto max-w-screen-2xl">
                <section className="flex flex-col md:flex-row items-center justify-center gap-10 py-16 ">
                    <motion.div
                        className="w-full md:w-1/2 space-y-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                            Discover Auctions Near You
                        </h1>
                        <div className="w-16 h-1 bg-yellow-500 mt-2"></div>

                        <p className="text-gray-600 text-lg md:text-xl">
                            Explore local auctions to find incredible deals on antiques, collectibles, and more. With auctions happening near you, there{''}s always something new to discover. From estate sales to car auctions, uncover hidden gems in your area today.
                        </p>
                        <p className="text-gray-600 text-lg md:text-xl">
                            Auctions provide a unique opportunity to bid on a wide variety of items, offering both excitement and value. Stay informed about the latest auctions and never miss a chance to grab a great deal near you!
                        </p>
                        <button className="btn mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                            Learn More
                        </button>
                    </motion.div>

                    <motion.div
                        className="w-full md:w-1/2 mt-8 md:mt-0"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={AuctionImg}
                            alt="Auctions near me"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </motion.div>
                </section>
            </div>

    <div className="p-6 container mx-auto max-w-screen-2xl">
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {slug.replace("-", " ")} Page
      </h1>
      <p>
        This is the category page for <strong>{slug}</strong>. Fetch and display
        category-specific content here.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default CategoryPage;
