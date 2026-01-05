import React from "react";
import bannerImg from "../../assets/713.jpg"; // use your image

const HomeBanner = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">

          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
              Discover Your Next <span className="text-indigo-600">Favorite Book</span>
            </h1>

            <p className="mt-4 text-gray-600 text-base md:text-lg">
              BookPoint is your one-stop online bookstore for academic,
              programming, fiction, and non-fiction books at the best prices.
            </p>

            {/* Search Bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Search books, authors, ISBN..."
                className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition">
                Search
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex justify-center md:justify-start gap-4">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition">
                Browse Books
              </button>
              <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={bannerImg}
              alt="Books Banner"
              className="w-full max-w-md md:max-w-lg rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
