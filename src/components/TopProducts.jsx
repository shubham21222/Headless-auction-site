'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

const categories = [
    {
        title: "Top Paintings",
        items: [
            {
                mainImage: "https://p1.liveauctioneers.com/6177/355708/194542302_1_x.jpg?height=310&quality=70&version=1734454946",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10757654-300x226.jpeg",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10757632-300x237.jpeg",
                ],
                title: "Abstract Painting",
                price: "",
            },
            {
                mainImage: "https://p1.liveauctioneers.com/6177/355708/194542303_1_x.jpg?height=310&quality=70&version=1734454946",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10757643-268x300.jpeg",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10757632-300x237.jpeg",
                ],
                title: "Modern Art",
                price: "$900",
            },
            {
                mainImage: "https://p1.liveauctioneers.com/6177/355708/194542304_1_x.jpg?height=310&quality=70&version=1734454946",
                subImages: [
                    "https://p1.liveauctioneers.com/6177/355708/194542303_1_x.jpg?height=130&quality=70&version=1734454946",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10757632-300x237.jpeg",
                ],
                title: "Modern Art",
                price: "$900",
            },
        ],
    },
    {
        title: "Top Jewelry",
        items: [
            {
                mainImage: "https://p1.liveauctioneers.com/6177/353845/193279389_1_x.jpg?height=310&quality=70&version=1733162134",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/10/producta7cab4ac4ac8c0c451f13006552fa6f7.webp",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/10/productb5ec2122ce9e26c75a838b2109e4e85d.webp",
                ],
                title: "Luxury Necklace",
                price: "$2500",
            },
            {
                mainImage: "https://p1.liveauctioneers.com/6177/353845/193279390_1_x.jpg?height=310&quality=70&version=1733162140",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558152-300x200.jpeg",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558141-300x200.jpeg",
                ],
                title: "Diamond Ring",
                price: "$4500",
            },
            {
                mainImage: "https://p1.liveauctioneers.com/6177/353845/193279391_1_x.jpg?height=310&quality=70&version=1733162145",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558152-300x200.jpeg",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558141-300x200.jpeg",
                ],
                title: "Diamond Ring",
                price: "$4500",
            },
        ],
    },
    {
        title: "Top Handbags",
        items: [
            {
                mainImage: "https://p1.liveauctioneers.com/6177/355561/194420192_1_x.jpg?height=310&quality=70&version=1734321309",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/10/producta7cab4ac4ac8c0c451f13006552fa6f7.webp",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/10/productb5ec2122ce9e26c75a838b2109e4e85d.webp",
                ],
                title: "Luxury Necklace",
                price: "$2500",
            },
            {
                mainImage: "https://p1.liveauctioneers.com/6177/355561/194420193_1_x.jpg?height=310&quality=70&version=1734321309",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558152-300x200.jpeg",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558141-300x200.jpeg",
                ],
                title: "Diamond Ring",
                price: "$4500",
            },
            {
                mainImage: "https://p1.liveauctioneers.com/6177/355561/194420194_1_x.jpg?height=310&quality=70&version=1734321309",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558152-300x200.jpeg",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558141-300x200.jpeg",
                ],
                title: "Diamond Ring",
                price: "$4500",
            },
        ],
    },
    {
        title: "Top Watches",
        items: [
            {
                mainImage: "https://p1.liveauctioneers.com/6177/353851/193283895_1_x.jpg?height=310&quality=70&version=1733163269",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/10/producta7cab4ac4ac8c0c451f13006552fa6f7.webp",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/10/productb5ec2122ce9e26c75a838b2109e4e85d.webp",
                ],
                title: "Luxury Necklace",
                price: "$2500",
            },
            {
                mainImage: "https://p1.liveauctioneers.com/6177/353851/193283896_1_x.jpg?height=310&quality=70&version=1733163269",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558152-300x200.jpeg",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558141-300x200.jpeg",
                ],
                title: "Diamond Ring",
                price: "$4500",
            },
            {
                mainImage: "https://p1.liveauctioneers.com/6177/353851/193283897_1_x.jpg?height=310&quality=70&version=1733163269",
                subImages: [
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558152-300x200.jpeg",
                    "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558141-300x200.jpeg",
                ],
                title: "Diamond Ring",
                price: "$4500",
            },
        ],
    },
];


const ShowcaseSection = ({ title, items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Handle mobile swipe
    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && currentIndex < items.length - 1) {
            setCurrentIndex(curr => curr + 1);
        }

        if (isRightSwipe && currentIndex > 0) {
            setCurrentIndex(curr => curr - 1);
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    return (
        <div className="relative w-full max-w-screen-2xl px-4 my-8 mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
            <div className="h-1 w-16 bg-yellow-500 mx-auto mb-8"></div>

            {/* Desktop View */}
            <div className="hidden sm:flex justify-center gap-6 px-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="w-[350px] h-[400px] border rounded-lg shadow-xl overflow-hidden flex flex-col items-center justify-center group relative"
                    >
                        {/* Image Container */}
                        <div className="w-[300px] h-[300px] relative bg-gray-100">
                            <img
                                src={item.mainImage}
                                alt={item.title}
                                className="object-contain w-full h-full"
                            />
                        </div>

                        {/* Title */}
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                        </div>

                        {/* Hover Button */}
                        <Link href="https://www.liveauctioneers.com/auctioneer/6177/ny-elizabeth/">
                            <button
                                className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                Explore Auction
                            </button>
                        </Link>
                    </div>
                ))}
            </div>


            {/* Mobile View */}
            <div
                className="sm:hidden w-full flex justify-center"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="relative w-full max-w-[350px] h-[400px] border rounded-lg shadow-xl overflow-hidden flex flex-col items-center justify-center group">
                    {/* Image Container */}
                    <div className="w-[300px] h-[300px] relative bg-gray-100">
                        <img
                            src={items[currentIndex].mainImage}
                            alt={items[currentIndex].title}
                            className="object-contain w-full h-full"
                        />
                    </div>

                    {/* Title */}
                    <div className="p-4 text-center">
                        <h3 className="text-lg font-bold">{items[currentIndex].title}</h3>
                    </div>

                    {/* Button Overlay */}
                    <Link href="https://www.liveauctioneers.com/auctioneer/6177/ny-elizabeth/">
                    <button
                        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 touch-opacity-100 transition-opacity duration-300"
                    >
                        Explore Auction
                    </button>
                    </Link>
                </div>
            </div>


            {/* Mobile Dots Navigation */}
            <div className="flex justify-center mt-4 gap-2 sm:hidden">
                {items.map((_, index) => (
                    <span
                        key={index}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-yellow-500" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
const TopProducts = () => {
    return (
        <div>
            {categories.map((category, index) => (
                <ShowcaseSection
                    key={index}
                    title={category.title}
                    items={category.items}
                />
            ))}
        </div>
    );
};

export default TopProducts;
