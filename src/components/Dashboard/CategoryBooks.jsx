import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../useAuth";
import axiosPublic from "../../Axios/axiosPublic";

const CategoryBooks = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/books/category/${category}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [category]);

  // ✅ ADD TO CART
  const handleAddToCart = (book) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const cartItem = {
      bookId: book._id,
      userEmail: user.email,
      name: book.name,
      price: book.price,
      cover: book.cover,
      quantity: 1,
      addedAt: new Date(),
    };

    axiosPublic.post("/cart", cartItem).then(() => {
      toast.success("Added to cart 🛒");
    });
  };

  // ✅ ORDER NOW
  const handleOrderNow = (bookId) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    navigate(`/order/${bookId}`);
  };

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
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                {/* Image */}
                <img
                  src={book.cover}
                  alt={book.name}
                  className="w-full h-56 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() => navigate(`/books/${book._id}`)}
                />

                {/* Info */}
                <h3 className="font-semibold text-lg line-clamp-1">
                  {book.name}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {book.author}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-indigo-600">
                    ${book.price}
                  </span>

                  <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                    ⭐ {book.rating?.average || 0}
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-auto space-y-2">
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition"
                  >
                    🛒 Add to Cart
                  </button>

                  <button
                    onClick={() => handleOrderNow(book._id)}
                    className="w-full border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition"
                  >
                    ⚡ Order Now
                  </button>
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
