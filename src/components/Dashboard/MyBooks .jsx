import React, { useEffect, useMemo, useState } from "react";
import axiosPublic from "../../Axios/axiosPublic";
import { useNavigate } from "react-router";
import useAuth from "../useAuth";
import toast from "react-hot-toast";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  /* ================= FETCH USER CART ================= */
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/my-cart?email=${user.email}`)
        .then((res) => {
          const data = res.data.map((item) => ({
            ...item,
            quantity: item.quantity || 1, // ensure quantity
          }));
          setBooks(data);
        })
        .catch(() => toast.error("Failed to load cart"));
    }
  }, [user]);

  /* ================= TOTALS ================= */
  const totalBooks = useMemo(
    () => books.reduce((sum, b) => sum + b.quantity, 0),
    [books]
  );

  const totalPrice = useMemo(
    () =>
      books.reduce(
        (sum, b) => sum + Number(b.price) * b.quantity,
        0
      ),
    [books]
  );

  /* ================= QUANTITY ================= */
  const increaseQty = (id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, quantity: b.quantity + 1 } : b
      )
    );
  };

  const decreaseQty = (id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b._id === id && b.quantity > 1
          ? { ...b, quantity: b.quantity - 1 }
          : b
      )
    );
  };

  /* ================= REMOVE ================= */
  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-white shadow-lg rounded-lg p-4 w-72">
        <p className="font-semibold mb-3">
          Remove this book from cart?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              axiosPublic.delete(`/cart/${id}`).then(() => {
                toast.dismiss(t.id);
                toast.success("Removed from cart");
                setBooks((prev) =>
                  prev.filter((b) => b._id !== id)
                );
              });
            }}
            className="px-4 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      </div>
    ));
  };

  /* ================= ORDER ================= */
  const handleProceedOrder = () => {
    if (books.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    navigate("/order/cart", {
      state: {
        cartItems: books,
        totalBooks,
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
      <div className="min-h-screen flex items-center justify-center">
        Please login first
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h2 className="text-3xl font-bold text-indigo-600 text-center mb-10">
        🛒 My Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">
          {books.length === 0 ? (
            <p className="text-center text-gray-500">
              No books in cart
            </p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow p-5 flex gap-5 items-center"
              >
                {/* IMAGE */}
                <img
                  src={book.cover}
                  alt={book.name}
                  className="w-24 h-32 object-cover rounded cursor-pointer"
                  onClick={() =>
                    navigate(`/books/${book.bookId}`)
                  }
                />

                {/* INFO */}
                <div className="flex-1">
                  <h3
                    className="font-semibold text-lg cursor-pointer hover:text-indigo-600"
                    onClick={() =>
                      navigate(`/books/${book.bookId}`)
                    }
                  >
                    {book.name}
                  </h3>

                  <p className="text-gray-500 mb-3">
                    ${book.price}
                  </p>

                  {/* ✅ QUANTITY CONTROLS */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(book._id)}
                      className="w-9 h-9 border rounded hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="font-semibold text-lg">
                      {book.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(book._id)}
                      className="w-9 h-9 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => handleDelete(book._id)}
                  className="text-red-500 text-xl"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24">
          <h3 className="text-lg font-bold mb-4">
            📊 Order Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{totalBooks}</span>
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
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500"
          >
            🚀 Proceed to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
