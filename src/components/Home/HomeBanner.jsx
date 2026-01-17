import React, { useEffect, useRef, useState } from "react";
import bannerImg from "../../assets/713.jpg";
import { NavLink, useNavigate } from "react-router";

const HomeBanner = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  /* ================= LIVE SEARCH ================= */
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]); 
      setOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`http://localhost:5000/books/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setOpen(true);
        })
        .catch(() => {
          setResults([]);
          setOpen(false);
        });
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= SELECT BOOK ================= */
  const handleSelect = (id) => {
    setOpen(false);
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
              Search by book name or author
            </p>

            {/* SEARCH BOX */}
            <div ref={boxRef} className="relative mt-6 max-w-lg mx-auto md:mx-0">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books or authors..."
                className="w-full px-5 py-3 border rounded-full focus:ring-2 focus:ring-indigo-500"
              />

              {/* DROPDOWN */}
              {open && (
                <div className="absolute z-40 w-full bg-white mt-2 rounded-xl shadow-xl overflow-hidden">
                  {results.length > 0 ? (
                    results.map((book) => (
                      <div
                        key={book._id}
                        onMouseDown={() => handleSelect(book._id)}
                        className="flex items-center gap-3 p-3 hover:bg-indigo-50 cursor-pointer"
                      >
                        <img
                          src={book.cover}
                          alt={book.name}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-semibold">
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
                      No books found
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-6">
              <NavLink
                to="/all-books"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
              >
                Browse All Books
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
