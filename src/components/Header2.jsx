'use client';
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

const Header2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <header
      className={`fixed top-4 left-0 z-[9999] right-0 transition-all duration-300 w-full max-w-screen-xl mx-auto ${isScrolled
          ? "bg-white/5 shadow-lg rounded-full text-black border border-white/18"
          : "bg-transparent text-white"
        }`}
      style={{
        padding: isScrolled
          ? isMobile
            ? "3px"
            : "18px"
          : isMobile
            ? "5px"
            : "20px",
        boxShadow: isScrolled ? "0 8px 32px 0 rgba(31, 38, 135, 0.37)" : "none",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-1 md:space-y-0">
          <div className="flex items-center w-full md:w-auto justify-center md:justify-start relative">
            <Link href="/" className="flex-grow-0">
              <Image
                src="https://img1.wsimg.com/isteam/ip/05b280c7-f839-4e4d-9316-4bf01d28f2df/logo/b9e8f767-116c-4444-aab2-66386e072ec2.png/:/rs=w:110,h:80,cg:true,m/cr=w:110,h:80/qt=q:95"
                alt="NY Elizabeth"
                width={100}
                height={100}
                className="h-10 w-auto"
              />
            </Link>
            <button
              className="md:hidden absolute right-0 p-2 text-black font-semibold"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <HiX className="text-2xl" />
              ) : (
                <HiMenu className="text-2xl" />
              )}
            </button>
          </div>

          <nav
            className={`hidden md:flex space-x-6 text-sm sm:text-base items-center font-medium ${isScrolled ? "text-black" : "text-black"
              }`}
          >
            <Link href="/about" className="hover:text-purple-600">
              About
            </Link>
            <Link href="https://nyelizabeth.com/terms" className="hover:text-purple-600">
              Terms & Conditions
            </Link>
            <Link
              href="https://www.liveauctioneers.com/auctioneer/6177/ny-elizabeth/"
              className="hover:text-purple-600"
            >
              Bid on Live Auctioneers
            </Link>

            <Link href="https://beta.nyelizabeth.com/buy-now/">
              <button
                className="hidden md:flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full md:w-auto justify-center"
                aria-label="Find auctions near me"
              >
                {/* <FaMapMarkerAlt className="text-base sm:text-lg" /> */}
                <span>Buy Now</span>
              </button>
            </Link>
          </nav>

         
          {menuOpen && (
            <nav className="absolute top-full left-0 w-full bg-white text-black rounded-lg shadow-lg z-50 md:hidden">
              <div className="flex flex-col items-center text-sm font-medium space-y-4 px-6 py-4">
                <Link href="/about" className="hover:text-purple-600 text-center">
                  About
                </Link>
                <Link href="https://nyelizabeth.com/terms" className="hover:text-purple-600 text-center">
                  Terms & Conditions
                </Link>
                <Link
                  href="https://www.liveauctioneers.com/auctioneer/6177/ny-elizabeth/"
                  className="hover:text-purple-600 text-center"
                >
                  Bid on Live Auctioneers
                </Link>
                <Link href="https://beta.nyelizabeth.com/buy-now/" className="w-full">
                  <button
                    className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full justify-center"
                    aria-label="Find auctions near me"
                  >
                    {/* <FaMapMarkerAlt className="text-base sm:text-lg" /> */}
                    <span>Buy Now</span>
                  </button>
                </Link>
                <Link href="/find-auctions-near-me" className="w-full">
                  <button
                    className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full justify-center"
                    aria-label="Find auctions near me"
                  >
                    <FaMapMarkerAlt className="text-base sm:text-lg" />
                    <span>Auctions Near Me</span>
                  </button>
                </Link>
              </div>
            </nav>
          )}

          <Link href="/find-auctions-near-me">
            <button
              className="hidden md:flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full md:w-auto justify-center"
              aria-label="Find auctions near me"
            >
              <FaMapMarkerAlt className="text-base sm:text-lg" />
              <span>Auctions Near Me</span>
            </button>
          </Link>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
              <div className="rounded-lg bg-white p-4 sm:p-8 shadow-xl w-full max-w-md">
                <h2 className="mb-4 text-lg sm:text-xl font-bold">
                  Nearby Auctions
                </h2>
                <p className="mb-4 text-sm sm:text-base">
                  Loading auctions in your area...
                </p>
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

export default Header2;