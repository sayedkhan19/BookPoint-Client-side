import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosPublic from "../../Axios/axiosPublic";
import toast from "react-hot-toast";
import useAuth from "../useAuth";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">Loading book...</p>
      </div>
    );
  }

  // ✅ ADD TO CART HANDLER
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const cartItem = {
      userId: user.uid,
      email: user.email,
      bookId: book._id,
      name: book.name,
      price: book.price,
      cover: book.cover,
      quantity: 1,
      addedAt: new Date(),
    };

    axiosPublic.post("/cart", cartItem)
      .then(() => {
        toast.success("Added to cart 🛒");
      })
      .catch(() => {
        toast.error("Failed to add to cart");
      });
  };

  return (
    <div className="bg-gray-50 py-32 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Book Image */}
          <div className="flex justify-center">
            <img
              src={book.cover}
              alt={book.name}
              className="w-full max-w-sm h-96 object-cover rounded-xl border"
            />
          </div>

          {/* Book Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {book.name}
            </h2>

            <p className="text-gray-500 mb-3">
              by <span className="font-medium">{book.author}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ {book.rating?.average || 0}
              </span>
              <span className="text-sm text-gray-500">
                ({book.rating?.count || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold text-indigo-600 mb-4">
              ${book.price}
            </p>

            {/* Details */}
            <p className="text-gray-700 leading-relaxed mb-6">
              {book.details}
            </p>

            {/* Stock */}
            <p className="mb-6 text-sm">
              Availability:{" "}
              {book.stock > 0 ? (
                <span className="text-green-600 font-semibold">
                  In Stock ({book.stock})
                </span>
              ) : (
                <span className="text-red-500 font-semibold">
                  Out of Stock
                </span>
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={book.stock === 0}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 transition disabled:opacity-60"
              >
                🛒 Add to Cart
              </button>

              <button
                disabled={book.stock === 0}
                className="flex-1 border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition disabled:opacity-60"
              >
                ⚡ Order Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookDetails;
