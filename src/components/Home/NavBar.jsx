import React, { useState } from 'react';
import { NavLink } from 'react-router';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Left */}
          <div className="flex items-center gap-3">
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

            <h1 className="text-xl font-bold text-indigo-600">
              📚 BookPoint
            </h1>
          </div>

          {/* Search */}
          <div className="hidden md:block w-1/2">
            <input
              type="text"
              placeholder="Search books, authors..."
              className="w-full px-4 py-2 border bg-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-indigo-600">Home</a>

            {/* Desktop Categories */}
            <div className="relative group">
              <button className="hover:text-indigo-600 flex items-center gap-1">
                Categories
                <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-0 top-full mt-2 w-44 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <ul className="py-2 text-sm">
                  <li><a href="#" className="block px-4 py-2 hover:bg-indigo-50">Fiction</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-indigo-50">Non-Fiction</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-indigo-50">Programming</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-indigo-50">Academic</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-indigo-50">Kids</a></li>
                </ul>
              </div>
            </div>

            <a href="#" className="hover:text-indigo-600">Cart</a>
            <a href="#" className="block hover:text-indigo-600">Add Book</a>
            <NavLink to="/login"> <a href="#" className="hover:text-indigo-600">Login</a> </NavLink>
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

            {/* Mobile Categories Toggle */}
            <button
              onClick={() => setMobileCatOpen(!mobileCatOpen)}
              className="w-full flex items-center justify-between hover:text-indigo-600"
            >
              Categories
              <svg
                className={`w-4 h-4 transition-transform ${mobileCatOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileCatOpen && (
              <div className="ml-4 space-y-2 text-sm">
                <a href="#" className="block hover:text-indigo-600">Fiction</a>
                <a href="#" className="block hover:text-indigo-600">Non-Fiction</a>
                <a href="#" className="block hover:text-indigo-600">Programming</a>
                <a href="#" className="block hover:text-indigo-600">Academic</a>
                <a href="#" className="block hover:text-indigo-600">Kids</a>
              </div>
            )}

            <a href="#" className="block hover:text-indigo-600">Cart</a>
            <a href="#" className="block hover:text-indigo-600">Add Book</a>
            <a href="#" className="block hover:text-indigo-600">Login</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
