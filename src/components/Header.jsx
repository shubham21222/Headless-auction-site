// components/Header.js
import React from "react";
import Image from "next/image";
import Logo from "../assets/AZ_Logo.png"
import { CiSearch } from "react-icons/ci";


const Header = () => {
  return (
    <header className="bg-white shadow-md ">
      <div className="container mx-auto flex items-center max-w-screen-2xl justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src={Logo}
            alt="NY Elizabeth"
            width={100}
            height={100}
          />
          {/* <span className="text-lg font-bold text-blue-900">NY ELIZABETH</span> */}
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/auctions" className="text-gray-700 hover:text-blue-900">
            Auctions
          </a>
          <a href="/buy-now" className="text-gray-700 hover:text-blue-900">
            Buy Now
          </a>
          <a href="/private-sales" className="text-gray-700 hover:text-blue-900">
            Private Sales
          </a>
          <a href="/sell" className="text-gray-700 hover:text-blue-900">Sell</a>
          <a href="/exclusive-access" className="text-gray-700 hover:text-blue-900">
            Exclusive Access
          </a>
          <a href="/about" className="text-gray-700 hover:text-blue-900">About</a>
          <a href="/past-auctions" className="text-gray-700 hover:text-blue-900">
            Past Auctions
          </a>
          <a href="/faq" className="text-gray-700 hover:text-blue-900">FAQ</a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Heart Icon */}
          <button aria-label="Favorites">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
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
          <div className="relative">
            <select
              className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none"
              defaultValue="EN"
            >
              <option value="EN">EN</option>
              <option value="FR">FR</option>
              <option value="ES">ES</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center border rounded-md px-2">
            <input
              type="text"
              placeholder="Search NY Elizabeth"
              className="outline-none px-2 py-1 w-40 md:w-64"
            />
            <button>
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
      </div>
    </header>
  );
};

export default Header;
