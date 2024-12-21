'use client'
import React, { useRef, useState } from "react";



const items = [
    {
        mainImage: "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10763574-300x300.jpeg",
        subImages: [
            "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10763570-300x300.jpeg",
            "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10763566-300x300.jpeg",
        ],
        title: "A Collection of Assorted Timepieces",
        description: "Ends from: Nov 21, 2026 1:30 AM GMT-08:00",
    },
    {
        mainImage: "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10757654-300x226.jpeg",
        subImages: [
            "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10757643-268x300.jpeg",
            "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10757632-300x237.jpeg",
        ],
        title: "Centuries Collection of British Fine Art",
        description: "Ends from: Nov 27, 2025 10:35 PM GMT-08:00",
    },
    {
        mainImage: "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558164-300x300.jpeg",
        subImages: [
            "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558152-300x200.jpeg",
            "https://beta.nyelizabeth.com/wp-content/uploads/2024/08/10558141-300x200.jpeg",
        ],
        title: "Handbags & Accessories",
        description: "Ends from: Dec 29, 2025 1:30 AM GMT-08:00",
    },
    {
        mainImage: "https://beta.nyelizabeth.com/wp-content/uploads/2024/10/product87f363867019d82df61c3ea5ccb01da6.webp",
        subImages: [
            "https://beta.nyelizabeth.com/wp-content/uploads/2024/10/producta7cab4ac4ac8c0c451f13006552fa6f7.webp",
            "https://beta.nyelizabeth.com/wp-content/uploads/2024/10/productb5ec2122ce9e26c75a838b2109e4e85d.webp",
        ],
        title: "Expensive jewelry",
        description: "Ends from: Dec 29, 2025 1:30 AM GMT-08:00",
    },
];

const ImageShowcase = () => {
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
        <div className="relative w-full container mx-auto max-w-screen-2xl px-4">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Auctions</h2>
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
                className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth mt-8"
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="min-w-[300px] h-[400px] border rounded-lg shadow-md overflow-hidden"
                    >
                        {/* Main Image and Sub Images */}
                        <div className="w-full h-[250px] relative bg-gray-100">
                            <img
                                src={mainImages[index]}
                                alt={item.title}
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                {item.subImages.map((subImg, subIndex) => (
                                    <img
                                        key={subIndex}
                                        src={subImg}
                                        alt={`Sub-${subIndex}`}
                                        className="w-10 h-10 border rounded-md object-cover cursor-pointer"
                                        onClick={() => handleSubImageClick(index, subImg)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            {/* <p className="text-sm text-gray-500">{item.description}</p> */}
                            <p className="text-red-600 font-semibold mt-2 cursor-pointer">
                                Bid Now ›
                            </p>
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

export default ImageShowcase;
