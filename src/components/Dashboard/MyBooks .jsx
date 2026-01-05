import React, { useEffect, useState } from "react";
import axiosPublic from "../../Axios/axiosPublic";
import { useNavigate } from "react-router";
import useAuth from "../useAuth";
import toast from "react-hot-toast";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/my-cart?email=${user.email}`)
        .then((res) => setBooks(res.data));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login first</p>
      </div>
    );
  }

  // ✅ DELETE HANDLER
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Remove this book from cart?");
    if (!confirmDelete) return;

    axiosPublic.delete(`/cart/${id}`).then(() => {
      toast.success("Removed from cart 🗑️");

      // update UI instantly
      setBooks((prev) => prev.filter((item) => item._id !== id));
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-30">
      <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
        📚 My Books
      </h2>

      {books.length === 0 && (
        <p className="text-center text-gray-500">
          You have not added any books yet
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={book.cover}
              alt={book.name}
              className="w-full h-52 object-cover rounded-lg mb-3 cursor-pointer"
              onClick={() => navigate(`/books/${book.bookId}`)}
            />

            <h3 className="font-semibold text-lg line-clamp-1">
              {book.name}
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              ${book.price}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(book._id)}
              className="mt-auto bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
