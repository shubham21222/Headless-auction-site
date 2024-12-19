'use client'
import React, { useState } from 'react';
import Image from "next/image";
import Logo from "../assets/AZ_Logo.png";
import { CiSearch, CiMenuBurger, CiGlobe } from "react-icons/ci";
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto max-w-screen-2xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
            <Image
              src="https://beta.nyelizabeth.com/wp-content/uploads/2024/05/Rectangle.svg"
              alt="NY Elizabeth"
              width={100}
              height={100}
              className="h-10 w-auto"
            />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Search Toggle for Mobile */}
            <button 
              onClick={toggleSearch} 
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle Search"
            >
              <CiSearch className="h-6 w-6" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMenu} 
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <CiGlobe className="h-6 w-6" />
              ) : (
                <CiMenuBurger className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="/auctions" className="text-gray-700 hover:text-blue-900">Auctions</a>
            <a href="/buy-now" className="text-gray-700 hover:text-blue-900">Buy Now</a>
            <a href="/private-sales" className="text-gray-700 hover:text-blue-900">Private Sales</a>
            <a href="/sell" className="text-gray-700 hover:text-blue-900">Sell</a>
            <a href="/exclusive-access" className="text-gray-700 hover:text-blue-900">Exclusive Access</a>
            <a href="/about" className="text-gray-700 hover:text-blue-900">About</a>
            <a href="/past-auctions" className="text-gray-700 hover:text-blue-900">Past Auctions</a>
            <a href="/faq" className="text-gray-700 hover:text-blue-900">FAQ</a>
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Favorites */}
            <button aria-label="Favorites" className="text-gray-700 hover:text-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>

            {/* Language Dropdown */}
            <select
              className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none"
              defaultValue="EN"
            >
              <option value="EN">EN</option>
              <option value="FR">FR</option>
              <option value="ES">ES</option>
            </select>

            {/* Search */}
            <div className="flex items-center border rounded-md px-2">
              <input
                type="text"
                placeholder="Search NY Elizabeth"
                className="outline-none px-2 py-1 w-40 lg:w-64"
              />
              <button aria-label="Search">
                <CiSearch />
              </button>
            </div>

            {/* Buttons */}
            <div className="space-x-2">
              <button className="bg-blue-800 text-white px-4 py-1 rounded-md">
                Login
              </button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded-md">
                Join
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 md:hidden">
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <Link href="/auctions"><a href="/auctions" className="text-gray-700 hover:text-blue-900">Auctions</a></Link>
                <a href="/buy-now" className="text-gray-700 hover:text-blue-900">Buy Now</a>
                <a href="/private-sales" className="text-gray-700 hover:text-blue-900">Private Sales</a>
                <a href="/sell" className="text-gray-700 hover:text-blue-900">Sell</a>
                <a href="/exclusive-access" className="text-gray-700 hover:text-blue-900">Exclusive Access</a>
                <a href="/about" className="text-gray-700 hover:text-blue-900">About</a>
                <a href="/past-auctions" className="text-gray-700 hover:text-blue-900">Past Auctions</a>
                <a href="/faq" className="text-gray-700 hover:text-blue-900">FAQ</a>
                
                {/* Mobile Specific Buttons */}
                <div className="space-x-2">
                  <button className="btn bg-blue-800 text-white px-4 py-1 rounded-md">
                    Login
                  </button>
                  <button className="btn bg-blue-600 text-white px-4 py-1 rounded-md">
                    Join
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Search Overlay */}
          {isSearchOpen && (
            <div className="fixed inset-x-0 top-0 z-50 bg-white p-4 md:hidden">
              <div className="flex items-center border rounded-md px-2">
                <input
                  type="text"
                  placeholder="Search NY Elizabeth"
                  className="outline-none px-2 py-2 w-full"
                />
                <button onClick={toggleSearch} aria-label="Close Search">
                  <CiGlobe className="h-6 w-6 text-gray-700" />
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