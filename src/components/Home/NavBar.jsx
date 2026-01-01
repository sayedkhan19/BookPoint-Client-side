import React, { useState } from 'react';

const NavBar = () => {
    const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Mobile Menu Icon + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Logo */}
            <h1 className="text-xl font-bold text-indigo-600">
              📚 BookPoint
            </h1>
          </div>

          {/* Center: Search (Desktop only) */}
          <div className="hidden md:block w-1/2">
            <input
              type="text"
              placeholder="Search books, authors..."
              className="w-full px-4 py-2 border bg-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Right: Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-indigo-600">Home</a>
            <a href="#" className="hover:text-indigo-600">Categories</a>
            <a href="#" className="hover:text-indigo-600">Cart</a>
            <a href="#" className="hover:text-indigo-600">Login</a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-3 text-gray-700">
            
            <input
              type="text"
              placeholder="Search books..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <a href="#" className="block hover:text-indigo-600">Home</a>
            <a href="#" className="block hover:text-indigo-600">Categories</a>
            <a href="#" className="block hover:text-indigo-600">Cart</a>
            <a href="#" className="block hover:text-indigo-600">Login</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;