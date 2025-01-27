"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      src: 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/banner-Image2_3_11zon.webp',
      title: "Discover Luxury Treasures",
      subtitle: "Curated Auctions for Discerning Collectors",
    },
    {
      src: 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/banner-img2_2_11zon.webp',
      title: "Exclusive Online Auctions",
      subtitle: "Rare Finds, Exceptional Quality",
    },
    {
      src: 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/banner-img3_1_11zon.webp',
      title: "Your Gateway to Luxury",
      subtitle: "Connecting Collectors Worldwide",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-screen flex-shrink-0 relative">
            <Image
              src={image.src}
              alt={`Slide ${index + 1}`}
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-4 md:px-16 text-white">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          {images[currentIndex].title}
        </h1>
        <p className="text-base md:text-xl lg:text-2xl mb-6 max-w-xl">
          {images[currentIndex].subtitle}
        </p>

        <Link href="https://www.liveauctioneers.com/auctioneer/6177/ny-elizabeth/">
        <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
          Explore Auctions
        </button>
        </Link>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 md:px-8">
        <button
          onClick={prevSlide}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
          aria-label="Previous Slide"
        >
          <FaChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
          aria-label="Next Slide"
        >
          <FaChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;



// 'use client';
// import React, { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const CarouselComponent = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const images = [
//     {
//       src: 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/banner-Image2_3_11zon.webp',
//       title: "Discover Luxury Treasures",
//       subtitle: "Curated Auctions for Discerning Collectors",
//     },
//     {
//       src: 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/banner-img2_2_11zon.webp',
//       title: "Exclusive Online Auctions",
//       subtitle: "Rare Finds, Exceptional Quality",
//     },
//     {
//       src: 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/banner-img3_1_11zon.webp',
//       title: "Your Gateway to Luxury",
//       subtitle: "Connecting Collectors Worldwide",
//     },
//   ];

//   const nextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   }, [images.length]);

//   const prevSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   }, [images.length]);

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, [nextSlide]);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Carousel Images */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="absolute inset-0"
//         >
//           <Image
//             src={images[currentIndex].src}
//             alt={Slide ${currentIndex + 1}}
//             fill
//             priority
//             className="object-cover"
//           />
//         </motion.div>
//       </AnimatePresence>

//       {/* Overlay Content */}
//       <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-4 md:px-16 text-white">
//     <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
//         {images[currentIndex].title}
//     </h1>
//     <motion.div
//         key={content-${currentIndex}}
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: 20 }}
//         transition={{ duration: 0.4 }}
//     >
//         <p className="text-base md:text-xl lg:text-2xl mb-6 max-w-xl">
//             {images[currentIndex].subtitle}
//         </p>
//         <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
//             Explore Auctions
//         </button>
//     </motion.div>
// </div>


//       {/* Navigation Arrows */}
//       <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 md:px-8">
//         <button
//           onClick={prevSlide}
//           className="bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
//           aria-label="Previous Slide"
//         >
//           <FaChevronLeft className="h-6 w-6" />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
//           aria-label="Next Slide"
//         >
//           <FaChevronRight className="h-6 w-6" />
//         </button>
//       </div>

//       {/* Indicator Dots */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={w-3 h-3 rounded-full transition-colors ${
//               index === currentIndex ? 'bg-white' : 'bg-white/50'
//             }}
//             aria-label={Go to slide ${index + 1}}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CarouselComponent; 