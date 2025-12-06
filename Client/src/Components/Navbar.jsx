import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="170" height="40" viewBox="0 0 180 40" fill="none">
              <g transform="translate(0,3)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0C7.61114 0 0 7.61116 0 17C0 26.3888 7.61114 34 17 34ZM22.3034 7.91931C22.5616 7.00234 21.6717 6.46011 20.859 7.0391L9.51415 15.1211C8.63278 15.749 8.77142 17 9.7224 17H12.7098V16.9768H18.5321L13.788 18.6508L11.6966 26.0807C11.4385 26.9977 12.3282 27.5399 13.141 26.9609L24.4859 18.8789C25.3672 18.251 25.2285 17 24.2776 17H19.7473L22.3034 7.91931Z"
                  fill="#0260FF" />
              </g>

              <text x="45" y="30"
                font-family="Inter, Arial, sans-serif"
                font-size="25"
                font-weight="700"
                fill="#0260FF"
                >
                Study-Hub
              </text>
            </svg>

          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {/* <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link> */}
            <Link to="/signup" className="backgroundcolor w-30 h-10 text-white border-r-8 flex justify-center items-center rounded-xl">Sign Up</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {!isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link to="/" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Home</Link>
          <Link to="/about" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">About</Link>
        </div>
      )}
    </nav>
  );
}
