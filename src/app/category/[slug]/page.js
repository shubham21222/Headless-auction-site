'use client';

import Footer from "@/components/Footer";
import Header2 from "@/components/Header2";
import { useParams } from "next/navigation";
import { motion } from 'framer-motion';
import AuctionImg from "../../../assets/auctions.webp";
import Image from "next/image";
import FetchImages from "@/components/FetchImages"; // Adjust the path as needed
import AuctionSection from "@/components/AuctionSection";

const CategoryPage = () => {
    const params = useParams();
    const { slug } = params;

    return (
        <>
            <Header2 />
            

            <div className="p-6 container mx-auto max-w-screen-2xl">
                <AuctionSection slug={slug} /> 
                {/* <h1 className="text-3xl font-bold mb-4 capitalize">
                    {slug.replace("-", " ")} Page
                </h1>
                <p>
                    This is the category page for <strong>{slug}</strong>. Fetch and display
                    category-specific content below.
                </p> */}

                {/* Fetch and display images for the current category */}
                <FetchImages slug={slug} />
            </div>
            <Footer />
        </>
    );
};

export default CategoryPage;
