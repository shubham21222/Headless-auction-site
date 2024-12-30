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
      className={`fixed top-4 left-0 right-0 z-[9999] transition-all duration-300 w-full max-w-screen-2xl mx-auto ${
        isScrolled
          ? "bg-white text-white shadow-lg rounded-full"
          : "bg-transparent text-black"
      }`}
      style={{ padding: isScrolled ? "8px" : "12px" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Links */}
          <div className="flex items-center w-full md:w-auto">
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
              className={`hidden md:flex ml-6 space-x-4 text-sm sm:text-base font-medium ${
                isScrolled ? "text-black" : "text-black"
              }`}
            >
              <Link href="/about" className="hover:text-purple-600">
                About
              </Link>
              <Link href="/terms" className="hover:text-purple-600">
                Terms
              </Link>
              <Link href="/live-auctioneers" className="hover:text-purple-600">
                Bid on Live Auctioneers
              </Link>
            </nav>
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden p-2 text-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenu className="text-2xl" />
            )}
          </button>

          {/* Mobile Navigation */}
          <nav
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent rounded-lg md:rounded-none z-[9998] md:space-x-4 md:space-y-0 space-y-4 md:top-0`}
          >
            <div className="flex flex-col md:hidden text-sm sm:text-base font-medium space-y-4 px-4 py-4">
              <Link href="/about" className="hover:text-purple-600">
                About
              </Link>
              <Link href="/terms" className="hover:text-purple-600">
                Terms
              </Link>
              <Link href="/live-auctioneers" className="hover:text-purple-600">
                Bid on Live Auctioneers
              </Link>
            </div>
          </nav>

          {/* Auctions Button */}
          <button
            onClick={handleAuctionsClick}
            className="hidden md:flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full md:w-auto justify-center"
            aria-label="Find auctions near me"
          >
            <FaMapMarkerAlt className="text-base sm:text-lg" />
            <span>Auctions Near Me</span>
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50 px-4">
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
    </header>
  );
};

export default Header2;
