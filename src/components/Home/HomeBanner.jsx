import React, { useEffect, useState } from "react";
import bannerImg from "../../assets/713.jpg";
import { NavLink, useNavigate } from "react-router";
import axiosPublic from "../../Axios/axiosPublic";

const HomeBanner = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  /* ================= LIVE SEARCH ================= */
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axiosPublic.get(
          `/books/search?q=${query}`
        );
        setResults(res.data);
        setShowDropdown(true);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  /* ================= SEARCH BUTTON ================= */
  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/all-books?search=${query}`);
    setShowDropdown(false);
  };

  /* ================= SELECT BOOK ================= */
  const handleSelectBook = (id) => {
    setShowDropdown(false);
    setQuery("");
    navigate(`/books/${id}`);
  };

  return (
    <section className="bg-gradient-to-r from-indigo-50 to-white pt-14">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">

          {/* LEFT */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
              Discover Your Next{" "}
              <span className="text-indigo-600">Favorite Book</span>
            </h1>

            <p className="mt-4 text-gray-600">
              Find books by title, author, or category instantly.
            </p>

            {/* SEARCH */}
            <div className="relative mt-6 max-w-lg mx-auto md:mx-0">
              <div className="flex">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => query && setShowDropdown(true)}
                  placeholder="Search books or authors..."
                  className="w-full px-4 py-3 border rounded-l-full focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-r-full hover:bg-indigo-500"
                >
                  Search
                </button>
              </div>

              {/* DROPDOWN */}
              {showDropdown && (
                <div className="absolute z-30 bg-white w-full mt-2 rounded-xl shadow-lg overflow-hidden">
                  {results.length > 0 ? (
                    results.map((book) => (
                      <div
                        key={book._id}
                        onClick={() => handleSelectBook(book._id)}
                        className="flex items-center gap-3 p-3 hover:bg-indigo-50 cursor-pointer"
                      >
                        <img
                          src={book.cover}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">
                            {book.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-gray-500">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-6 flex justify-center md:justify-start gap-4">
              <NavLink
                to="/all-books"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md"
              >
                Browse Books
              </NavLink>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex-1 flex justify-center">
            <img
              src={bannerImg}
              alt="Books"
              className="w-full max-w-md rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
