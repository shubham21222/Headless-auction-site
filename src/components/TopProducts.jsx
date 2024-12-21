'use client';

import Image from "next/image";
import React, { useRef, useState,useEffect } from "react";

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
    const containerRef = useRef(null);
    const [mainImages, setMainImages] = useState(items.map((item) => item.mainImage));
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = () => {
        if (!containerRef.current) return;
        
        const scrollLeft = containerRef.current.scrollLeft;
        const itemWidth = containerRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / itemWidth);
        setCurrentIndex(newIndex);
    };

    const scrollLeft = () => {
        if (!containerRef.current) return;
        
        const itemWidth = containerRef.current.offsetWidth;
        containerRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    };

    const scrollRight = () => {
        if (!containerRef.current) return;
        
        const itemWidth = containerRef.current.offsetWidth;
        containerRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    };

    const handleSubImageClick = (index, subImg) => {
        const updatedImages = [...mainImages];
        updatedImages[index] = subImg;
        setMainImages(updatedImages);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            container.scrollLeft = 0;
        }
        
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="relative w-full max-w-screen-2xl px-4 my-8 mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
            <div className="h-1 w-16 bg-yellow-500 mx-auto mb-8"></div>

            {/* Outer container for centering */}
            <div className="relative flex justify-center w-full">
                {/* Showcase Container */}
                <div 
                    ref={containerRef}
                    className="w-full sm:max-w-[80%] overflow-x-auto no-scrollbar scroll-smooth mt-8"
                >
                    <div className="flex snap-x snap-mandatory w-full">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="w-full flex-shrink-0 snap-start flex justify-center items-center px-4"
                            >
                                <div className="w-full max-w-[350px] h-[400px] border rounded-lg shadow-xl overflow-hidden flex flex-col items-center justify-center">
                                    {/* Main Image */}
                                    <div className="w-[300px] h-[300px] relative bg-gray-100">
                                        <img
                                            src={mainImages[index]}
                                            alt={item.title}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-bold">{item.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                {/* <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50 z-10"
                    disabled={currentIndex === 0}
                >
                    ←
                </button>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50 z-10"
                    disabled={currentIndex === items.length - 1}
                >
                    →
                </button> */}
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-4 gap-2">
                {items.map((_, index) => (
                    <span
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            currentIndex === index ? "bg-yellow-500" : "bg-gray-300"
                        }`}
                    ></span>
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
