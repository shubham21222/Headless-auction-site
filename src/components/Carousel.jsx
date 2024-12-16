'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import banner1 from '../assets/banner-Image2_3_11zon.webp';
import banner2 from '../assets/banner-img2_2_11zon.webp';
import banner3 from '../assets/banner-img3_1_11zon.webp';

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      src: 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/banner-Image2_3_11zon.webp',
      title: "Discover Luxury Treasures",
      subtitle: "Curated Auctions for Discerning Collectors"
    },
    {
      src: 'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/banner-img2_2_11zon.webp',
      title: "Exclusive Online Auctions",
      subtitle: "Rare Finds, Exceptional Quality"
    },
    {
      src:'https://beta.nyelizabeth.com/wp-content/uploads/2024/11/banner-img3_1_11zon.webp',
      title: "Your Gateway to Luxury",
      subtitle: "Connecting Collectors Worldwide"
    }
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
    <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[90vh] overflow-hidden">
      {/* Carousel Images with Framer Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={`Slide ${currentIndex + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover brightness-75"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-4 md:px-16 text-white">
        <motion.div
          key={`content-${currentIndex}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {images[currentIndex].title}
          </h1>
          <p className="text-base md:text-xl lg:text-2xl mb-6 max-w-xl">
            {images[currentIndex].subtitle}
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
            Explore Auctions
          </button>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute z-20 top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 md:px-8">
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;