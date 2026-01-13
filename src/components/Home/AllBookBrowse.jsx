import React, { useEffect, useState } from "react";
import axiosPublic from "../../Axios/axiosPublic";
import { useNavigate } from "react-router";
import useAuth from "../useAuth";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

const AllBookBrowse = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  /* ================= FETCH ALL BOOKS ================= */
  useEffect(() => {
    axiosPublic
      .get("/books")
      .then((res) => {
        // support both paginated & non-paginated response
        setBooks(res.data.books || res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load books");
        setLoading(false);
      });
  }, []);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = (book) => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const cartItem = {
      userId: user.uid,
      userEmail: user.email, // ✅ MUST MATCH BACKEND
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading books...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
        📚 Browse All Books
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">
          No books available right now
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              {/* Image */}
              <img
                src={book.cover}
                alt={book.name}
                className="h-52 w-full object-cover rounded-lg cursor-pointer"
                onClick={() => navigate(`/books/${book._id}`)}
              />

              {/* Info */}
              <h3
                onClick={() => navigate(`/books/${book._id}`)}
                className="font-semibold mt-3 line-clamp-1 cursor-pointer hover:text-indigo-600"
              >
                {book.name}
              </h3>

              <p className="text-sm text-gray-500">{book.author}</p>

              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-indigo-600">
                  ${book.price}
                </span>

                <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                  ⭐ {book.rating?.average || 0}
                </span>
              </div>

              {/* Buttons */}
              <div className="mt-auto pt-4 space-y-2">
                <button
                  onClick={() => handleAddToCart(book)}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>

                <button
                  onClick={() => navigate(`/books/${book._id}`)}
                  className="w-full border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition"
                >
                  📖 View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBookBrowse;
