import React from 'react';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 max-w-screen-2xl">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Support Column - Left Aligned */}
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Site Map</a></li>
            </ul>
          </div>

          {/* More Column - Center Aligned */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">More...</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Press</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Do Not Sell My Personal Information</a></li>
            </ul>
          </div>

          {/* Follow Us Column - Right Aligned */}
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="space-y-2">
              <div className="flex justify-end space-x-4">
                <a href="#" className="hover:text-gray-300" aria-label="Instagram">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-gray-300" aria-label="LinkedIn">
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-gray-300" aria-label="YouTube">
                  <FaYoutube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-center">
          <p className="text-sm text-gray-400 mb-2 sm:mb-0">
            Copyright © 2024 AZ Auction - All Rights Reserved.
          </p>
          <p className="text-sm text-gray-400">
            <a href="#" className="hover:underline">Certificate Check</a> | <a href="#" className="hover:underline">NY Elizabeth Membership</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;