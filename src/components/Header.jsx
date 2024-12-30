'use client'
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleAuctionsClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-0 z-[9999] right-0 z-50 transition-all duration-300 w-full max-w-screen-2xl mx-auto ${isScrolled
          ? "bg-white text-black shadow-lg rounded-full"
          : "bg-transparent text-white"
        }`}
      style={{ padding: isScrolled ? "8px" : "12px" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo and Links */}
          <div className="flex items-center space-x-6 w-full md:w-auto justify-center md:justify-start">
            <Link href="/">
              <Image
                src="https://beta.nyelizabeth.com/wp-content/uploads/2024/05/Rectangle.svg"
                alt="NY Elizabeth"
                width={100}
                height={100}
                className="h-10 w-auto"
              />
            </Link>
            <nav
              className={`hidden md:flex space-x-4 text-sm sm:text-base font-medium ${isScrolled ? "text-black" : "text-white"
                }`}
            >
              <Link href="/about" className="hover:text-purple-600">
                About
              </Link>
              <Link href="/terms" className="hover:text-purple-600">
                Terms
              </Link>

              <Link href="https://www.liveauctioneers.com/auctioneer/6177/ny-elizabeth/" className="hover:text-purple-600">
                Bid on Live Auctioneers
              </Link>
            </nav>
          </div>

          {/* Auctions Button */}
          <Link href="/find-auctions-near-me">
          <button
            // onClick={handleAuctionsClick}
            className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full md:w-auto justify-center"
            aria-label="Find auctions near me"
          >
            <FaMapMarkerAlt className="text-base sm:text-lg" />
            <span>Auctions Near Me</span>
          </button>
          </Link>
          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
              <div className="rounded-lg bg-white p-4 sm:p-8 shadow-xl w-full max-w-md">
                <h2 className="mb-4 text-lg sm:text-xl font-bold">Nearby Auctions</h2>
                <p className="mb-4 text-sm sm:text-base">Loading auctions in your area...</p>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-md bg-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 w-full sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
