'use client'
import React, { useState } from 'react';
import Image from "next/image";
import { CiSearch, CiMenuBurger, CiGlobe } from "react-icons/ci";
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setIsMenuOpen(false);
  };

  return (
    <div className="relative z-50">
      <header className="bg-white shadow-md relative">
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
                className="text-gray-700 focus:outline-none relative z-50"
                aria-label="Toggle Search"
              >
                <CiSearch className="h-6 w-6" />
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={toggleMenu} 
                className="text-gray-700 focus:outline-none relative z-50"
                aria-label="Toggle Menu"
              >
                <CiMenuBurger className="h-6 w-6" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/auctions" className="text-gray-700 hover:text-blue-900">Auctions</Link>
              <Link href="/buy-now" className="text-gray-700 hover:text-blue-900">Buy Now</Link>
              <Link href="/private-sales" className="text-gray-700 hover:text-blue-900">Private Sales</Link>
              <Link href="/sell" className="text-gray-700 hover:text-blue-900">Sell</Link>
              <Link href="/exclusive-access" className="text-gray-700 hover:text-blue-900">Exclusive Access</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-900">About</Link>
              <Link href="/past-auctions" className="text-gray-700 hover:text-blue-900">Past Auctions</Link>
              <Link href="/faq" className="text-gray-700 hover:text-blue-900">FAQ</Link>
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
                <button className="btn bg-blue-800 text-white px-4 py-1 rounded-md">
                  Login
                </button>
                <button className="btn bg-blue-600 text-white px-4 py-1 rounded-md">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute w-full bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-2'
        }`}
        style={{
          zIndex: 40,
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          height: isMenuOpen ? 'auto' : 0,
          overflow: 'hidden'
        }}
      >
        <nav className="flex flex-col py-4 bg-white">
          <Link href="/auctions" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Auctions</Link>
          <Link href="/buy-now" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Buy Now</Link>
          <Link href="/private-sales" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Private Sales</Link>
          <Link href="/sell" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Sell</Link>
          <Link href="/exclusive-access" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Exclusive Access</Link>
          <Link href="/about" className="px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
          <Link href="/past-auctions" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Past Auctions</Link>
          <Link href="/faq" className="px-4 py-2 text-gray-700 hover:bg-gray-100">FAQ</Link>
          
          {/* Mobile Buttons */}
          <div className="px-4 py-2 space-y-2">
            <button className="btn w-full bg-blue-800 text-white px-4 py-2 rounded-md">
              Login
            </button>
            <button className="btn w-full bg-blue-600 text-white px-4 py-2 rounded-md">
              Join
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div 
          className="absolute w-full bg-white shadow-lg p-4 md:hidden"
          style={{
            zIndex: 40,
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
          }}
        >
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
  );
};

export default Header;