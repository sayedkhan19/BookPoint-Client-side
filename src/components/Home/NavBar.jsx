import React, { useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../useAuth";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const handleLogout = () => {
  logOut()
    .then(() => {
      toast.success("Logged out successfully 👋");
    })
    .catch((err) => {
      toast.error(err.message);
    });
};


  const linkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600";

  return (
    <nav className="bg-white border-b shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl"
            >
              ☰
            </button>

            <NavLink to="/" className="text-xl font-bold text-indigo-600">
              📚 BookPoint
            </NavLink>
          </div>

          {/* Search */}
          <div className="hidden md:block w-1/2">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ================= Desktop Menu ================= */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">

            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            {/* ✅ Categories Dropdown (FIXED) */}
            <div className="relative group">
              <span className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-indigo-600">
                Categories
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>

              <div className="absolute left-0 top-full mt-2 w-44 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <NavLink className="block px-4 py-2 hover:bg-indigo-50">Fiction</NavLink>
                <NavLink className="block px-4 py-2 hover:bg-indigo-50">Non-Fiction</NavLink>
                <NavLink className="block px-4 py-2 hover:bg-indigo-50">Programming</NavLink>
                <NavLink className="block px-4 py-2 hover:bg-indigo-50">Academic</NavLink>
                <NavLink className="block px-4 py-2 hover:bg-indigo-50">Kids</NavLink>
              </div>
            </div>

            <NavLink to="/cart" className={linkClass}>
              Cart
            </NavLink>

            {/* ✅ More Dropdown */}
            <div className="relative group">
              <span className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-indigo-600">
                More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>

              <div className="absolute left-0 top-full mt-2 w-40 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <NavLink to="/add-book" className="block px-4 py-2 hover:bg-indigo-50">Add Book</NavLink>
                <NavLink className="block px-4 py-2 hover:bg-indigo-50">Wishlist</NavLink>
                <NavLink className="block px-4 py-2 hover:bg-indigo-50">Orders</NavLink>
              </div>
            </div>

            {/* ✅ Auth Conditional */}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      {open && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="p-4 space-y-3 text-sm">

            <NavLink to="/" className="block">Home</NavLink>

            {/* Categories */}
            <button
              onClick={() => setMobileCatOpen(!mobileCatOpen)}
              className="w-full flex justify-between"
            >
              Categories <span>▾</span>
            </button>

            {mobileCatOpen && (
              <div className="ml-4 space-y-2">
                <NavLink className="block">Fiction</NavLink>
                <NavLink className="block">Non-Fiction</NavLink>
                <NavLink className="block">Programming</NavLink>
                <NavLink className="block">Academic</NavLink>
                <NavLink className="block">Kids</NavLink>
              </div>
            )}

            <NavLink to="/cart" className="block">Cart</NavLink>

            {/* More */}
            <button
              onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
              className="w-full flex justify-between"
            >
              More <span>▾</span>
            </button>

            {mobileMoreOpen && (
              <div className="ml-4 space-y-2">
                <NavLink to="/add-book" className="block">Add Book</NavLink>
                <NavLink className="block">Wishlist</NavLink>
                <NavLink className="block">Orders</NavLink>
              </div>
            )}

            {/* Auth */}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-red-600 block cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/auth/login" className="block cursor-pointer">
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
