'use client';

import React, { useRef, useState } from "react";

// Sample data for each category
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

    const scrollLeft = () => {
        containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    const handleSubImageClick = (index, subImg) => {
        const updatedImages = [...mainImages];
        updatedImages[index] = subImg;
        setMainImages(updatedImages);
    };

    return (
        <div className="relative w-full container mx-auto max-w-screen-2xl px-4 my-8">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="h-1 w-16 bg-yellow-500 mx-auto md:mx-0"></div>

            {/* Left Button */}
            {/* <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-700 rounded-full p-2 shadow-md z-10"
            >
                ◀
            </button> */}

            {/* Showcase Container */}
            <div
                ref={containerRef}
                className="flex gap-4  overflow-x-auto no-scrollbar scroll-smooth mt-8"
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="min-w-[300px] h-[300px] border rounded-lg shadow-xl   overflow-hidden"
                    >
                        {/* Main Image and Sub Images */}
                        <div className="w-full h-[250px] shadow-xl relative bg-gray-100">
                            <img
                                src={mainImages[index]}
                                alt={item.title}
                                className="w-full h-full object-contain"
                            />
                            {/* <div className="absolute top-2 right-2 flex gap-2">
                                {item.subImages.map((subImg, subIndex) => (
                                    <img
                                        key={subIndex}
                                        src={subImg}
                                        alt={`Sub-${subIndex}`}
                                        className="w-10 h-10 border rounded-md object-cover cursor-pointer"
                                        onClick={() => handleSubImageClick(index, subImg)}
                                    />
                                ))}
                            </div> */}
                        </div>
                        <div className="p-4">
                            {/* <h3 className="text-lg font-bold">{item.title}</h3> */}
                            {/* <p className="text-gray-700 font-semibold">{item.price}</p> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Button */}
            {/* <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-700 rounded-full p-2 shadow-md z-10"
            >
                ▶
            </button> */}
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
