import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="statsSection2 text-white py-8">
      <div className="container mx-auto px-4 max-w-screen-2xl">
        {/* Footer Columns - Now full width on mobile, centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact-us" className="hover:underline">Contact Us</Link></li>
              <Link href="/FAQs">
                <li href="#" className="hover:underline">FAQ</li>
              </Link>
              <li><Link href="https://auction.nyelizabeth.com/sitemap-index.xml" className="hover:underline">Site Map</Link></li>
           </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">More...</h3>
            <ul className="space-y-2">
              <Link href="https://nyelizabeth.com/"><li className="hover:underline">Press</li></Link>
              <li><Link href="/terms" className="hover:underline">Terms</Link></li>
              {/* <li><a href="#" className="hover:underline">Privacy Policy</a></li> */}
              <li><a href="#" className="hover:underline">Do Not Sell My Personal Information</a></li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <Link href="https://www.instagram.com/nyelizabethauction/" className="hover:text-gray-300">
                <FaInstagram className="w-6 h-6" />
              </Link>

              <Link href="https://www.linkedin.com/company/nyelizabeth" className="hover:text-gray-300" aria-label="LinkedIn">
                <FaLinkedin className="w-6 h-6" />
              </Link>
              <Link href="https://www.youtube.com/c/nyelizabeth" className="hover:text-gray-300" aria-label="YouTube">
                <FaYoutube className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row - Stacked on mobile */}
        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col items-center text-center space-y-2">
          <p className="text-sm text-gray-400">
            Copyright © 2025 NY Elizabeth - All Rights Reserved.
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