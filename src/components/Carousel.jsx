'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import banner1 from '../assets/banner-Image2_3_11zon.webp';
import banner2 from '../assets/banner-img2_2_11zon.webp';
import banner3 from '../assets/banner-img3_1_11zon.webp';

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [banner1, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[700px] mt-12 overflow-hidden">
      {/* Text Section */}
      <div className="absolute z-10 left-8 top-1/2 transform -translate-y-1/2 text-white">
        <h1 className="text-4xl font-bold leading-snug ">
          A Trusted Online Auction <br /> For Luxury Goods
        </h1>
      </div>

      {/* Carousel Images */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  );
};

export default CarouselComponent;
