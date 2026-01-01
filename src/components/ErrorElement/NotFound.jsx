import React from 'react';
import { Link } from 'react-router';


const NotFound = () => {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4">
      <div className="max-w-xl w-full text-center">
        
        {/* Error Code */}
        <h1 className="text-[100px] sm:text-[140px] font-extrabold text-amber-500 drop-shadow-lg">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          Page Not Found 📚
        </h2>

        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Oops! The page you are looking for doesn’t exist or the book has been
          moved to another shelf.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-full bg-amber-500 text-white font-semibold text-sm sm:text-base hover:bg-amber-600 transition duration-300 shadow-md"
        >
          📖 Back to Home
        </Link>

        {/* Decorative Book Icons */}
        <div className="mt-10 flex justify-center gap-4 text-4xl opacity-70">
          <span>📕</span>
          <span>📗</span>
          <span>📘</span>
        </div>
      </div>
    </div>
  );
};


export default NotFound;