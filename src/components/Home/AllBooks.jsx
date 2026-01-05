import React, { useEffect, useState } from "react";
import axiosPublic from "../../Axios/axiosPublic";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../useAuth";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const limit = 8;
  const totalPages = Math.ceil(total / limit);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .get(`/books?page=${page}&limit=${limit}`)
      .then((res) => {
        setBooks(res.data.books);
        setTotal(res.data.total);
      });
  }, [page]);

  const handleAddToCart = (book) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const cartItem = {
      userId: user.uid,
      userEmail: user.email,
      bookId: book._id,
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
        📚 All Books
      </h2>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={book.cover}
              alt={book.name}
              className="h-48 w-full object-cover rounded cursor-pointer"
              onClick={() => navigate(`/books/${book._id}`)}
            />

            <h3 className="font-semibold mt-2 line-clamp-1">
              {book.name}
            </h3>

            <p className="text-sm text-gray-500">
              {book.author}
            </p>

            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-indigo-600">
                ${book.price}
              </span>
              <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                ⭐ {book.rating?.average || 0}
              </span>
            </div>

            <button
              onClick={() => handleAddToCart(book)}
              className="w-full mt-3 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-4 py-2 rounded ${
              page === num
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default AllBooks;
