import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const CategoryBooks = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/books/category/${category}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [category]);

  return (
    <div className="bg-gray-50 min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold text-indigo-600 mb-10 text-center">
          {category} Books
        </h2>

        {/* Grid */}
        {books.length === 0 ? (
          <p className="text-center text-gray-500">
            No books found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                onClick={() => navigate(`/books/${book._id}`)}
                className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-4"
              >
                <img
                  src={book.cover}
                  alt={book.name}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />

                <h3 className="font-semibold text-lg line-clamp-1">
                  {book.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {book.author}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-indigo-600">
                    ${book.price}
                  </span>

                  <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                    ⭐ {book.rating?.average || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryBooks;
