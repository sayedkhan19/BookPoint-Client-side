import React, { useEffect, useMemo, useState } from "react";
import axiosPublic from "../../Axios/axiosPublic";
import { useNavigate } from "react-router";
import useAuth from "../useAuth";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  /* ================= FETCH USER CART ================= */
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/my-cart?email=${user.email}`)
        .then((res) => setBooks(res.data));
    }
  }, [user]);

  /* ================= CALCULATIONS ================= */
  const totalBooks = books.length;

  const totalPrice = useMemo(
    () => books.reduce((sum, item) => sum + Number(item.price), 0),
    [books]
  );

  /* ================= DELETE CART ITEM ================= */
  const confirmDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-white shadow-xl rounded-xl p-4 w-72">
        <p className="font-semibold text-gray-800 mb-3">
          Remove this book?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={() => handleDelete(id, t.id)}
            className="px-4 py-1 rounded-lg bg-red-500 text-white"
          >
            Remove
          </button>
        </div>
      </div>
    ));
  };

  const handleDelete = (id, toastId) => {
    axiosPublic.delete(`/cart/${id}`).then(() => {
      toast.dismiss(toastId);
      toast.success("Removed from cart 🗑️");
      setBooks((prev) => prev.filter((item) => item._id !== id));
    });
  };

  /* ================= PROCEED TO ORDER ================= */
  const handleProceedOrder = () => {
    if (books.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // 🔥 cart-session id (can be improved later)
    const orderId = "cart";

    navigate(`/order/${orderId}`, {
      state: {
        cartItems: books,
        totalPrice,
        user: {
          email: user.email,
          uid: user.uid,
          name: user.displayName,
        },
      },
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Please login first
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-8 text-center">
        🛒 My Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= LEFT: CART ITEMS ================= */}
        <div className="lg:col-span-2 space-y-4">
          {books.length === 0 ? (
            <p className="text-center text-gray-500">
              You have not added any books yet
            </p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="flex gap-4 bg-white rounded-xl shadow-sm p-4 items-center"
              >
                {/* Image */}
                <img
                  src={book.cover}
                  alt={book.name}
                  className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg cursor-pointer"
                  onClick={() => navigate(`/books/${book.bookId}`)}
                />

                {/* Info */}
                <div className="flex-1">
                  <h3
                    onClick={() => navigate(`/books/${book.bookId}`)}
                    className="font-semibold text-base sm:text-lg cursor-pointer hover:text-indigo-600"
                  >
                    {book.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    ${book.price}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => confirmDelete(book._id)}
                  className="text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* ================= RIGHT: SUMMARY ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-5 h-fit lg:sticky lg:top-24">

          <h3 className="text-lg font-bold mb-4">
            📊 Order Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Total Books</span>
              <span className="font-semibold">{totalBooks}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Price</span>
              <span className="font-semibold text-indigo-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <hr className="my-4" />

          <button
            onClick={handleProceedOrder}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 transition"
          >
            🚀 Proceed to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
