import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosPublic from "../../Axios/axiosPublic";
import Swal from "sweetalert2";
import useAuth from "../useAuth";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [adding, setAdding] = useState(false);

  /* ================= FETCH BOOK ================= */
  useEffect(() => {
    axiosPublic.get(`/books/${id}`).then((res) => {
      setBook(res.data);
    });
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading book...
      </div>
    );
  }

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add books to cart",
      });
      navigate("/login");
      return;
    }

    // 🔥 SAME STRUCTURE AS ALL OTHER PAGES
    const cartItem = {
      userId: user.uid,
      userEmail: user.email, // ✅ MUST MATCH
      bookId: book._id,
      name: book.name,
      price: book.price,
      cover: book.cover,
      quantity: 1,
      addedAt: new Date(),
    };

    try {
      setAdding(true);
      await axiosPublic.post("/cart", cartItem);

      Swal.fire({
        icon: "success",
        title: "Added to Cart 🛒",
        text: `${book.name} added successfully`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not add to cart",
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-gray-50 py-24 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={book.cover}
              alt={book.name}
              className="w-full max-w-sm h-80 object-cover rounded-xl border"
            />
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {book.name}
            </h2>

            <p className="text-gray-500 mb-3">
              by <span className="font-medium">{book.author}</span>
            </p>

            <p className="text-2xl font-bold text-indigo-600 mb-4">
              ${book.price}
            </p>

            <p className="text-gray-700 mb-6">
              {book.details}
            </p>

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

            <button
              onClick={handleAddToCart}
              disabled={adding || book.stock === 0}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 disabled:opacity-60"
            >
              🛒 {adding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
